import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('fitment-services');

export default function Page() {
  return <ServiceDetail slug="fitment-services" />;
}
