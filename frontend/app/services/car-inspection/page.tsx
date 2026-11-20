import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('car-inspection');

export default function Page() {
  return <ServiceDetail slug="car-inspection" />;
}
