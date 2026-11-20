'use client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Download, ExternalLink, Loader2, MapPin, Phone, Plus, Search, Trash2, X } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminShell';
import { API_URL, TOKEN_KEY, api, BOOKING_STATUSES, inr, statusStyle, type Booking, type ServiceDoc, type Technician } from '@/lib/api';

type ListRes = { bookings: Booking[]; total: number; page: number; pages: number };

export default function BookingsPage() {
  return (
    <Suspense fallback={null}>
      <Bookings />
    </Suspense>
  );
}

function Bookings() {
  const params = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<ListRes | null>(null);
  const [filters, setFilters] = useState({ q: params.get('q') || '', status: 'All', service: 'All', from: '', to: '' });
  const [page, setPage] = useState(1);
  const [services, setServices] = useState<ServiceDoc[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [openId, setOpenId] = useState<string | null>(params.get('open'));
  const [creating, setCreating] = useState(false);
  const lastTotal = useRef<number | null>(null);

  const load = useCallback(async () => {
    const qs = new URLSearchParams({ page: String(page), limit: '20' });
    Object.entries(filters).forEach(([k, v]) => v && v !== 'All' && qs.set(k, v));
    const d = await api<ListRes>(`/bookings?${qs}`, { auth: true });
    const isDefaultView = page === 1 && Object.values(filters).every((v) => !v || v === 'All');
    if (isDefaultView && lastTotal.current !== null && d.total > lastTotal.current) {
      toast.success(`${d.total - lastTotal.current} new request${d.total - lastTotal.current > 1 ? 's' : ''} received`, { icon: '🚨' });
    }
    if (isDefaultView) lastTotal.current = d.total;
    setData(d);
  }, [filters, page]);

  const loadTechs = useCallback(() => api<{ items: Technician[] }>('/admin/technicians', { auth: true }).then((d) => setTechnicians(d.items)), []);

  useEffect(() => {
    api<{ items: ServiceDoc[] }>('/admin/services', { auth: true }).then((d) => setServices(d.items)).catch(() => {});
    loadTechs().catch(() => {});
  }, [loadTechs]);

  useEffect(() => {
    const t = setTimeout(() => load().catch((e) => toast.error(e.message)), 250);
    const i = setInterval(() => load().catch(() => {}), 15000);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, [load]);

  const setF = (k: keyof typeof filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPage(1);
    setFilters((f) => ({ ...f, [k]: e.target.value }));
  };

  const closeDrawer = () => {
    setOpenId(null);
    if (params.get('open')) router.replace('/admin/bookings');
  };

  async function exportCsv() {
    const res = await fetch(`${API_URL}/api/bookings/export.csv`, { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` } });
    if (!res.ok) return toast.error('Export failed');
    const url = URL.createObjectURL(await res.blob());
    const a = Object.assign(document.createElement('a'), { href: url, download: `bookings-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <AdminHeader
        title="Bookings"
        text="Assign technicians, set ETAs and update status — customers see changes live."
        actions={
          <>
            <button onClick={exportCsv} className="btn-ghost border border-slate-200 bg-white"><Download className="h-4 w-4" /> Export CSV</button>
            <button onClick={() => setCreating(true)} className="btn-primary"><Plus className="h-4 w-4" /> New booking</button>
          </>
        }
      />

      <div className="card mb-4 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search name, phone, code, location, reg. no." value={filters.q} onChange={setF('q')} />
        </div>
        <select className="input" value={filters.status} onChange={setF('status')}>
          <option>All</option>
          {BOOKING_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="input" value={filters.service} onChange={setF('service')}>
          <option value="All">All services</option>
          {services.map((s) => <option key={s._id}>{s.name}</option>)}
        </select>
        <input type="date" className="input" value={filters.from} onChange={setF('from')} aria-label="From date" />
        <input type="date" className="input" value={filters.to} onChange={setF('to')} aria-label="To date" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Technician</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!data && (
                <tr><td colSpan={6} className="py-16 text-center text-slate-400"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></td></tr>
              )}
              {data?.bookings.map((b) => (
                <tr key={b._id} onClick={() => setOpenId(b._id)} className="cursor-pointer hover:bg-primary-50/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{b.fullName}</div>
                    <div className="text-xs text-slate-500">{b.phoneNumber} · <span className="font-mono">{b.code}</span></div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{b.serviceType}</div>
                    <div className="text-xs text-slate-500">{b.vehicleType}{b.vehicleNumber ? ` · ${b.vehicleNumber}` : ''}</div>
                  </td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-slate-600" title={b.location}>{b.location}</td>
                  <td className="px-4 py-3">{b.technician?.name || <span className="text-amber-600">Unassigned</span>}</td>
                  <td className="px-4 py-3"><span className={`badge ${statusStyle[b.status]}`}>{b.status}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(b.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {data && !data.bookings.length && <tr><td colSpan={6} className="py-16 text-center text-slate-400">No bookings match these filters</td></tr>}
            </tbody>
          </table>
        </div>
        {data && data.pages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm">
            <span className="text-slate-500">{data.total} bookings · page {data.page} of {data.pages}</span>
            <div className="flex gap-1">
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="btn-ghost px-2 py-1.5" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
              <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)} className="btn-ghost px-2 py-1.5" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>

      {openId && (
        <BookingDrawer
          id={openId}
          technicians={technicians}
          onClose={closeDrawer}
          onChanged={() => { load(); loadTechs(); }}
        />
      )}
      {creating && <CreateBooking services={services} onClose={() => setCreating(false)} onCreated={(id) => { setCreating(false); load(); setOpenId(id); }} />}
    </>
  );
}

function Drawer({ title, onClose, children }: { title: React.ReactNode; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="min-w-0">{title}</div>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-slate-100" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

const NEXT: Record<string, string | undefined> = {
  Pending: 'Assigned', Assigned: 'En Route', 'En Route': 'Arrived', Arrived: 'In Progress', 'In Progress': 'Completed',
};

function BookingDrawer({ id, technicians, onClose, onChanged }: { id: string; technicians: Technician[]; onClose: () => void; onChanged: () => void }) {
  const [b, setB] = useState<Booking | null>(null);
  const [form, setForm] = useState({ status: '', technician: '', etaMinutes: '', amount: '', paymentStatus: 'Unpaid', adminNotes: '', note: '' });
  const [saving, setSaving] = useState(false);

  const hydrate = (bk: Booking) => {
    setB(bk);
    setForm({
      status: bk.status,
      technician: bk.technician?._id || '',
      etaMinutes: '',
      amount: String(bk.amount ?? 0),
      paymentStatus: bk.paymentStatus,
      adminNotes: bk.adminNotes || '',
      note: '',
    });
  };

  useEffect(() => {
    api<{ booking: Booking }>(`/bookings/${id}`, { auth: true }).then((d) => hydrate(d.booking)).catch((e) => { toast.error(e.message); onClose(); });
  }, [id, onClose]);

  async function save(override: Partial<typeof form> = {}) {
    if (!b) return;
    const f = { ...form, ...override };
    const body: Record<string, unknown> = {
      technician: f.technician || null,
      amount: Number(f.amount) || 0,
      paymentStatus: f.paymentStatus,
      adminNotes: f.adminNotes,
    };
    if (f.status !== b.status) { body.status = f.status; if (f.note) body.note = f.note; }
    if (f.etaMinutes !== '') body.etaMinutes = Number(f.etaMinutes);
    setSaving(true);
    try {
      const d = await api<{ booking: Booking }>(`/bookings/${b._id}`, { method: 'PATCH', auth: true, body });
      hydrate(d.booking);
      toast.success('Booking updated — customer notified live');
      onChanged();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!b || !confirm(`Delete booking ${b.code}? This cannot be undone.`)) return;
    try {
      await api(`/bookings/${b._id}`, { method: 'DELETE', auth: true });
      toast.success('Booking deleted');
      onChanged();
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const mapHref = b?.coordinates?.lat != null
    ? `https://www.google.com/maps?q=${b.coordinates.lat},${b.coordinates.lng}`
    : b ? `https://www.google.com/maps/search/${encodeURIComponent(b.location)}` : '#';

  return (
    <Drawer
      onClose={onClose}
      title={b ? (
        <>
          <p className="font-mono text-xs text-slate-500">{b.code}</p>
          <p className="truncate font-semibold">{b.fullName} · {b.serviceType}</p>
        </>
      ) : 'Loading…'}
    >
      {!b ? (
        <div className="grid h-40 place-items-center text-slate-400"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`badge ${statusStyle[b.status]}`}>{b.status}</span>
            {NEXT[b.status] && (
              <button disabled={saving} onClick={() => save({ status: NEXT[b.status]! })} className="btn-primary px-3 py-1.5 text-xs">
                Mark “{NEXT[b.status]}”
              </button>
            )}
            {!['Completed', 'Cancelled'].includes(b.status) && (
              <button disabled={saving} onClick={() => save({ status: 'Cancelled' })} className="btn-ghost px-3 py-1.5 text-xs text-red-600">Cancel</button>
            )}
            <Link href={`/track/${b.code}`} target="_blank" className="ml-auto flex items-center gap-1 text-xs font-medium text-primary-700">
              Customer view <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          <section className="rounded-xl border border-slate-200 p-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <Info label="Phone"><a href={`tel:${b.phoneNumber}`} className="flex items-center gap-1 text-primary-700"><Phone className="h-3.5 w-3.5" />{b.phoneNumber}</a></Info>
              <Info label="Email">{b.email || '—'}</Info>
              <Info label="Vehicle">{b.vehicleType}{b.vehicleNumber ? ` · ${b.vehicleNumber}` : ''}</Info>
              <Info label="Created">{new Date(b.createdAt).toLocaleString()}</Info>
            </div>
            <Info label="Location" className="mt-3">
              <a href={mapHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-primary-700"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{b.location}</a>
            </Info>
            {b.issueDescription && <Info label="Issue" className="mt-3">{b.issueDescription}</Info>}
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Dispatch</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Status</label>
                <select className="input" value={form.status} onChange={set('status')}>
                  {BOOKING_STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Technician</label>
                <select className="input" value={form.technician} onChange={set('technician')}>
                  <option value="">Unassigned</option>
                  {technicians.filter((t) => t.isActive !== false).map((t) => (
                    <option key={t._id} value={t._id}>{t.name} — {t.status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">ETA (minutes from now)</label>
                <input type="number" min={0} className="input" placeholder={b.etaAt ? `Due ${new Date(b.etaAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'e.g. 25'} value={form.etaMinutes} onChange={set('etaMinutes')} />
              </div>
              <div>
                <label className="label">Status note (optional)</label>
                <input className="input" value={form.note} onChange={set('note')} placeholder="Shown in history" />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Billing</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Amount (₹)</label>
                <input type="number" min={0} className="input" value={form.amount} onChange={set('amount')} />
              </div>
              <div>
                <label className="label">Payment</label>
                <select className="input" value={form.paymentStatus} onChange={set('paymentStatus')}>
                  {['Unpaid', 'Paid', 'Refunded'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">Internal notes</label>
              <textarea rows={2} className="input resize-none" value={form.adminNotes} onChange={set('adminNotes')} />
            </div>
          </section>

          <div className="flex gap-2">
            <button disabled={saving} onClick={() => save()} className="btn-primary flex-1">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save changes
            </button>
            <button onClick={remove} className="btn-ghost text-red-600" aria-label="Delete booking"><Trash2 className="h-4 w-4" /></button>
          </div>

          <section>
            <h3 className="text-sm font-semibold">History</h3>
            <ol className="mt-3 space-y-3 border-l-2 border-slate-200 pl-4">
              {[...b.statusHistory].reverse().map((h, i) => (
                <li key={i} className="text-sm">
                  <span className={`badge ${statusStyle[h.status]}`}>{h.status}</span>
                  <span className="ml-2 text-xs text-slate-500">{new Date(h.at).toLocaleString()}</span>
                  {h.note && <p className="mt-1 text-slate-600">{h.note}</p>}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-slate-400">Amount {inr(b.amount)} · {b.paymentStatus}</p>
          </section>
        </div>
      )}
    </Drawer>
  );
}

function Info({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs text-slate-500">{label}</p>
      <div className="mt-0.5 font-medium">{children}</div>
    </div>
  );
}

function CreateBooking({ services, onClose, onCreated }: { services: ServiceDoc[]; onClose: () => void; onCreated: (id: string) => void }) {
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', location: '', serviceType: services[0]?.name || '', vehicleType: 'Car', issueDescription: '' });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const d = await api<{ code: string }>('/bookings', { method: 'POST', body: form });
      const list = await api<{ bookings: Booking[] }>(`/bookings?q=${d.code}`, { auth: true });
      toast.success(`Created ${d.code}`);
      onCreated(list.bookings[0]?._id);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer title={<p className="font-semibold">New booking (phone / walk-in)</p>} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label">Customer name</label><input required className="input" value={form.fullName} onChange={set('fullName')} /></div>
        <div><label className="label">Phone</label><input required className="input" value={form.phoneNumber} onChange={set('phoneNumber')} /></div>
        <div><label className="label">Location</label><input required className="input" value={form.location} onChange={set('location')} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Service</label>
            <select className="input" value={form.serviceType} onChange={set('serviceType')}>
              {services.filter((s) => s.isActive).map((s) => <option key={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Vehicle</label>
            <select className="input" value={form.vehicleType} onChange={set('vehicleType')}>
              {['Car', 'Bike', 'SUV', 'Commercial', 'Other'].map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
        </div>
        <div><label className="label">Issue</label><textarea rows={3} className="input resize-none" value={form.issueDescription} onChange={set('issueDescription')} /></div>
        <button disabled={saving} className="btn-primary w-full">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Create booking</button>
      </form>
    </Drawer>
  );
}
