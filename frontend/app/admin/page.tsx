'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminShell';
import { DailyBars, RankedBars } from '@/components/admin/Charts';
import { api, BOOKING_STATUSES, inr, statusStyle, type Booking } from '@/lib/api';

interface Report {
  totalBookings: number;
  todayBookings: number;
  activeBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  statusCounts: Record<string, number>;
  byService: { service: string; count: number }[];
  daily: { date: string; count: number }[];
  revenuePaid: number;
  avgCompletionMinutes: number | null;
  technicians: Record<string, number>;
  customers: number;
  newMessages: number;
}

export default function AdminOverview() {
  const [report, setReport] = useState<Report | null>(null);
  const [recent, setRecent] = useState<Booking[]>([]);
  const [days, setDays] = useState(14);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [r, b] = await Promise.all([
        api<{ report: Report }>(`/admin/reports/summary?days=${days}`, { auth: true }),
        api<{ bookings: Booking[] }>('/bookings?limit=6', { auth: true }),
      ]);
      setReport(r.report);
      setRecent(b.bookings);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    load().catch(() => {});
    const t = setInterval(() => load().catch(() => {}), 30000);
    return () => clearInterval(t);
  }, [load]);

  if (!report) return <div className="grid h-64 place-items-center text-slate-400"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  const kpis = [
    { label: 'Active requests', value: report.activeBookings, hint: 'Pending → In Progress', accent: true },
    { label: 'Today', value: report.todayBookings, hint: 'New bookings since midnight' },
    { label: 'Completed', value: report.completedBookings, hint: `${report.totalBookings} total bookings` },
    { label: 'Revenue collected', value: inr(report.revenuePaid), hint: 'Bookings marked paid' },
    { label: 'Avg. completion', value: report.avgCompletionMinutes != null ? `${report.avgCompletionMinutes} min` : '—', hint: 'Request → completed' },
    { label: 'Technicians free', value: `${report.technicians.Available || 0}/${Object.values(report.technicians).reduce((a, b) => a + b, 0)}`, hint: `${report.technicians.Busy || 0} busy` },
    { label: 'Customers', value: report.customers, hint: 'Unique phone numbers' },
    { label: 'New messages', value: report.newMessages, hint: 'From contact form', href: '/admin/messages' },
  ];

  return (
    <>
      <AdminHeader
        title="Overview"
        text="Live operations snapshot — refreshes every 30 seconds."
        actions={<button onClick={() => load()} className="btn-ghost border border-slate-200 bg-white"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh</button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => {
          const inner = (
            <>
              <p className="text-xs font-medium text-slate-500">{k.label}</p>
              <p className={`mt-1 text-2xl font-bold tabular-nums ${k.accent ? 'text-primary-700' : ''}`}>{k.value}</p>
              <p className="mt-1 text-xs text-slate-400">{k.hint}</p>
            </>
          );
          return k.href ? (
            <Link key={k.label} href={k.href} className="card p-5 transition hover:border-primary-300">{inner}</Link>
          ) : (
            <div key={k.label} className={`card p-5 ${k.accent ? 'ring-1 ring-primary-200' : ''}`}>{inner}</div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Bookings per day</h2>
            <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs">
              {[7, 14, 30].map((d) => (
                <button key={d} onClick={() => setDays(d)} className={`rounded-md px-2.5 py-1 font-medium ${days === d ? 'bg-primary-600 text-white' : 'text-slate-600'}`}>
                  {d}d
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6"><DailyBars data={report.daily} /></div>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold">By status</h2>
          <ul className="mt-4 space-y-2.5">
            {BOOKING_STATUSES.map((s) => (
              <li key={s} className="flex items-center justify-between text-sm">
                <span className={`badge ${statusStyle[s]}`}>{s}</span>
                <span className="font-semibold tabular-nums">{report.statusCounts[s] || 0}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-6">
          <h2 className="font-semibold">Top services</h2>
          <div className="mt-5"><RankedBars data={report.byService.slice(0, 8).map((s) => ({ label: s.service, value: s.count }))} /></div>
        </div>
        <div className="card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between p-6 pb-3">
            <h2 className="font-semibold">Latest requests</h2>
            <Link href="/admin/bookings" className="flex items-center gap-1 text-sm font-medium text-primary-700">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {recent.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <Link href={`/admin/bookings?open=${b._id}`} className="font-medium hover:text-primary-700">{b.fullName}</Link>
                    <div className="font-mono text-xs text-slate-400">{b.code}</div>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{b.serviceType}</td>
                  <td className="px-3 py-3"><span className={`badge ${statusStyle[b.status]}`}>{b.status}</span></td>
                  <td className="hidden px-6 py-3 text-right text-xs text-slate-500 sm:table-cell">{new Date(b.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {!recent.length && <tr><td className="px-6 py-10 text-center text-slate-400">No bookings yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
