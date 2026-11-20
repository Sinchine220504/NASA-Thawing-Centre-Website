'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

export function TrackLookup() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [last, setLast] = useState<string | null>(null);
  useEffect(() => {
    try { setLast(localStorage.getItem('ntc_last_booking')); } catch {}
  }, []);

  const go = (c: string) => {
    const v = c.trim().toUpperCase();
    if (v) router.push(`/track/${encodeURIComponent(v.startsWith('NTC-') ? v : `NTC-${v}`)}`);
  };

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={(e) => { e.preventDefault(); go(code); }} className="card flex gap-2 p-2">
        <input
          className="input border-0 font-mono text-base uppercase tracking-wider focus:ring-0"
          placeholder="NTC-XXXXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-label="Tracking code"
          autoFocus
        />
        <button className="btn-primary shrink-0"><Search className="h-4 w-4" /> Track</button>
      </form>
      {last && (
        <button onClick={() => go(last)} className="mt-4 w-full text-center text-sm text-primary-700 hover:underline">
          Track your last request: <span className="font-mono font-semibold">{last}</span>
        </button>
      )}
    </div>
  );
}
