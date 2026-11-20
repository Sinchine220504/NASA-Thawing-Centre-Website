import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { inr } from '@/lib/api';

export function ServiceCard({ slug, name, icon, short, basePrice, highlight = false }: {
  slug: string; name: string; icon: string; short: string; basePrice: number; highlight?: boolean;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className={`group card flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-primary-300 ${highlight ? 'ring-1 ring-primary-200' : ''}`}
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-2xl" aria-hidden>
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{short}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-slate-500">
          From <span className="font-semibold text-ink">{inr(basePrice)}</span>
        </span>
        <span className="flex items-center gap-1 font-semibold text-primary-700">
          Details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
