'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  BarChart3, ClipboardList, ExternalLink, HardHat, Inbox, Layers, Loader2, LogOut, Menu, Settings, Users, X,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { api, TOKEN_KEY } from '@/lib/api';

const nav = [
  { href: '/admin', label: 'Overview', icon: BarChart3 },
  { href: '/admin/bookings', label: 'Bookings', icon: ClipboardList },
  { href: '/admin/technicians', label: 'Technicians', icon: HardHat },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/messages', label: 'Messages', icon: Inbox },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [checking, setChecking] = useState(true);
  const [open, setOpen] = useState(false);
  const isLogin = pathname === '/admin/login';

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (isLogin) return setChecking(false);
    if (!localStorage.getItem(TOKEN_KEY)) {
      router.replace('/admin/login');
      return;
    }
    api<{ user: { email: string } }>('/auth/me', { auth: true })
      .then((d) => setUser(d.user))
      .catch(() => router.replace('/admin/login'))
      .finally(() => setChecking(false));
  }, [isLogin, router]);

  if (isLogin) return <>{children}<Toaster position="top-center" /></>;
  if (checking || !user) {
    return <div className="grid min-h-screen place-items-center text-slate-400"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    router.replace('/admin/login');
  };
  const active = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <Logo />
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
      </div>
      <p className="px-5 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Dispatch console</p>
      <nav className="flex-1 space-y-0.5 px-3">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active(n.href) ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50 hover:text-ink'
            }`}
          >
            <n.icon className="h-4 w-4" /> {n.label}
          </Link>
        ))}
      </nav>
      <div className="space-y-1 border-t border-slate-200 p-3">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <ExternalLink className="h-4 w-4" /> View website
        </Link>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <LogOut className="h-4 w-4" /> Log out
        </button>
        <p className="truncate px-3 pt-1 text-xs text-slate-400">{user.email}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-slate-200 bg-white lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">{sidebar}</aside>
        </div>
      )}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <span className="text-sm font-semibold">Admin</span>
        </header>
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

export function AdminHeader({ title, text, actions }: { title: string; text?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {text && <p className="mt-1 text-sm text-slate-500">{text}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
