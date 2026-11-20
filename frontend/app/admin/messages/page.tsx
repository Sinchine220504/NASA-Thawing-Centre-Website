'use client';
import toast from 'react-hot-toast';
import { CheckCheck } from 'lucide-react';
import { ResourceManager } from '@/components/admin/ResourceManager';
import { api, type Message } from '@/lib/api';

const tone: Record<string, string> = {
  New: 'bg-primary-50 text-primary-700 ring-1 ring-primary-200',
  Read: 'bg-slate-100 text-slate-600',
  Resolved: 'bg-emerald-50 text-emerald-700',
};

export default function MessagesPage() {
  return (
    <ResourceManager<Message>
      title="Messages"
      text="Enquiries from the contact form."
      endpoint="/admin/messages"
      canCreate={false}
      statusFilter={['New', 'Read', 'Resolved']}
      columns={[
        { label: 'From', render: (m) => <><div className="font-medium">{m.name}</div><div className="text-xs text-slate-500">{[m.email, m.phone].filter(Boolean).join(' · ')}</div></> },
        { label: 'Message', render: (m) => <div className="max-w-md"><div className="font-medium">{m.subject || '(no subject)'}</div><p className="mt-0.5 whitespace-pre-line text-slate-600">{m.message}</p></div> },
        { label: 'Status', render: (m) => <span className={`badge ${tone[m.status]}`}>{m.status}</span> },
        { label: 'Received', render: (m) => <span className="text-xs text-slate-500">{new Date(m.createdAt).toLocaleString()}</span> },
      ]}
      fields={[{ name: 'status', label: 'Status', type: 'select', options: ['New', 'Read', 'Resolved'] }]}
      rowActions={(m, reload) =>
        m.status !== 'Resolved' ? (
          <button
            onClick={() => api(`/admin/messages/${m._id}`, { method: 'PATCH', auth: true, body: { status: 'Resolved' } }).then(() => { toast.success('Resolved'); reload(); })}
            className="rounded-md p-1.5 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
            aria-label="Mark resolved"
            title="Mark resolved"
          >
            <CheckCheck className="h-4 w-4" />
          </button>
        ) : null
      }
    />
  );
}
