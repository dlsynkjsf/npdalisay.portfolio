import { ArrowUpRight, Code2, Download, Mail, SquareUserRound } from 'lucide-react';
import { ContactForm } from '@/src/components/contact/ContactForm';
import { Reveal } from '@/src/components/shared/Reveal';
import { SectionHeading } from '@/src/components/shared/SectionHeading';
import { personal } from '@/lib/portfolio-data';

export function ContactSection() {
  return (
    <>
      <section className="paper-section contact-section" id="contact" aria-labelledby="contact-title">
        <SectionHeading title="Get in touch" />

        <div className="contact-grid">
          <Reveal className="contact-copy">
            <p className="contact-lede">
              Have a product to build, a system to improve, or a role where thoughtful engineering matters?
              Send me the context and I&apos;ll get back to you!
            </p>

            <div className="contact-details">
              <a href={`mailto:${personal.email}`}>
                <Mail aria-hidden="true" />
                <span><small>Email</small>{personal.email}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>

            <div className="social-links" aria-label="Professional links">
              <a href={personal.linkedin} target="_blank" rel="noreferrer">
                <SquareUserRound aria-hidden="true" /> LinkedIn <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={personal.github} target="_blank" rel="noreferrer">
                <Code2 aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={personal.resume} download>
                <Download aria-hidden="true" /> Resume
              </a>
            </div>
          </Reveal>

          <Reveal className="contact-form-card" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 {personal.shortName}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
