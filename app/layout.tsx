import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Investment Strategy Sales Agent',
  description: 'Psychology-driven sales and advertising suggestions for your investment strategy. Not financial advice.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
