import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('SignIn Callback - Start', {
          user: { email: user?.email },
          account: { provider: account?.provider },
          profile: { email: profile?.email }
        });
        return true;
      } catch (error) {
        console.error('SignIn Callback - Error:', error);
        return false;
      }
    },
    async session({ session, token }) {
      try {
        console.log('Session Callback - Start', {
          session: { email: session?.user?.email },
          token: { email: token?.email }
        });

        if (session?.user) {
          session.user.id = token.sub;
        }
        return session;
      } catch (error) {
        console.error('Session Callback - Error:', error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      try {
        console.log('JWT Callback - Start', {
          token: { email: token?.email },
          user: { email: user?.email },
          account: { provider: account?.provider }
        });

        if (user) {
          token.id = user.id;
        }
        return token;
      } catch (error) {
        console.error('JWT Callback - Error:', error);
        return token;
      }
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true,
  events: {
    async signIn(message) {
      console.log('SignIn Event:', message);
    },
    async signOut(message) {
      console.log('SignOut Event:', message);
    },
    async error(message) {
      console.error('Auth Error Event:', message);
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
