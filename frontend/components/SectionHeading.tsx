export function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-base leading-relaxed text-slate-600">{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, text, children }: { eyebrow?: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-frost to-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-100/70 blur-3xl" />
      <div className="container-x relative py-14 sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{text}</p>}
        {children}
      </div>
    </section>
  );
}
