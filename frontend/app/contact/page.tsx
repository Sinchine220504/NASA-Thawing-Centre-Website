import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'Contact — NASA Thawing Centre', description: 'Reach our 24/7 helpline' };

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded p-6">
            <div className="font-semibold">24/7 Helpline</div>
            <div className="text-gray-700 mt-1">+1 234 567 890</div>
            <div className="font-semibold mt-4">Email</div>
            <div className="text-gray-700 mt-1">support@nasa-thawing.com</div>
            <div className="font-semibold mt-4">Office</div>
            <div className="text-gray-700 mt-1">221B Rescue Street, City</div>
          </div>
          <div className="bg-white border rounded p-6">
            <div className="text-gray-600">Map</div>
            <div className="mt-2 text-sm text-gray-500">Embed Google Map later</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


