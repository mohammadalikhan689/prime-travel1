import { PageHero } from "./Layout";

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} text="This document is a template and should be reviewed by the business before publishing." />
      <section className="py-20 md:py-28">
        <div className="container-x max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-3xl">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
