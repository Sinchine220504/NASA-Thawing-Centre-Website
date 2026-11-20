import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Rajesh Kumar', place: 'Howrah', service: 'Vehicle Thawing', text: 'My diesel SUV refused to start on a freezing morning. The technician arrived in 25 minutes, de-gelled the fuel line and I made it to work on time.' },
  { name: 'Priya Singh', place: 'Kolkata', service: 'Towing', text: 'Flatbed showed up exactly when the tracking page said it would. No haggling, the price matched the estimate. Felt safe the whole time.' },
  { name: 'Amit Sharma', place: 'Salt Lake', service: 'Emergency Rescue', text: 'Got stuck in a water-logged underpass at night. They winched the car out and arranged towing to my garage. Calm, professional people.' },
  { name: 'Neha Kapoor', place: 'Shibpur', service: 'Battery Jumpstart', text: 'Booked on the website, got a tracking code and a call within two minutes. Battery checked and replaced on the spot.' },
];

export function Testimonials() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((t) => (
        <figure key={t.name} className="card flex flex-col p-6">
          <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">“{t.text}”</blockquote>
          <figcaption className="mt-5 border-t border-slate-100 pt-4">
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-slate-500">
              {t.place} · {t.service}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
