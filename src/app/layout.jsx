import "./globals.css";
import { NextAuthProvider } from "@/components/NextAuthProvider";

export const metadata = {
  title: "V55 App",
  description: "V55 Application",
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
