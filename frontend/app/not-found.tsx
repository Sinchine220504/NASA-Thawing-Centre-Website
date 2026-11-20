import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-x py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-4xl font-extrabold">This road is closed</h1>
      <p className="mt-3 text-slate-600">The page you were looking for doesn&apos;t exist.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/book-service" className="btn-outline">Book a service</Link>
      </div>
    </div>
  );
}
