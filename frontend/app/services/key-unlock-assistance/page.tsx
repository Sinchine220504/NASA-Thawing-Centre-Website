import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('key-unlock-assistance');

export default function Page() {
  return <ServiceDetail slug="key-unlock-assistance" />;
}
