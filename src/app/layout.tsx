import './globals.css';

export const metadata = {
  title: 'Smart Todo List',
  description: 'יומן משימות חכם ומודולרי',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="he" dir="rtl">
      <body>{children}</body>
      </html>
  );
}