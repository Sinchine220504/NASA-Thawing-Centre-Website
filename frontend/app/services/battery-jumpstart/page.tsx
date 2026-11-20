import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('battery-jumpstart');

export default function Page() {
  return <ServiceDetail slug="battery-jumpstart" />;
}
