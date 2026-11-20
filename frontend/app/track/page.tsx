import { TrackLookup } from '@/components/TrackLookup';
import { PageHero } from '@/components/SectionHeading';

export const metadata = { title: 'Track Your Request — NASA Thawing Centre', description: 'See live status and ETA for your service request.' };

export default function TrackPage() {
  return (
    <>
      <PageHero eyebrow="Live tracking" title="Track your request" text="Enter the tracking code you received after booking (e.g. NTC-7KQ2MD)." />
      <div className="container-x py-12">
        <TrackLookup />
      </div>
    </>
  );
}
