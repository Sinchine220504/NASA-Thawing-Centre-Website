import Link from 'next/link';
import { ArrowRight, BadgeCheck, Clock, CreditCard, MapPinned, Phone, Radio, ShieldCheck, Wrench } from 'lucide-react';
import { SERVICES } from '@/lib/services';
import { ServiceCard } from '@/components/ServiceCard';
import { Testimonials } from '@/components/Testimonials';
import { SectionHeading } from '@/components/SectionHeading';
import { telHref, site } from '@/lib/site';

const quick = ['thawing', 'towing', 'emergency-rescue', 'battery-jumpstart', 'flat-tyre', 'fuel-delivery'];

const stats = [
  { value: '28 min', label: 'Average arrival time' },
  { value: '24/7', label: 'Dispatch, 365 days' },
  { value: '500+', label: 'Vehicles rescued' },
  { value: '4.8★', label: 'Customer rating' },
];

const steps = [
  { icon: Phone, title: 'Tell us what happened', text: 'Book online in under a minute, call, or WhatsApp us with your location.' },
  { icon: Wrench, title: 'Nearest technician dispatched', text: 'Our dispatcher confirms by phone and assigns a verified technician.' },
  { icon: Radio, title: 'Track them live', text: 'See status changes and ETA update in real time on your tracking page.' },
  { icon: CreditCard, title: 'Pay after the job', text: 'Transparent pricing. Pay by UPI, card or cash once you are moving again.' },
];

const reasons = [
  { icon: ShieldCheck, title: 'Verified, insured crew', text: 'Background-checked technicians trained in safe thawing, towing and recovery.' },
  { icon: Clock, title: 'Fast, honest ETAs', text: 'You see a real arrival estimate — not a vague promise.' },
  { icon: BadgeCheck, title: 'No surprise charges', text: 'Starting prices are public, and the final price is agreed before work begins.' },
  { icon: MapPinned, title: 'City-wide coverage', text: 'Rescue units positioned across zones so help is never far away.' },
];

export default function HomePage() {
  const emergency = SERVICES.filter((s) => s.category === 'Emergency');
  const roadside = SERVICES.filter((s) => s.category === 'Roadside Assistance').slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-frost via-white to-white">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary-100/60 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="badge bg-white px-3 py-1 text-primary-700 ring-1 ring-primary-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Technicians on duty right now
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Frozen, stuck or broken down?
              <span className="block text-primary-600">Help is on the way.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              24/7 vehicle thawing, towing and emergency rescue. Book in under a minute and watch your technician&apos;s status and ETA update live.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-service" className="btn-primary px-7 py-3.5 text-base">
                Book a service <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={telHref} className="btn-outline px-7 py-3.5 text-base">
                <Phone className="h-4 w-4" /> {site.helpline}
              </a>
            </div>
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Quick book</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {quick.map((slug) => {
                  const s = SERVICES.find((x) => x.slug === slug)!;
                  return (
                    <Link
                      key={slug}
                      href={`/book-service?service=${slug}`}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium transition hover:border-primary-300 hover:text-primary-700"
                    >
                      <span aria-hidden>{s.icon}</span> {s.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <img src="/pic.jpg" alt="NASA Thawing Centre technician explaining a repair to a customer" className="aspect-[4/3.4] w-full rounded-3xl object-cover shadow-2xl shadow-primary-900/10" />
            {/* Tracking preview card */}
            <div className="absolute -bottom-6 left-3 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:-left-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-500">NTC-7KQ2MD</span>
                <span className="badge bg-primary-50 text-primary-700 ring-1 ring-primary-200">En Route</span>
              </div>
              <p className="mt-3 text-sm font-semibold">Ravi is on the way</p>
              <p className="text-xs text-slate-500">Vehicle Thawing · ETA 12 min</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-3/5 rounded-full bg-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-x mt-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-7 text-center">
              <p className="text-3xl font-extrabold text-primary-700">{s.value}</p>
              <p className="mt-1 text-sm text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency services */}
      <section className="container-x mt-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Emergency response" title="When every minute counts" text="Our three core services, dispatched around the clock with priority routing." />
          <Link href="/services" className="btn-ghost shrink-0 text-primary-700">All services <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {emergency.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group card overflow-hidden transition hover:-translate-y-1">
              <div className="relative h-44 overflow-hidden">
                <img src={s.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-3xl" aria-hidden>{s.icon}</span>
                <span className="absolute right-4 top-4 badge bg-white/90 text-ink">{s.responseTime}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {roadside.map((s) => <ServiceCard key={s.slug} {...s} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-24 bg-frost/60 py-20">
        <div className="container-x">
          <SectionHeading center eyebrow="How it works" title="From breakdown to back on the road" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="card relative p-6">
                <span className="absolute right-5 top-5 text-4xl font-black text-primary-100">{i + 1}</span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-600 text-white"><s.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="container-x mt-24 grid items-center gap-12 lg:grid-cols-2">
        <img src="/r.jpg" alt="Technician loading a vehicle for towing" className="aspect-[4/3.6] w-full rounded-3xl object-cover shadow-card" />
        <div>
          <SectionHeading eyebrow="Why NASA Thawing Centre" title="Help you can trust in a stressful moment" text="Breaking down is frightening. We focus on getting to you quickly, keeping you informed, and treating you and your vehicle with care." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-700"><r.icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="text-sm font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/about" className="btn-outline mt-8">Meet the team</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x mt-24">
        <SectionHeading center eyebrow="Testimonials" title="People we've helped" />
        <div className="mt-10">
          <Testimonials />
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary-700 px-8 py-14 text-center text-white sm:px-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/40 blur-2xl" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">Stuck right now? Don&apos;t wait.</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-primary-100">Book online and get a tracking code instantly, or call our 24/7 helpline.</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book-service" className="btn-white px-7 py-3.5 text-base">Book a service</Link>
            <a href={telHref} className="btn border border-white/40 px-7 py-3.5 text-base text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> Call {site.helpline}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
