'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

const empty = { name: '', email: '', phone: '', subject: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error('Please enter your name');
    if (!form.email && !form.phone) return toast.error('Please share an email or phone number');
    if (form.message.trim().length < 5) return toast.error('Please write a short message');
    setLoading(true);
    try {
      await api('/contact', { method: 'POST', body: form });
      setSent(true);
      setForm(empty);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h2 className="mt-3 text-xl font-semibold">Message sent</h2>
        <p className="mt-2 text-sm text-slate-600">Thanks for reaching out — we usually reply within a few hours.</p>
        <button onClick={() => setSent(false)} className="btn-outline mt-6">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 sm:p-8">
      <h2 className="text-xl font-semibold">Send us a message</h2>
      <p className="mt-1 text-sm text-slate-500">Need help right now? Use the booking form or call instead — messages aren&apos;t monitored for emergencies.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-name">Name *</label>
          <input id="c-name" className="input" value={form.name} onChange={set('name')} autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="c-email">Email</label>
          <input id="c-email" type="email" className="input" value={form.email} onChange={set('email')} autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="c-phone">Phone</label>
          <input id="c-phone" className="input" value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-subject">Subject</label>
          <input id="c-subject" className="input" value={form.subject} onChange={set('subject')} placeholder="Fleet contract, feedback, partnership…" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-msg">Message *</label>
          <textarea id="c-msg" rows={5} className="input resize-none" value={form.message} onChange={set('message')} />
        </div>
      </div>
      <button disabled={loading} className="btn-primary mt-6 w-full sm:w-auto">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />} Send message
      </button>
    </form>
  );
}
