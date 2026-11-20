import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock, Phone, ShieldCheck } from 'lucide-react';
import { getService, SERVICES } from '@/lib/services';
import { inr } from '@/lib/api';
import { telHref, site } from '@/lib/site';
import { ServiceCard } from './ServiceCard';

export function serviceMetadata(slug: string) {
  const s = getService(slug);
  if (!s) return { title: 'Service not found — NASA Thawing Centre' };
  return { title: `${s.name} — NASA Thawing Centre`, description: s.short };
}

export function ServiceDetail({ slug }: { slug: string }) {
  const s = getService(slug);
  if (!s) notFound();
  const related = SERVICES.filter((x) => x.slug !== s.slug && x.category === s.category).slice(0, 3);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-frost to-white">
        <div className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2">
          <div>
            <nav className="text-xs text-slate-500">
              <Link href="/services" className="hover:text-primary-700">Services</Link> / <span>{s.category}</span>
            </nav>
            <h1 className="mt-3 flex items-center gap-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span aria-hidden>{s.icon}</span> {s.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="badge bg-white px-3 py-1.5 ring-1 ring-slate-200"><Clock className="h-4 w-4 text-primary-600" /> {s.responseTime}</span>
              <span className="badge bg-white px-3 py-1.5 ring-1 ring-slate-200"><ShieldCheck className="h-4 w-4 text-primary-600" /> Verified technicians</span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/book-service?service=${s.slug}`} className="btn-primary px-6">Book {s.name}</Link>
              <a href={telHref} className="btn-outline px-6"><Phone className="h-4 w-4" /> {site.helpline}</a>
            </div>
          </div>
          <div className="relative">
            <img src={s.image} alt={s.name} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-white px-5 py-4 shadow-card">
              <p className="text-xs text-slate-500">Starting from</p>
              <p className="text-2xl font-bold text-primary-700">{inr(s.basePrice)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">What&apos;s included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {s.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 rounded-xl border border-slate-200 p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" /> {f}
              </li>
            ))}
          </ul>
          {s.priceNote && <p className="mt-4 text-sm text-slate-500">{s.priceNote}</p>}

          <h2 className="mt-14 text-2xl font-bold">How it works</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {s.steps.map((st, i) => (
              <li key={st.title} className="card p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-600 text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-semibold">{st.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{st.text}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {s.faqs.map((f) => (
              <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span className="text-xl leading-none text-primary-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card overflow-hidden">
            <div className="bg-primary-700 p-6 text-white">
              <p className="text-sm text-primary-100">Stuck right now?</p>
              <p className="mt-1 text-xl font-bold">Get help in minutes</p>
            </div>
            <div className="space-y-3 p-6">
              <Link href={`/book-service?service=${s.slug}`} className="btn-primary w-full">Book online</Link>
              <a href={telHref} className="btn-outline w-full"><Phone className="h-4 w-4" /> Call helpline</a>
              <p className="pt-2 text-center text-xs text-slate-500">Pay after service · UPI, card or cash</p>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-x">
          <h2 className="text-2xl font-bold">Related services</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ServiceCard key={r.slug} {...r} />)}
          </div>
        </section>
      )}
    </>
  );
}
