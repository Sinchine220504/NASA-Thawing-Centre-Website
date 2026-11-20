import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('bike-express-services');

export default function Page() {
  return <ServiceDetail slug="bike-express-services" />;
}
