import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Bike Express Services — NASA Thawing Centre', description: 'Doorstep bike servicing.' };

export default function BikeExpressPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link className="text-primary font-semibold" href="/">NASA Thawing Centre</Link>
          <div className="text-sm flex gap-4">
            <Link href="/services" className="hover:underline">All Services</Link>
            <Link href="/book-service" className="hover:underline">Book</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Bike Express Services</h1>
        <p className="text-gray-700 mt-3 max-w-2xl">Quick doorstep bike servicing by trained technicians.</p>
        <ul className="mt-6 list-disc list-inside space-y-2 text-gray-800">
          <li>Oil/filters/chain care</li>
          <li>Electrical checks</li>
          <li>Multi-point inspection</li>
        </ul>
        <div className="mt-8">
          <Link href="/book-service" className="bg-primary text-white px-5 py-3 rounded inline-block">Book this service</Link>
        </div>
      </main>
    </div>
  );
}


