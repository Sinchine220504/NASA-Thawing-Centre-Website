import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: { default: 'NASA Thawing Centre — 24/7 Thawing, Towing & Emergency Rescue', template: '%s' },
  description: 'Fast, trusted roadside assistance: vehicle thawing, towing, emergency rescue, battery jumpstart and more. Book online and track your technician live.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#0057B8' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
