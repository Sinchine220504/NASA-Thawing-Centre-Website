'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle2, Copy, Crosshair, Loader2, Phone } from 'lucide-react';
import { api, inr, type ServiceDoc } from '@/lib/api';
import { SERVICES } from '@/lib/services';
import { site, telHref } from '@/lib/site';

const VEHICLE_TYPES = ['Car', 'Bike', 'SUV', 'Commercial', 'Other'];

type Svc = Pick<ServiceDoc, 'name' | 'slug' | 'basePrice' | 'icon' | 'category'>;
const fallback: Svc[] = SERVICES.map(({ name, slug, basePrice, icon, category }) => ({ name, slug, basePrice, icon, category }));

const empty = {
  fullName: '',
  phoneNumber: '',
  email: '',
  location: '',
  serviceType: '',
  vehicleType: 'Car',
  vehicleNumber: '',
  issueDescription: '',
};

export function BookingForm({ initialService }: { initialService?: string }) {
  const [services, setServices] = useState<Svc[]>(fallback);
  const [form, setForm] = useState(empty);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    api<{ services: ServiceDoc[] }>('/services')
      .then((d) => d.services.length && setServices(d.services))
      .catch(() => {}); // keep static fallback
  }, []);

  useEffect(() => {
    if (!initialService) return;
    const match = services.find((s) => s.slug === initialService || s.name === initialService);
    if (match) setForm((f) => ({ ...f, serviceType: match.name }));
  }, [initialService, services]);

  const selected = useMemo(() => services.find((s) => s.name === form.serviceType), [services, form.serviceType]);
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };

  function useMyLocation() {
    if (!navigator.geolocation) return toast.error('Location is not supported on this device');
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: +pos.coords.latitude.toFixed(6), lng: +pos.coords.longitude.toFixed(6) };
        setCoords(c);
        setForm((f) => ({ ...f, location: f.location || `GPS ${c.lat}, ${c.lng}` }));
        setErrors((er) => ({ ...er, location: '' }));
        setLocating(false);
        toast.success('Location captured');
      },
      () => {
        setLocating(false);
        toast.error('Could not get your location — please type it instead');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    if (form.fullName.trim().length < 2) e.fullName = 'Please enter your name';
    if (!/^[+\d][\d\s-]{6,16}$/.test(form.phoneNumber.trim())) e.phoneNumber = 'Enter a valid phone number';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.location.trim().length < 3) e.location = 'Tell us where you are';
    if (!form.serviceType) e.serviceType = 'Choose a service';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await api<{ code: string }>('/bookings', {
        method: 'POST',
        body: { ...form, ...(coords ? { coordinates: coords } : {}) },
      });
      setDone(data.code);
      setForm(empty);
      setCoords(null);
      try { localStorage.setItem('ntc_last_booking', data.code); } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      toast.error(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
        <h2 className="mt-4 text-2xl font-bold">Request received</h2>
        <p className="mt-2 text-slate-600">Our dispatcher will call you within a few minutes to confirm. Keep this tracking code:</p>
        <div className="mx-auto mt-5 flex max-w-xs items-center justify-between rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 px-5 py-3">
          <span className="font-mono text-xl font-bold tracking-wider text-primary-800">{done}</span>
          <button
            type="button"
            className="rounded-md p-1.5 text-primary-700 hover:bg-primary-100"
            onClick={() => navigator.clipboard?.writeText(done).then(() => toast.success('Copied'))}
            aria-label="Copy tracking code"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={`/track/${done}`} className="btn-primary">Track live status</Link>
          <a href={telHref} className="btn-outline"><Phone className="h-4 w-4" /> Call {site.helpline}</a>
        </div>
        <button type="button" onClick={() => setDone(null)} className="mt-6 text-sm text-slate-500 underline-offset-4 hover:underline">
          Book another service
        </button>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>;

  return (
    <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fullName">Full name *</label>
          <input id="fullName" className="input" value={form.fullName} onChange={set('fullName')} autoComplete="name" placeholder="Your name" />
          {err('fullName')}
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone number *</label>
          <input id="phone" className="input" value={form.phoneNumber} onChange={set('phoneNumber')} autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" />
          {err('phoneNumber')}
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-end justify-between">
            <label className="label" htmlFor="location">Your location *</label>
            <button type="button" onClick={useMyLocation} disabled={locating} className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-primary-700 hover:underline">
              {locating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Crosshair className="h-3.5 w-3.5" />}
              Use my current location
            </button>
          </div>
          <input id="location" className="input" value={form.location} onChange={set('location')} placeholder="Street, landmark, area, city" autoComplete="street-address" />
          {coords && <p className="mt-1 text-xs text-emerald-600">GPS pinned: {coords.lat}, {coords.lng}</p>}
          {err('location')}
        </div>
        <div>
          <label className="label" htmlFor="service">Service needed *</label>
          <select id="service" className="input" value={form.serviceType} onChange={set('serviceType')}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.icon} {s.name}
              </option>
            ))}
          </select>
          {selected && <p className="mt-1 text-xs text-slate-500">Starts from {inr(selected.basePrice)} · final price confirmed on call</p>}
          {err('serviceType')}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="vtype">Vehicle</label>
            <select id="vtype" className="input" value={form.vehicleType} onChange={set('vehicleType')}>
              {VEHICLE_TYPES.map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="vnum">Reg. no.</label>
            <input id="vnum" className="input uppercase" value={form.vehicleNumber} onChange={set('vehicleNumber')} placeholder="DL 01 AB 1234" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="issue">What happened?</label>
          <textarea id="issue" rows={3} className="input resize-none" value={form.issueDescription} onChange={set('issueDescription')} placeholder="e.g. Car won't start after a cold night, diesel smell, warning light on…" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="email">Email <span className="font-normal text-slate-400">(optional, for receipts)</span></label>
          <input id="email" type="email" className="input" value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" />
          {err('email')}
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-primary mt-7 w-full py-3.5 text-base">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending request…</> : 'Request assistance now'}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">No payment now. You pay after the job is done.</p>
    </form>
  );
}
