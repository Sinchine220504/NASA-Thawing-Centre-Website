'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, inr, type ServiceDoc } from '@/lib/api';

/** Shows services added by admins in the dashboard that don't have a dedicated content page yet. */
export function ExtraServices({ knownSlugs }: { knownSlugs: string[] }) {
  const [extra, setExtra] = useState<ServiceDoc[]>([]);
  useEffect(() => {
    api<{ services: ServiceDoc[] }>('/services')
      .then((d) => setExtra(d.services.filter((s) => !knownSlugs.includes(s.slug))))
      .catch(() => {});
  }, [knownSlugs]);
  if (!extra.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold">More services</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {extra.map((s) => (
          <Link key={s._id} href={`/book-service?service=${s.slug}`} className="card p-6 transition hover:border-primary-300">
            <span className="text-2xl" aria-hidden>{s.icon}</span>
            <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{s.description}</p>
            <p className="mt-4 text-sm text-slate-500">From <span className="font-semibold text-ink">{inr(s.basePrice)}</span></p>
          </Link>
        ))}
      </div>
    </section>
  );
}
