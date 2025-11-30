import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'NASA Thawing Centre',
  description: 'Thawing, towing, and emergency assistance services',
  icons: { icon: '/favicon.ico' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
