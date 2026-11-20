import Link from 'next/link';
import { HeartHandshake, ShieldCheck, Timer, Users } from 'lucide-react';
import { PageHero, SectionHeading } from '@/components/SectionHeading';

export const metadata = { title: 'About Us — NASA Thawing Centre', description: 'Our story, mission and the team behind every rescue.' };

const values = [
  { icon: Timer, title: 'Speed with care', text: 'We move fast, but never at the cost of your safety or your vehicle.' },
  { icon: ShieldCheck, title: 'Safety first', text: 'Every technician is trained in safe thawing, recovery and roadside protocols.' },
  { icon: HeartHandshake, title: 'Honesty', text: 'Clear prices, real ETAs, and no upselling in a stressful moment.' },
  { icon: Users, title: 'People over vehicles', text: 'A stranded driver is a person first. We stay until you are safe.' },
];

const team = [
  { name: 'Sinchine', role: 'Founder & Operations Head', bio: 'Leads operations, dispatch and customer care across Howrah and Kolkata.' },
  { name: 'Kavita Rao', role: 'Dispatch Lead', bio: 'Runs our 24/7 control room and technician routing.' },
  { name: 'Sandeep Rawat', role: 'Senior Towing Operator', bio: 'Flatbed and accident-recovery specialist.' },
  { name: 'Ravi Verma', role: 'Thawing & Electrical Technician', bio: 'Cold-start and diesel de-gelling expert.' },
  { name: 'Imran Khan', role: 'Roadside Technician', bio: 'Tyres, lockouts and fuel delivery across South zone.' },
  { name: 'Meera Joshi', role: 'Customer Care Manager', bio: 'Makes sure every customer is followed up after a rescue.' },
];

const initials = (n: string) => n.split(' ').map((p) => p[0]).join('');

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We show up when you're stuck"
        text="NASA Thawing Centre began with one service truck and a simple promise: no driver should be left stranded in the cold, the dark or the rain."
      />

      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Our story" title="From one truck to a city-wide rescue network" />
          <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
            <p>
              Winter mornings kept bringing the same calls — diesel cars that wouldn&apos;t start, frozen locks, drivers waiting hours for help.
              We started NASA Thawing Centre to fix that, with specialist thawing equipment and a dispatcher who actually picks up the phone.
            </p>
            <p>
              Today our crews handle thawing, towing, emergency rescue and everyday roadside problems around the clock, with live tracking so
              no one is left wondering when help will arrive.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border-l-4 border-primary-600 bg-frost p-6">
            <p className="eyebrow">Our mission</p>
            <p className="mt-2 text-lg font-semibold leading-snug">
              To deliver rapid, trustworthy assistance when people need it most — keeping roads safer and journeys on track.
            </p>
          </div>
        </div>
        <img src="/p.jpg" alt="Inside our service workshop" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card" />
      </section>

      <section className="bg-frost/60 py-16">
        <div className="container-x">
          <SectionHeading center eyebrow="What we stand for" title="Our values" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-600 text-white"><v.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading eyebrow="The team" title="The people behind every rescue" text="Trained, verified and on call — our team is the reason customers trust us." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="card flex gap-4 p-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-lg font-bold text-white">
                {initials(m.name)}
              </span>
              <div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm font-medium text-primary-700">{m.role}</p>
                <p className="mt-1.5 text-sm text-slate-600">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/book-service" className="btn-primary">Get help from our team</Link>
        </div>
      </section>
    </>
  );
}
