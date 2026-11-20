import { ServiceDetail, serviceMetadata } from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/services';

export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => serviceMetadata(params.slug);

export default function ServicePage({ params }: { params: { slug: string } }) {
  return <ServiceDetail slug={params.slug} />;
}
