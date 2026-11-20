import Link from 'next/link';
import { Snowflake } from 'lucide-react';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="NASA Thawing Centre home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white shadow-sm">
        <Snowflake className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>NASA</span>
        <span className={`block text-[11px] font-medium uppercase tracking-[0.16em] ${light ? 'text-primary-200' : 'text-primary-600'}`}>
          Thawing Centre
        </span>
      </span>
    </Link>
  );
}
