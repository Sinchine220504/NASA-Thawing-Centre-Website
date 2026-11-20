import Link from 'next/link';
import { LiveTracker } from '@/components/LiveTracker';

export const generateMetadata = ({ params }: { params: { code: string } }) => ({
  title: `Tracking ${params.code.toUpperCase()} — NASA Thawing Centre`,
  robots: { index: false },
});

export default function TrackCodePage({ params }: { params: { code: string } }) {
  return (
    <div className="bg-gradient-to-b from-frost to-white">
      <div className="container-x py-10 sm:py-14">
        <Link href="/track" className="text-sm text-slate-500 hover:text-primary-700">← Track another request</Link>
        <h1 className="mb-6 mt-2 text-3xl font-extrabold tracking-tight">Request status</h1>
        <LiveTracker code={decodeURIComponent(params.code).toUpperCase()} />
      </div>
    </div>
  );
}
