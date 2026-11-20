import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('multimedia-system-installation');

export default function Page() {
  return <ServiceDetail slug="multimedia-system-installation" />;
}
