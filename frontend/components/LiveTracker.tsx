'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Clock, Loader2, MapPin, Phone, Radio, Truck, User, XCircle } from 'lucide-react';
import { API_URL, api, statusStyle, type PublicBooking } from '@/lib/api';
import { telHref } from '@/lib/site';

const FLOW = ['Pending', 'Assigned', 'En Route', 'Arrived', 'In Progress', 'Completed'] as const;
const LABEL: Record<string, string> = {
  Pending: 'Request received',
  Assigned: 'Technician assigned',
  'En Route': 'On the way',
  Arrived: 'Arrived',
  'In Progress': 'Work in progress',
  Completed: 'Completed',
};

function useCountdown(target?: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(t);
  }, [target]);
  if (!target) return null;
  return Math.max(0, Math.round((new Date(target).getTime() - now) / 60000));
}

export function LiveTracker({ code }: { code: string }) {
  const [booking, setBooking] = useState<PublicBooking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    let es: EventSource | null = null;
    let cancelled = false;

    const poll = () =>
      api<{ booking: PublicBooking }>(`/track/${encodeURIComponent(code)}`)
        .then((d) => !cancelled && (setBooking(d.booking), setError(null)))
        .catch((e) => !cancelled && setError(e.message));

    poll().then(() => {
      if (cancelled || typeof EventSource === 'undefined') return;
      es = new EventSource(`${API_URL}/api/track/${encodeURIComponent(code)}/stream`);
      es.addEventListener('update', (ev) => {
        setBooking(JSON.parse((ev as MessageEvent).data));
        setLive(true);
      });
      es.onerror = () => setLive(false);
    });
    // Polling fallback in case SSE is blocked by a proxy
    pollRef.current = setInterval(poll, 30000);

    return () => {
      cancelled = true;
      es?.close();
      clearInterval(pollRef.current);
    };
  }, [code]);

  const rawEta = useCountdown(booking?.etaAt);
  const eta = rawEta !== null && booking?.etaMinutes != null ? Math.min(rawEta, booking.etaMinutes) : rawEta;

  if (error && !booking) {
    return (
      <div className="card p-8 text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-400" />
        <h2 className="mt-3 text-xl font-semibold">{error}</h2>
        <p className="mt-2 text-sm text-slate-600">Check the code and try again, or call our helpline.</p>
        <Link href="/track" className="btn-outline mt-5">Try another code</Link>
      </div>
    );
  }
  if (!booking) {
    return (
      <div className="card grid place-items-center p-16 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const cancelled = booking.status === 'Cancelled';
  const currentIdx = FLOW.indexOf(booking.status as (typeof FLOW)[number]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card p-6 sm:p-8 lg:col-span-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Tracking code</p>
            <p className="font-mono text-2xl font-bold tracking-wider">{booking.code}</p>
            <p className="mt-1 text-sm text-slate-600">
              {booking.serviceType} · {booking.vehicleType} · Hi {booking.fullName}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`badge ${statusStyle[booking.status]}`}>{booking.status}</span>
            <span className={`flex items-center gap-1 text-xs ${live ? 'text-emerald-600' : 'text-slate-400'}`}>
              <Radio className="h-3.5 w-3.5" /> {live ? 'Live updates on' : 'Auto-refreshing'}
            </span>
          </div>
        </div>

        {!cancelled && booking.etaAt && eta !== null && !['Arrived', 'In Progress', 'Completed'].includes(booking.status) && (
          <div className="mt-6 flex items-center gap-4 rounded-xl bg-primary-600 p-5 text-white">
            <Clock className="h-8 w-8 shrink-0 opacity-90" />
            <div>
              <p className="text-sm text-primary-100">Estimated arrival</p>
              <p className="text-2xl font-bold">{eta <= 1 ? 'Any moment now' : `~${eta} min`}</p>
            </div>
          </div>
        )}

        {cancelled ? (
          <div className="mt-8 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">This request was cancelled. If this is unexpected, please call us.</div>
        ) : (
          <ol className="mt-8 space-y-0">
            {FLOW.map((s, i) => {
              const done = i <= currentIdx;
              const at = booking.statusHistory.filter((h) => h.status === s).at(-1)?.at;
              return (
                <li key={s} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < FLOW.length - 1 && (
                    <span className={`absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-0.5 ${i < currentIdx ? 'bg-primary-500' : 'bg-slate-200'}`} />
                  )}
                  <span className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${
                    done ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 bg-white text-slate-300'
                  } ${i === currentIdx && s !== 'Completed' ? 'ring-4 ring-primary-100' : ''}`}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}
                  </span>
                  <div className="pt-0.5">
                    <p className={`text-sm font-semibold ${done ? 'text-ink' : 'text-slate-400'}`}>{LABEL[s]}</p>
                    {at && <p className="text-xs text-slate-500">{new Date(at).toLocaleString()}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold"><Truck className="h-4 w-4 text-primary-600" /> Your technician</h3>
          {booking.technician ? (
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-50 text-primary-700"><User className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold">{booking.technician.name}</p>
                  {booking.technician.vehicleNumber && <p className="text-xs text-slate-500">Vehicle {booking.technician.vehicleNumber}</p>}
                </div>
              </div>
              <a href={`tel:${booking.technician.phone.replace(/\s/g, '')}`} className="btn-primary mt-4 w-full">
                <Phone className="h-4 w-4" /> Call technician
              </a>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600">We&apos;re assigning the nearest available technician. This usually takes a few minutes.</p>
          )}
        </div>
        <div className="card p-6 text-sm">
          <h3 className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary-600" /> Pickup location</h3>
          <p className="mt-2 text-slate-600">{booking.location}</p>
          <p className="mt-4 text-xs text-slate-500">Requested {new Date(booking.createdAt).toLocaleString()}</p>
          <a href={telHref} className="btn-outline mt-5 w-full">Need help? Call support</a>
        </div>
      </div>
    </div>
  );
}
