'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { site, telHref } from '@/lib/site';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/track', label: 'Track Request' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  if (pathname?.startsWith('/admin')) return null;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-primary-800 text-primary-50">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="hidden sm:inline">24/7 thawing, towing &amp; emergency rescue across the city</span>
          <a href={telHref} className="flex items-center gap-1.5 font-semibold hover:text-white">
            <Phone className="h-3.5 w-3.5" /> Emergency helpline: {site.helpline}
          </a>
        </div>
      </div>
      <nav className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive(l.href) ? 'text-primary-700' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <a href={telHref} className="btn-ghost">
              <Phone className="h-4 w-4" /> Call
            </a>
            <Link href="/book-service" className="btn-primary">
              Book Service
            </Link>
          </div>
          <button className="btn-ghost -mr-2 px-3 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="container-x flex flex-col gap-1 py-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${isActive(l.href) ? 'bg-primary-50 text-primary-700' : 'text-ink/80'}`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={telHref} className="btn-outline">
                  <Phone className="h-4 w-4" /> Call now
                </a>
                <Link href="/book-service" className="btn-primary">
                  Book Service
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
