import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('towing');

export default function Page() {
  return <ServiceDetail slug="towing" />;
}
