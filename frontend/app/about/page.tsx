import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'About — NASA Thawing Centre', description: 'Our story and mission' };

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Our Story</h1>
        <p className="text-gray-700 mt-4 max-w-3xl">We started with a mission to bring reliable, humane roadside assistance to everyone. From quick thawing to emergency towing, our trained responders prioritize safety and care.</p>
        <h2 className="text-2xl font-semibold mt-10">Mission</h2>
        <p className="text-gray-700 mt-2 max-w-3xl">To deliver rapid, trustworthy assistance when people need it the most, keeping roads safer and journeys on track.</p>
        <h2 className="text-2xl font-semibold mt-10">Team</h2>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white border rounded p-4">
              <div className="font-semibold">Responder #{i}</div>
              <div className="text-gray-600 text-sm">Roadside Technician</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}


