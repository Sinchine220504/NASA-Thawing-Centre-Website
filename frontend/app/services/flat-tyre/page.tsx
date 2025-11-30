import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Flat Tyre Service — NASA Thawing Centre',
  description: 'Quick puncture repair and tyre services. On-spot repair for tube and tubeless tyres.'
};

export default function FlatTyreService() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link className="text-blue-600 font-semibold text-xl" href="/">
            NASA Thawing Centre
          </Link>
          <div className="text-sm flex gap-4">
            <Link href="/services" className="hover:underline">All Services</Link>
            <Link href="/book-service" className="hover:underline">Book</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Flat Tyre Service</h1>
          <p className="text-gray-700 text-lg max-w-2xl">
            Quick puncture repair and tyre services. Our technicians can handle both tube and tubeless 
            tyres with professional equipment and expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Include</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Quick puncture repair</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Spare wheel fitment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Tyre pressure check</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Tube and tubeless repair</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Emergency roadside assistance</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15-20</div>
              <div className="text-gray-700 mb-4">Minutes Average Response Time</div>
              <p className="text-sm text-gray-500">Available 24/7 across the city</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/book-service" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl inline-block"
          >
            Book Flat Tyre Service
          </Link>
        </div>
      </main>
    </div>
  );
}