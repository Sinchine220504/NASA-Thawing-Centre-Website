import { Clock, CreditCard, Phone, ShieldCheck } from 'lucide-react';
import { BookingForm } from '@/components/BookingForm';
import { site, telHref, whatsappHref } from '@/lib/site';

export const metadata = { title: 'Book a Service — NASA Thawing Centre', description: 'Request thawing, towing or emergency help in under a minute.' };

export default function BookServicePage({ searchParams }: { searchParams: { service?: string } }) {
  return (
    <div className="bg-gradient-to-b from-frost to-white">
      <div className="container-x grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="eyebrow">Book a service</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Request assistance</h1>
          <p className="mt-3 max-w-xl text-slate-600">
            Fill in the details below. You&apos;ll get a tracking code instantly and our dispatcher will call to confirm.
          </p>
          <div className="mt-8">
            <BookingForm initialService={searchParams.service} />
          </div>
        </div>
        <aside className="space-y-5 lg:pt-24">
          <div className="card p-6">
            <h2 className="font-semibold">Faster by phone?</h2>
            <p className="mt-1 text-sm text-slate-600">For accidents or unsafe locations, call us directly.</p>
            <a href={telHref} className="btn-primary mt-4 w-full"><Phone className="h-4 w-4" /> {site.helpline}</a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-outline mt-2 w-full">Chat on WhatsApp</a>
          </div>
          <ul className="card space-y-4 p-6 text-sm">
            <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary-600" /> Average arrival under 30 minutes in city limits</li>
            <li className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-primary-600" /> Verified, insured technicians</li>
            <li className="flex gap-3"><CreditCard className="h-5 w-5 shrink-0 text-primary-600" /> Pay after the job — UPI, card or cash</li>
          </ul>
          <p className="px-1 text-xs text-slate-500">If anyone is injured, call 112 before booking.</p>
        </aside>
      </div>
    </div>
  );
}
