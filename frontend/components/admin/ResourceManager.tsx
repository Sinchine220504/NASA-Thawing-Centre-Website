'use client';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { api } from '@/lib/api';
import { AdminHeader } from './AdminShell';

export type Field = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'tags';
  options?: string[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
};

export type Column<T> = { label: string; render: (row: T) => React.ReactNode; className?: string };

type Props<T extends { _id: string }> = {
  title: string;
  text?: string;
  endpoint: string; // e.g. /admin/technicians
  columns: Column<T>[];
  fields?: Field[];
  canCreate?: boolean;
  canDelete?: boolean;
  statusFilter?: string[];
  emptyText?: string;
  rowActions?: (row: T, reload: () => void) => React.ReactNode;
  defaults?: Record<string, unknown>;
};

export function ResourceManager<T extends { _id: string }>({
  title, text, endpoint, columns, fields, canCreate = true, canDelete = true, statusFilter, emptyText, rowActions, defaults = {},
}: Props<T>) {
  const [items, setItems] = useState<T[] | null>(null);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [editing, setEditing] = useState<Partial<T> | null>(null);

  const load = useCallback(async () => {
    const qs = new URLSearchParams();
    if (q) qs.set('q', q);
    if (status !== 'All') qs.set('status', status);
    const d = await api<{ items: T[] }>(`${endpoint}?${qs}`, { auth: true });
    setItems(d.items);
  }, [endpoint, q, status]);

  useEffect(() => {
    const t = setTimeout(() => load().catch((e) => toast.error(e.message)), 250);
    return () => clearTimeout(t);
  }, [load]);

  async function remove(row: T) {
    if (!confirm('Delete this record? This cannot be undone.')) return;
    try {
      await api(`${endpoint}/${row._id}`, { method: 'DELETE', auth: true });
      toast.success('Deleted');
      load();
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <AdminHeader
        title={title}
        text={text}
        actions={canCreate && fields ? <button className="btn-primary" onClick={() => setEditing({ ...(defaults as Partial<T>) })}><Plus className="h-4 w-4" /> Add</button> : undefined}
      />
      <div className="card mb-4 flex flex-col gap-3 p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {statusFilter && (
          <select className="input sm:w-48" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            {statusFilter.map((s) => <option key={s}>{s}</option>)}
          </select>
        )}
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                {columns.map((c) => <th key={c.label} className={`px-4 py-3 ${c.className || ''}`}>{c.label}</th>)}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!items && <tr><td colSpan={columns.length + 1} className="py-14 text-center text-slate-400"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></td></tr>}
              {items?.map((row) => (
                <tr key={row._id} className="align-top hover:bg-slate-50">
                  {columns.map((c) => <td key={c.label} className={`px-4 py-3 ${c.className || ''}`}>{c.render(row)}</td>)}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {rowActions?.(row, load)}
                    {fields && (
                      <button onClick={() => setEditing(row)} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary-700" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    )}
                    {canDelete && (
                      <button onClick={() => remove(row)} className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    )}
                  </td>
                </tr>
              ))}
              {items && !items.length && <tr><td colSpan={columns.length + 1} className="py-14 text-center text-slate-400">{emptyText || 'Nothing here yet'}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {editing && fields && (
        <EditModal endpoint={endpoint} fields={fields} initial={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />
      )}
    </>
  );
}

function EditModal({ endpoint, fields, initial, onClose, onSaved }: {
  endpoint: string; fields: Field[]; initial: Record<string, any>; onClose: () => void; onSaved: () => void;
}) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const v: Record<string, any> = {};
    fields.forEach((f) => {
      const val = initial[f.name];
      v[f.name] = f.type === 'tags' ? (val || []).join(', ') : f.type === 'checkbox' ? val ?? true : val ?? (f.type === 'select' ? f.options?.[0] : '');
    });
    return v;
  });
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial._id);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, any> = {};
    fields.forEach((f) => {
      const v = values[f.name];
      body[f.name] = f.type === 'number' ? Number(v) || 0 : f.type === 'tags' ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : v;
    });
    setSaving(true);
    try {
      await api(isEdit ? `${endpoint}/${initial._id}` : endpoint, { method: isEdit ? 'PATCH' : 'POST', auth: true, body });
      toast.success(isEdit ? 'Saved' : 'Created');
      onSaved();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <form onSubmit={submit} className="card relative max-h-[90vh] w-full max-w-lg overflow-y-auto p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEdit ? 'Edit' : 'Add new'}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 hover:bg-slate-100" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => {
            const common = { id: f.name, value: values[f.name] ?? '', required: f.required, placeholder: f.placeholder,
              onChange: (e: React.ChangeEvent<any>) => setValues({ ...values, [f.name]: e.target.value }) };
            return (
              <div key={f.name} className={f.full || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                {f.type === 'checkbox' ? (
                  <label className="mt-6 flex items-center gap-2 text-sm font-medium">
                    <input type="checkbox" className="h-4 w-4 accent-primary-600" checked={!!values[f.name]} onChange={(e) => setValues({ ...values, [f.name]: e.target.checked })} />
                    {f.label}
                  </label>
                ) : (
                  <>
                    <label className="label" htmlFor={f.name}>{f.label}{f.required && ' *'}</label>
                    {f.type === 'textarea' ? <textarea rows={3} className="input resize-none" {...common} />
                      : f.type === 'select' ? <select className="input" {...common}>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
                      : <input type={f.type === 'number' ? 'number' : 'text'} className="input" {...common} />}
                    {f.type === 'tags' && <p className="mt-1 text-xs text-slate-400">Comma-separated</p>}
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          <button disabled={saving} className="btn-primary">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Save</button>
        </div>
      </form>
    </div>
  );
}
