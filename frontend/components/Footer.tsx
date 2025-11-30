import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="text-primary font-semibold">NASA Thawing Centre</div>
          <p className="text-gray-600 mt-1">Reliable roadside assistance, 24/7.</p>
        </div>
        <nav className="grid grid-cols-2 gap-2">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/book-service" className="hover:underline">Book Service</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">© {new Date().getFullYear()} NASA Thawing Centre</div>
    </footer>
  );
}


