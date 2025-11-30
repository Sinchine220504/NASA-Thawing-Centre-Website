"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SERVICE_TYPES = ['Thawing', 'Towing', 'Rescue', 'Emergency Help'];

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', location: '', serviceType: SERVICE_TYPES[0], issueDescription: '' });

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE + '/api/book' : '/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Request submitted! Our team will contact you shortly.');
        setForm({ fullName: '', phoneNumber: '', location: '', serviceType: SERVICE_TYPES[0], issueDescription: '' });
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (e) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border rounded p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Current Location</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Service Type</label>
          <select value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} className="w-full border rounded px-3 py-2">
            {SERVICE_TYPES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Issue Description</label>
          <input value={form.issueDescription} onChange={(e) => setForm({ ...form, issueDescription: e.target.value })} className="w-full border rounded px-3 py-2" />
        </div>
      </div>
      <button disabled={loading} onClick={submit} className="mt-4 bg-primary text-white rounded px-4 py-2">
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}


