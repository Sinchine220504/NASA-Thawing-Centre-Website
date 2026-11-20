import Link from 'next/link';
import { CATEGORY_ORDER, SERVICES } from '@/lib/services';
import { ServiceCard } from '@/components/ServiceCard';
import { PageHero } from '@/components/SectionHeading';
import { ExtraServices } from '@/components/ExtraServices';

export const metadata = {
  title: 'Services — NASA Thawing Centre',
  description: 'Vehicle thawing, towing, emergency rescue, battery jumpstart, flat tyre, fuel delivery and more.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything you need when your vehicle won't cooperate"
        text="From frozen fuel lines to full flatbed towing — transparent starting prices and verified technicians for every job."
      >
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((c) => (
            <a key={c} href={`#${c.replace(/\s+/g, '-').toLowerCase()}`} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium ring-1 ring-slate-200 hover:ring-primary-300">
              {c}
            </a>
          ))}
        </div>
      </PageHero>
      <div className="container-x space-y-16 py-14">
        {CATEGORY_ORDER.map((cat) => (
          <section key={cat} id={cat.replace(/\s+/g, '-').toLowerCase()} className="scroll-mt-32">
            <h2 className="text-2xl font-bold">{cat}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.filter((s) => s.category === cat).map((s) => (
                <ServiceCard key={s.slug} {...s} highlight={cat === 'Emergency'} />
              ))}
            </div>
          </section>
        ))}
        <ExtraServices knownSlugs={SERVICES.map((s) => s.slug)} />
        <div className="card flex flex-col items-center justify-between gap-4 p-8 sm:flex-row">
          <div>
            <h3 className="text-lg font-semibold">Not sure what you need?</h3>
            <p className="text-sm text-slate-600">Describe the problem and our dispatcher will send the right technician.</p>
          </div>
          <Link href="/book-service" className="btn-primary">Request help</Link>
        </div>
      </div>
    </>
  );
}
