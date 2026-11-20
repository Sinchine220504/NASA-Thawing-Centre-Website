import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('dashcam-installation');

export default function Page() {
  return <ServiceDetail slug="dashcam-installation" />;
}
