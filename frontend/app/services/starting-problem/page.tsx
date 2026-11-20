import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';

export const metadata = serviceMetadata('starting-problem');

export default function Page() {
  return <ServiceDetail slug="starting-problem" />;
}
