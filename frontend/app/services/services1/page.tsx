import { redirect } from 'next/navigation';

// Legacy URL — the full catalogue lives at /services
export default function LegacyServices() {
  redirect('/services');
}
