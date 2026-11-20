'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { api, TOKEN_KEY } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const d = await api<{ token: string }>('/auth/login', { method: 'POST', body: { email, password } });
      localStorage.setItem(TOKEN_KEY, d.token);
      router.replace('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-frost via-white to-primary-50 p-4">
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <Logo />
        <h1 className="mt-6 flex items-center gap-2 text-xl font-bold"><Lock className="h-5 w-5 text-primary-600" /> Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Dispatch &amp; operations console</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div>
            <label className="label" htmlFor="pw">Password</label>
            <input id="pw" type="password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="btn-primary mt-6 w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
      </form>
    </div>
  );
}
