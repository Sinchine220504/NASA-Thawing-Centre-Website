import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('fuel-delivery');

export default function Page() {
  return <ServiceDetail slug="fuel-delivery" />;
}
