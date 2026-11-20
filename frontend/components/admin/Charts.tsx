'use client';
import { useState } from 'react';

/** Single-series vertical bar chart (one hue, rounded data-ends, hover tooltip). */
export function DailyBars({ data }: { data: { date: string; count: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.count));
  const ticks = [0, Math.ceil(max / 2), max];
  const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

  return (
    <div className="relative">
      <div className="flex h-48 gap-2">
        <div className="flex flex-col justify-between pb-5 text-right text-[11px] text-slate-400">
          {[...ticks].reverse().map((t) => <span key={t}>{t}</span>)}
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-x-0 bottom-5 top-0">
            {ticks.map((t) => (
              <div key={t} className="absolute inset-x-0 border-t border-slate-100" style={{ bottom: `${(t / max) * 100}%` }} />
            ))}
            <div className="absolute inset-0 flex items-end gap-[2px]">
              {data.map((d, i) => (
                <div
                  key={d.date}
                  className="relative flex h-full flex-1 cursor-default items-end"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  <div
                    className={`w-full rounded-t-[4px] transition ${hover === i ? 'bg-primary-700' : 'bg-primary-600'}`}
                    style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count ? 3 : 0 }}
                  />
                  {hover === i && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs text-white shadow-lg">
                      <div className="text-slate-300">{fmt(d.date)}</div>
                      <div className="font-semibold">{d.count} booking{d.count === 1 ? '' : 's'}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-[11px] text-slate-400">
            <span>{fmt(data[0]?.date)}</span>
            <span>{fmt(data[data.length - 1]?.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Horizontal ranked bars with direct value labels. */
export function RankedBars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length) return <p className="py-8 text-center text-sm text-slate-400">No bookings yet</p>;
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label} title={`${d.label}: ${d.value}`}>
          <div className="flex justify-between text-sm">
            <span className="truncate text-ink/80">{d.label}</span>
            <span className="font-semibold tabular-nums">{d.value}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-primary-600" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
