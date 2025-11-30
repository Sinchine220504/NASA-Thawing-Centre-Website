import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';

export const metadata = { title: 'Book Service — NASA Thawing Centre', description: 'Request assistance now' };

export default function BookServicePage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Book Assistance</h1>
        <p className="text-gray-600 mb-6">Tell us what you need. Our dispatcher will call you to confirm.</p>
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}


