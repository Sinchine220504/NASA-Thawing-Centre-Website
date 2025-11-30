import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Car Inspection — NASA Thawing Centre', description: 'Comprehensive vehicle inspection.' };

export default function CarInspectionPage() {
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
        <h1 className="text-3xl font-bold">Car Inspection</h1>
        <p className="text-gray-700 mt-3 max-w-2xl">Comprehensive vehicle inspection with report.</p>
        <ul className="mt-6 list-disc list-inside space-y-2 text-gray-800">
          <li>Brakes/fluids/ECU scan</li>
          <li>Battery and tyre checks</li>
          <li>Roadworthiness score</li>
        </ul>
        <div className="mt-8">
          <Link href="/book-service" className="bg-primary text-white px-5 py-3 rounded inline-block">Book this service</Link>
        </div>
      </main>
    </div>
  );
}


