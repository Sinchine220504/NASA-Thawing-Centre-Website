'use client';
import { ResourceManager } from '@/components/admin/ResourceManager';
import { inr, type ServiceDoc } from '@/lib/api';

const CATEGORIES = ['Emergency', 'Roadside Assistance', 'Fitment Services', 'General Repair'];

export default function ServicesAdminPage() {
  return (
    <ResourceManager<ServiceDoc>
      title="Services"
      text="The catalogue shown in the booking form. Inactive services are hidden from customers."
      endpoint="/admin/services"
      defaults={{ isActive: true, order: 100, icon: '🛠️', category: 'Roadside Assistance' }}
      columns={[
        { label: 'Service', render: (s) => <div className="flex items-start gap-3"><span className="text-xl">{s.icon}</span><div><div className="font-medium">{s.name}</div><div className="line-clamp-1 max-w-sm text-xs text-slate-500">{s.description}</div></div></div> },
        { label: 'Category', render: (s) => s.category },
        { label: 'From', render: (s) => inr(s.basePrice) },
        { label: 'Order', render: (s) => s.order },
        { label: 'Visible', render: (s) => s.isActive ? <span className="badge bg-emerald-50 text-emerald-700">Active</span> : <span className="badge bg-slate-100 text-slate-500">Hidden</span> },
      ]}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'slug', label: 'URL slug', placeholder: 'auto from name' },
        { name: 'category', label: 'Category', type: 'select', options: CATEGORIES },
        { name: 'icon', label: 'Icon (emoji)' },
        { name: 'basePrice', label: 'Starting price (₹)', type: 'number' },
        { name: 'order', label: 'Display order', type: 'number' },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'isActive', label: 'Visible to customers', type: 'checkbox' },
      ]}
    />
  );
}
