import { Clock, Mail, MapPin, MessageCircle, Phone, User } from 'lucide-react';
import { PageHero } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';
import { site, telHref, whatsappHref } from '@/lib/site';

export const metadata = { title: 'Contact — NASA Thawing Centre', description: 'Reach our 24/7 helpline, WhatsApp or email.' };

export default function ContactPage() {
  const items = [
    { icon: User, title: 'Contact person', value: site.contactName },
    { icon: Phone, title: '24/7 Helpline', value: site.helpline, href: telHref },
    { icon: MessageCircle, title: 'WhatsApp', value: 'Chat with dispatch', href: whatsappHref() },
    { icon: Mail, title: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, title: 'Hours', value: 'Open 24 hours, 7 days a week' },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="We're always reachable" text="For emergencies, call or book online. For partnerships, fleet contracts or feedback, send us a message." />
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {items.map((i) => {
            const body = (
              <>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700"><i.icon className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-semibold">{i.title}</p>
                  <p className="text-sm text-slate-600">{i.value}</p>
                </div>
              </>
            );
            return i.href ? (
              <a key={i.title} href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition hover:border-primary-300">{body}</a>
            ) : (
              <div key={i.title} className="card flex items-center gap-4 p-5">{body}</div>
            );
          })}
          <div className="card overflow-hidden">
            <div className="flex items-start gap-3 p-5 text-sm">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
              <span>{site.address}</span>
            </div>
            <iframe
              title="Office location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&z=14&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
