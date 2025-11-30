import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Battery Jumpstart Service — NASA Thawing Centre',
  description: 'Professional battery jumpstart services. Get your vehicle started quickly with our expert technicians.'
};

export default function BatteryJumpstartService() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Battery Jumpstart Service</h1>
          <p className="text-gray-700 text-lg max-w-2xl">
            Professional battery jumpstart services to get your vehicle running again. Our technicians 
            use proper equipment and safety protocols to ensure a safe jumpstart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Professional jumpstart equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Battery health check</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Safe connection procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Battery replacement if needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>24/7 emergency service</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Response Time</span>
                <span className="font-bold text-blue-600">15-20 mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Service Duration</span>
                <span className="font-bold text-blue-600">10-15 mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Coverage</span>
                <span className="font-bold text-blue-600">City-wide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/book-service" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl inline-block"
          >
            Book Jumpstart Service
          </Link>
        </div>
      </main>
    </div>
  );
}