import {
  type ReactNode,
  type SubmitEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  SquareUserRound,
} from 'lucide-react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  aboutCopy,
  education,
  experience,
  personal,
  type Project,
  projects,
  skillGroups,
} from '@/lib/portfolio-data';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme: 'light';
          action: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];

const dockNavItems = [
  { index: '00', label: 'Home', href: '#top' },
  { index: '01', label: 'About', href: '#about' },
  { index: '02', label: 'Skills', href: '#skills' },
  { index: '03', label: 'Experience', href: '#experience' },
  { index: '04', label: 'Projects', href: '#projects' },
  { index: '05', label: 'Contact', href: '#contact' },
];

const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';

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

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(7px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.56, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  index,
  title,
  note,
}: {
  index?: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className={`section-heading${!index && !note ? ' section-heading-plain' : ''}`}>
      {index && <span className="section-index">{index}</span>}
      <div>
        {note && <p>{note}</p>}
        <h2>{title}</h2>
      </div>
      <motion.span
        className="heading-rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      />
    </Reveal>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <motion.button
            type="button"
            className={`project-card${featured ? ' project-card-featured' : ''}`}
            whileHover={{ y: -6, rotate: featured ? -0.25 : 0.35 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 360, damping: 25 }}
          />
        }
      >
        <div
          className={`project-media${project.placeholder ? ' is-placeholder' : ''}${project.image ? ' has-image' : ''}`}
        >
          {project.image ? (
            <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
          ) : (
            <span>{project.placeholder ? 'IMAGE PLACEHOLDER' : 'PROJECT IMAGE SLOT'}</span>
          )}
          <strong>{project.number}</strong>
          <div className="project-media-grid" aria-hidden="true" />
        </div>
        <div className="project-card-body">
          <div className="project-card-meta">
            <span>{project.period}</span>
            <span className="private-label">
              <LockKeyhole aria-hidden="true" /> {project.status}
            </span>
          </div>
          <h3>{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-summary">{project.summary}</p>
          <div className="project-stack">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <span className="project-open">
            Open case note <ArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="case-dialog" showCloseButton>
        <DialogHeader className="case-dialog-header">
          <div className="case-dialog-kicker">
            <span>Case note {project.number}</span>
            <span>{project.period}</span>
          </div>
          <DialogTitle className="case-dialog-title">{project.title}</DialogTitle>
          <DialogDescription className="case-dialog-description">
            {project.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="case-dialog-grid">
          <div>
            <span>01 / Challenge</span>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span>02 / My role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>03 / Approach</span>
            <p>{project.approach}</p>
          </div>
          <div>
            <span>04 / Outcome</span>
            <p>{project.outcome}</p>
          </div>
        </div>

        <div className="case-dialog-footer">
          <span className="private-label">
            <LockKeyhole aria-hidden="true" /> Repository marked private
          </span>
          <div className="project-stack">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | undefined>(undefined);
  const configuredSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const siteKey = configuredSiteKey || (import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : '');

  useEffect(() => {
    if (!siteKey) return;

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainer.current || turnstileWidgetId.current) return;
      turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
        sitekey: siteKey,
        theme: 'light',
        action: 'contact',
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile-script]');
    if (window.turnstile) {
      renderWidget();
      return;
    }

    if (existing) {
      existing.addEventListener('load', renderWidget, { once: true });
      return () => existing.removeEventListener('load', renderWidget);
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = 'true';
    script.addEventListener('load', renderWidget, { once: true });
    document.head.append(script);

    return () => script.removeEventListener('load', renderWidget);
  }, [siteKey]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (!turnstileToken) {
      setState('error');
      setFeedback('Please complete the anti-spam check, then try again.');
      return;
    }

    setState('sending');
    setFeedback('Sending your message…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          companyWebsite: formData.get('companyWebsite'),
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Message could not be sent');
      }

      form.reset();
      window.turnstile?.reset(turnstileWidgetId.current);
      setTurnstileToken('');
      setState('success');
      setFeedback('Message sent. I’ll get back to you soon.');
    } catch {
      setState('error');
      setFeedback('The message could not be sent right now. Please email me directly instead.');
      window.turnstile?.reset(turnstileWidgetId.current);
      setTurnstileToken('');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="contact-name">
          <span>Name</span>
          <Input id="contact-name" name="name" autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label htmlFor="contact-email">
          <span>Email</span>
          <Input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
      </div>

      <label htmlFor="contact-subject">
        <span>Subject</span>
        <Input id="contact-subject" name="subject" minLength={3} maxLength={120} required />
      </label>

      <label htmlFor="contact-message">
        <span>Message</span>
        <Textarea id="contact-message" name="message" minLength={20} maxLength={3000} rows={7} required />
      </label>

      <label className="honeypot" aria-hidden="true">
        Company website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      {siteKey ? (
        <div className="turnstile-wrap">
          <div ref={turnstileContainer} className="turnstile-widget" />
          <span>Protected against automated spam.</span>
        </div>
      ) : (
        <p className="form-config-note">
          Add the Turnstile site key in Vercel before enabling this form.
        </p>
      )}

      <div className="form-submit-row">
        <p className={`form-feedback is-${state}`} aria-live="polite">
          {feedback}
        </p>
        <button className="button button-primary submit-button" type="submit" disabled={state === 'sending' || !siteKey}>
          {state === 'sending' ? (
            <LoaderCircle className="spin" aria-hidden="true" />
          ) : state === 'success' ? (
            <Check aria-hidden="true" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {state === 'sending' ? 'Sending' : state === 'success' ? 'Sent' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

export default function Home() {
  const heroNavRef = useRef<HTMLElement>(null);
  const [showPersistentNav, setShowPersistentNav] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });

  useEffect(() => {
    const heroNav = heroNavRef.current;
    if (!heroNav) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowPersistentNav(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(heroNav);
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <motion.nav
        className="mobile-dock"
        aria-label="Section navigation"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {dockNavItems.map((item) => (
          <a key={item.href} href={item.href} aria-label={`Go to ${item.label}`}>
            <span aria-hidden="true">{item.index}</span>
            <strong>{item.label}</strong>
          </a>
        ))}
      </motion.nav>
      <AnimatePresence>
        {showPersistentNav && (
          <motion.nav
            className="persistent-nav"
            aria-label="Persistent primary navigation"
            initial={{ opacity: 0, y: -20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.985 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="wordmark" href="#top" aria-label="Nikolas Dalisay, home">
              <img
                className="wordmark-mark"
                src="/assets/ace-card-logo.png?v=20260831"
                alt=""
                width="1222"
                height="1287"
              />
            </a>

            <div className="nav-links">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <a className="nav-cta" href="#contact">
              Let&apos;s work <ArrowDownRight aria-hidden="true" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
      <main className="site-shell">
        <section className="hero-paper" id="top" aria-labelledby="hero-heading">
          <nav ref={heroNavRef} className="top-nav" aria-label="Primary navigation">
            <a className="wordmark" href="#top" aria-label="Nikolas Dalisay, home">
              <img
                className="wordmark-mark"
                src="/assets/ace-card-logo.png?v=20260831"
                alt=""
                width="1222"
                height="1287"
              />
            </a>

            <div className="nav-links">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <a className="nav-cta" href="#contact">
              Let&apos;s work <ArrowDownRight aria-hidden="true" />
            </a>
          </nav>

          <div className="folder-tab" aria-hidden="true">
            Portfolio file / 2026
          </div>

          <div className="hero-grid">
            <motion.div
              className="portrait-stage"
              aria-label={`Portrait of ${personal.name}`}
              initial={{ opacity: 0, x: -36, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="lanyard" aria-hidden="true">
                <span />
                <span />
              </div>

              <motion.div
                className="id-card"
                whileHover={{ rotate: -0.7, y: -5 }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              >
                <div className="portrait-window">
                  <img
                    src="/assets/nikolas-portrait.webp"
                    alt={`${personal.name} wearing a white university uniform`}
                    width="1200"
                    height="1800"
                    fetchPriority="high"
                  />
                </div>
                <div className="id-card-footer">
                  <p>Wow ambait?!</p>
                </div>
                <span className="fastener fastener-left" aria-hidden="true" />
                <span className="fastener fastener-right" aria-hidden="true" />
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 id="hero-heading">
                Nikolas Josef
                <span>P. Dalisay</span>
              </h1>

              <p className="hero-lede">
                I&apos;m a <strong>full-stack developer</strong> and Computer Science student building
                secure, human-centered products from interface to infrastructure.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore projects <ArrowDownRight aria-hidden="true" />
                </a>
                <a className="button button-secondary" href={personal.resume} download>
                  Resume <Download aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>

          <a className="scroll-cue" href="#about">
            Scroll for more! <ArrowDownRight aria-hidden="true" />
          </a>
        </section>

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

            <Reveal className="facts-card" delay={0.08}>
              <div className="facts-card-label">Quick reference</div>
              <dl>
                <div>
                  <dt><Mail aria-hidden="true" /> Email</dt>
                  <dd><a href={`mailto:${personal.email}`}>{personal.email}</a></dd>
                </div>
                <div>
                  <dt><Phone aria-hidden="true" /> Contact</dt>
                  <dd><a href="tel:+639216523547">{personal.phone}</a></dd>
                </div>
                <div>
                  <dt><MapPin aria-hidden="true" /> Based in</dt>
                  <dd>{personal.location}</dd>
                </div>
                <div>
                  <dt><BriefcaseBusiness aria-hidden="true" /> Status</dt>
                  <dd>{personal.availability}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="skills-education-grid">
            <div id="skills">
              <Reveal className="subsection-heading">
                <h3>Skills &amp; tools</h3>
              </Reveal>
              <div className="skill-groups">
                {skillGroups.map((group, index) => (
                  <Reveal className="skill-group-wrap" key={group.label} delay={index * 0.06}>
                    <motion.article
                      className="skill-group"
                      whileHover={{ y: -4, rotate: index % 2 ? 0.25 : -0.25 }}
                    >
                      <header>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <h4>{group.label}</h4>
                      </header>
                      <ul>
                        {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                      </ul>
                    </motion.article>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="education-panel">
              <Reveal className="subsection-heading">
                <h3>Education</h3>
              </Reveal>
              <div className="education-timeline">
                {education.map((item, index) => (
                  <Reveal className="education-item" key={item.school} delay={index * 0.08}>
                    <time>{item.period}</time>
                    <span className="timeline-pin" aria-hidden="true" />
                    <div>
                      <h4>{item.school}</h4>
                      <p>{item.program}</p>
                      <small>{item.detail}</small>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="paper-section work-section" aria-labelledby="work-title">
          <SectionHeading index="02" title="Work in motion" note="Experience + selected projects" />

          <div className="work-grid">
            <div className="experience-panel" id="experience">
              <Reveal className="subsection-heading">
                <span>Timeline / 2024—now</span>
                <h3>Experience</h3>
              </Reveal>

              <div className="experience-timeline">
                {experience.map((item, index) => (
                  <Reveal className="experience-item" key={`${item.organization}-${item.role}`} delay={index * 0.06}>
                    <time>{item.period}</time>
                    <span className="experience-pin" aria-hidden="true" />
                    <div>
                      <h4>{item.role}</h4>
                      <p>{item.organization}</p>
                      <small>{item.detail}</small>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="projects-panel" id="projects">
              <Reveal className="subsection-heading project-heading">
                <div>
                  <span>Selected case notes</span>
                  <h3>Projects</h3>
                </div>
                <p>Open a card for the project story.</p>
              </Reveal>
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <Reveal key={project.number} className={index === 0 ? 'project-feature-wrap' : undefined} delay={index * 0.06}>
                    <ProjectCard project={project} featured={index === 0} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="paper-section contact-section" id="contact" aria-labelledby="contact-title">
          <SectionHeading index="03" title="Get in touch" note="New project / opportunity / collaboration" />

          <div className="contact-grid">
            <Reveal className="contact-copy">
              <p className="contact-lede">
                Have a product to build, a system to improve, or a role where thoughtful engineering matters?
                Send me the context and I&apos;ll get back to you.
              </p>

              <div className="contact-details">
                <a href={`mailto:${personal.email}`}>
                  <Mail aria-hidden="true" />
                  <span><small>Email</small>{personal.email}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a href="tel:+639216523547">
                  <Phone aria-hidden="true" />
                  <span><small>Phone</small>{personal.phone}</span>
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

              <div className="availability-stamp">
                <span>Open to</span>
                <strong>Employer + client conversations</strong>
              </div>
            </Reveal>

            <Reveal className="contact-form-card" delay={0.08}>
              <div className="form-card-heading">
                <span>Secure inquiry form</span>
                <span>REF / CONTACT-01</span>
              </div>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        <footer className="site-footer">
          <span>© 2026 {personal.shortName}</span>
          <span>Designed as a digital field journal.</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </MotionConfig>
  );
}
