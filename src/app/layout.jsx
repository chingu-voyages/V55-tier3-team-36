import "./globals.css";
import { NextAuthProvider } from "@/components/NextAuthProvider";

export const metadata = {
  title: "Habitude",
  description: "A Habit Tracker App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
