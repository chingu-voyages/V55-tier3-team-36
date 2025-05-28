import './globals.css';
import SessionWrapper from '@/components/SessionWrapper';

export const metadata = {
  title: 'My Tailwind App',
  description: 'Styled with Tailwind',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
