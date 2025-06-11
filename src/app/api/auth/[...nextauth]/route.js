import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db/drizzle";
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn Callback - Start", {
          user: { email: user?.email },
          account: { provider: account?.provider },
          profile: { email: profile?.email },
        });
        // Add user to database if not exists
        if (user?.email) {
          const existingUsers = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, user.email));
          if (existingUsers.length === 0) {
            await db.insert(userTable).values({
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: user.emailVerified
                ? new Date(user.emailVerified)
                : null,
            });
            console.log("User added to database:", user.email);
          } else {
            console.log("User already exists in database:", user.email);
          }
        }
        return true;
      } catch (error) {
        console.error("SignIn Callback - Error:", error);
        return false;
      }
    },
    async session({ session, token }) {
      try {
        console.log("Session Callback - Start", {
          session: { email: session?.user?.email },
          token: { email: token?.email },
        });

        if (session?.user) {
          // Get the user from the database to ensure we have the correct UUID
          const [dbUser] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, session.user.email));
          if (dbUser) {
            session.user.id = dbUser.id;
          }
        }
        return session;
      } catch (error) {
        console.error("Session Callback - Error:", error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      try {
        if (user?.email) {
          const [dbUser] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, user.email));
          if (dbUser) {
            token.id = dbUser.id;
          }
        }
        return token;
      } catch (error) {
        console.error("JWT Callback - Error:", error);
        return token;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true,
  events: {
    async signIn(message) {
      console.log("SignIn Event:", message);
    },
    async signOut(message) {
      console.log("SignOut Event:", message);
    },
    async error(message) {
      console.error("Auth Error Event:", message);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
