'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { site, telHref } from '@/lib/site';
import { SERVICES } from '@/lib/services';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="mt-24 bg-ink text-slate-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Fast, honest help when your vehicle won&apos;t move — thawing, towing and rescue by verified technicians, day or night.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Emergency services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/services" className="hover:text-white">All services</Link></li>
            <li><Link href="/book-service" className="hover:text-white">Book a service</Link></li>
            <li><Link href="/track" className="hover:text-white">Track your request</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Reach us 24/7</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="text-white">{site.contactName}</li>
            <li><a href={telHref} className="flex items-start gap-2 hover:text-white"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{site.helpline}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-start gap-2 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{site.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>In a medical emergency, call 112 first.</span>
        </div>
      </div>
    </footer>
  );
}
