'use client';
import { ResourceManager } from '@/components/admin/ResourceManager';
import type { Technician } from '@/lib/api';

const tone: Record<string, string> = {
  Available: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Busy: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  'Off Duty': 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
};

export default function TechniciansPage() {
  return (
    <ResourceManager<Technician>
      title="Technicians"
      text="Your field team. Availability updates automatically when you assign or complete jobs."
      endpoint="/admin/technicians"
      statusFilter={['Available', 'Busy', 'Off Duty']}
      defaults={{ status: 'Available', isActive: true, rating: 5 }}
      columns={[
        { label: 'Name', render: (t) => <><div className="font-medium">{t.name}</div><div className="text-xs text-slate-500">{t.phone}</div></> },
        { label: 'Status', render: (t) => <span className={`badge ${tone[t.status]}`}>{t.status}</span> },
        { label: 'Skills', render: (t) => <div className="flex max-w-xs flex-wrap gap-1">{t.skills.map((s) => <span key={s} className="badge bg-primary-50 text-primary-700">{s}</span>)}</div> },
        { label: 'Zone / vehicle', render: (t) => <span className="text-slate-600">{t.zone || '—'}{t.vehicleNumber ? ` · ${t.vehicleNumber}` : ''}</span> },
        { label: 'Rating', render: (t) => `${t.rating ?? '—'} ★` },
      ]}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'phone', label: 'Phone', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Available', 'Busy', 'Off Duty'] },
        { name: 'zone', label: 'Zone' },
        { name: 'vehicleNumber', label: 'Vehicle number' },
        { name: 'rating', label: 'Rating (0–5)', type: 'number' },
        { name: 'skills', label: 'Skills', type: 'tags', full: true, placeholder: 'Towing, Vehicle Thawing' },
        { name: 'isActive', label: 'Active', type: 'checkbox' },
      ]}
    />
  );
}
