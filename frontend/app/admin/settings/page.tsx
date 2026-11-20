'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminShell';
import { api, API_URL } from '@/lib/api';

export default function SettingsPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.newPassword !== form.confirm) return toast.error('Passwords do not match');
    setSaving(true);
    try {
      await api('/auth/change-password', { method: 'POST', auth: true, body: form });
      toast.success('Password updated');
      setForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader title="Settings" />
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="card space-y-4 p-6">
          <h2 className="font-semibold">Change password</h2>
          {(['currentPassword', 'newPassword', 'confirm'] as const).map((k) => (
            <div key={k}>
              <label className="label">{k === 'currentPassword' ? 'Current password' : k === 'newPassword' ? 'New password (min 8 chars)' : 'Confirm new password'}</label>
              <input type="password" required className="input" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            </div>
          ))}
          <button disabled={saving} className="btn-primary">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Update password</button>
        </form>
        <div className="card p-6 text-sm">
          <h2 className="font-semibold">System</h2>
          <dl className="mt-4 space-y-3">
            <div><dt className="text-slate-500">API endpoint</dt><dd className="font-mono">{API_URL}</dd></div>
            <div><dt className="text-slate-500">Live tracking</dt><dd>Server-Sent Events (with 30s polling fallback)</dd></div>
            <div><dt className="text-slate-500">Payments</dt><dd>Manual (amount + paid status). Razorpay/Stripe-ready fields on each booking.</dd></div>
          </dl>
        </div>
      </div>
    </>
  );
}
