import { useEffect, useRef } from 'react';
import { BriefcaseBusiness, Mail, MapPin, Sparkles } from 'lucide-react';
import { Reveal } from '@/src/components/shared/Reveal';
import { SectionHeading } from '@/src/components/shared/SectionHeading';
import { SkillsEducation } from '@/src/components/sections/SkillsEducation';
import { aboutCopy, personal } from '@/lib/portfolio-data';

const aboutEmphasis = new Set([
  'seamless digital experiences',
  'AI-assisted data engineering',
  'client-facing business systems',
  'Wuthering Waves',
  'Stray Kids and RIIZE',
]);

const aboutEmphasisPattern =
  /(seamless digital experiences|AI-assisted data engineering|client-facing business systems|Wuthering Waves|Stray Kids and RIIZE)/g;

function emphasizeAboutCopy(paragraph: string) {
  return paragraph.split(aboutEmphasisPattern).map((part, index) =>
    aboutEmphasis.has(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part,
  );
}

const quickFacts = [
  { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { label: 'Based in', value: personal.location, icon: MapPin },
  { label: 'Status', value: personal.availability, icon: BriefcaseBusiness },
];

function QuickReference() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let active = true;
    const updateLayout = () => {
      if (!active) return;

      const shouldStack = Array.from(
        card.querySelectorAll<HTMLElement>('[data-fact-measure]'),
      ).some((value) => value.getClientRects().length > 1);

      card.classList.toggle('is-stacked', shouldStack);
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(card);
    const animationFrame = requestAnimationFrame(updateLayout);
    void document.fonts.ready.then(updateLayout);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Reveal className="facts-card" delay={0.08} elementRef={cardRef}>
      <div className="facts-card-label">Quick reference</div>
      <dl className="facts-card-values">
        {quickFacts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label}>
              <dt><Icon aria-hidden="true" /> {fact.label}</dt>
              <dd>{fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}</dd>
            </div>
          );
        })}
      </dl>
      <div className="facts-card-measure" aria-hidden="true">
        <dl>
          {quickFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd><span data-fact-measure>{fact.value}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}

export function AboutSection() {
  return (
    <section className="paper-section profile-section" id="about" aria-labelledby="about-title">
      <SectionHeading title="About me!" />

      <div className="profile-grid">
        <Reveal className="about-copy">
          {aboutCopy.map((paragraph) => (
            <p key={paragraph}>{emphasizeAboutCopy(paragraph)}</p>
          ))}
          <blockquote>
            <Sparkles aria-hidden="true" />
            <span>Define, align, streamline, refine.</span>
          </blockquote>
        </Reveal>

        <QuickReference />
      </div>

      <SkillsEducation />
    </section>
  );
}
