import React from 'react';

const testimonials = [
  { name: 'Aarav', text: 'Quick response and professional towing. Highly recommended!' },
  { name: 'Meera', text: 'They rescued us late night. Super grateful for the team.' },
  { name: 'Karthik', text: 'Battery died in rain, thawing done in minutes. Great service.' }
];

export function Testimonials() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-center">What customers say</h2>
      <div className="mt-6 flex gap-4 overflow-x-auto snap-x">
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-[280px] snap-start bg-white border rounded p-4">
            <p className="text-gray-700">“{t.text}”</p>
            <div className="text-sm text-gray-500 mt-2">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


