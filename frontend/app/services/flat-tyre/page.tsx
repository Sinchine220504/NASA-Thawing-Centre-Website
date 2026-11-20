import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('flat-tyre');

export default function Page() {
  return <ServiceDetail slug="flat-tyre" />;
}
