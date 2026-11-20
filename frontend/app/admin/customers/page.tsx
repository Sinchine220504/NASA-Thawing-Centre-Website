'use client';
import Link from 'next/link';
import { ResourceManager } from '@/components/admin/ResourceManager';
import type { Customer } from '@/lib/api';

export default function CustomersPage() {
  return (
    <ResourceManager<Customer>
      title="Customers"
      text="Created automatically from bookings (matched by phone). Edit details or add notes."
      endpoint="/admin/customers"
      columns={[
        { label: 'Customer', render: (c) => <><div className="font-medium">{c.name}</div><div className="text-xs text-slate-500">{c.phone}{c.email ? ` · ${c.email}` : ''}</div></> },
        { label: 'Address', render: (c) => <span className="line-clamp-2 max-w-xs text-slate-600">{c.address || '—'}</span> },
        { label: 'Bookings', render: (c) => <Link className="font-semibold text-primary-700 hover:underline" href={`/admin/bookings?q=${encodeURIComponent(c.phone)}`}>{c.totalBookings}</Link> },
        { label: 'Last booking', render: (c) => <span className="text-xs text-slate-500">{c.lastBookingAt ? new Date(c.lastBookingAt).toLocaleString() : '—'}</span> },
        { label: 'Notes', render: (c) => <span className="line-clamp-2 max-w-[200px] text-xs text-slate-500">{c.notes || ''}</span> },
      ]}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'phone', label: 'Phone', required: true },
        { name: 'email', label: 'Email' },
        { name: 'address', label: 'Address' },
        { name: 'notes', label: 'Notes', type: 'textarea' },
      ]}
    />
  );
}
