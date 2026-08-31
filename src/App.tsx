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
import type { IconType } from 'react-icons';
import { FaJava } from 'react-icons/fa';
import {
  SiAdobepremierepro,
  SiAmazonaws,
  SiCanva,
  SiCss3,
  SiDart,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiMicrosoftoffice,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
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

const N8nIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
  </svg>
);

const BrunoIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.394 9.583s-.742.511-1.13.275c-.387-.236-.51-.742-.274-1.129.236-.388.742-.511 1.129-.275.388.236.275 1.129.275 1.129m1.48 3.245-.308.82.582.24c.04-.224.254-.372.477-.332.224.041.372.254.332.478-.093.515-.638.813-1.122.613l-.95-.391a.41.41 0 0 1-.228-.524l.448-1.193c.12-.32.426-.533.769-.533h2.525l.239.036c.076.023.148.057.214.101a.817.817 0 0 1 .303.363l.476 1.12c.083.197.002.425-.187.524l-.896.471c-.505.266-1.121-.053-1.196-.62a.411.411 0 0 1 .353-.461.411.411 0 0 1 .461.353l.56-.294-.327-.771zM9.353 17.98c-.959-.514-2.183-1.54-1.961-3.22.029-.225.236-.383.461-.354.225.03.383.236.353.461-.167 1.272.822 2.009 1.546 2.395.348.185.771.151 1.081-.092l.903-.708v-1.045c0-.226.184-.41.411-.41s.411.184.411.41v1.045l.903.708c.19.15.423.22.655.209a.45.45 0 0 1 .074-.019.42.42 0 0 1 .093-.003c.089-.02.176-.051.259-.095.724-.386 1.713-1.123 1.546-2.395a.411.411 0 0 1 .353-.461c.225-.029.432.129.461.354.223 1.688-1.013 2.716-1.974 3.227-.072.038-.145.071-.22.099.148 1.424-.14 2.562-.449 3.24-.169.37-.355.617-.49.732-.194.167-.517.305-.933.366-.531.078-1.227.039-1.945-.182-.576-.177-.973-.686-1.208-1.343-.362-1.009-.352-2.368-.33-2.919m4.54.213a1.81 1.81 0 0 1-.939-.376l-.807-.633-.807.633c-.341.268-.758.397-1.173.384-.012.453-.001 1.219.15 1.922.072.333.174.652.329.908.122.2.275.361.486.425.586.18 1.152.218 1.585.155.227-.033.412-.086.518-.176.115-.099.259-.363.395-.744.213-.597.367-1.46.263-2.498m-8.683-.955-.191.402c-.384.81-1.475.955-2.053.27-.81-.961-1.948-2.505-2.548-4.068-.427-1.115-.576-2.241-.213-3.198C2.894 3.559 6.247 2.969 6.98 2.928c1.34-.865 5.583-2.807 10.424.342.795-.051 4.042.203 6.424 7.252.325.961.162 2.081-.263 3.186-.599 1.557-1.709 3.088-2.5 4.046-.574.695-1.675.553-2.061-.262l-.133-.28c-.219.369-.524.832-.901 1.281-.57.679-1.306 1.32-2.154 1.598a.412.412 0 0 1-.519-.263.4114.4114 0 0 1 .263-.518c.705-.231 1.306-.78 1.781-1.345.556-.662.938-1.355 1.097-1.666l-.245-.518c-.126-.264-.154-.56-.078-.842.246-.924.981-4.015.071-6.043a.4105.4105 0 1 1 .749-.336c.993 2.212.243 5.583-.026 6.591a.405.405 0 0 0 .026.278l.811 1.712c.129.27.494.32.685.089.748-.904 1.801-2.346 2.367-3.817.351-.912.52-1.834.252-2.628-2.447-7.241-5.667-6.687-5.667-6.687a.416.416 0 0 1-.309-.061C12.48.972 8.456 2.917 7.339 3.676a.41.41 0 0 1-.252.07S3.739 3.649.973 10.935c-.297.783-.137 1.701.213 2.612.565 1.475 1.644 2.927 2.408 3.833.192.228.555.177.683-.092l.816-1.723a.4.4 0 0 0 .027-.278c-.269-1.008-1.02-4.38-.027-6.592a.4113.4113 0 0 1 .543-.206c.207.093.3.336.207.543-.911 2.028-.176 5.119.071 6.043.075.282.047.578-.078.842l-.203.427c.117.226 1.249 2.351 2.958 2.911.216.071.334.303.263.519a.4115.4115 0 0 1-.519.262c-1.484-.487-2.606-1.983-3.125-2.798m10.247-7.655s-.114-.893.274-1.129a.821.821 0 0 1 1.129.275c.236.387.113.893-.274 1.129-.388.236-1.129-.275-1.129-.275" />
  </svg>
);

const skillIcons: Record<string, IconType> = {
  Python: SiPython,
  Java: FaJava,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  Dart: SiDart,
  HTML: SiHtml5,
  CSS: SiCss3,
  React: SiReact,
  'Node.js': SiNodedotjs,
  'Spring Boot': SiSpringboot,
  Flutter: SiFlutter,
  'Tailwind CSS': SiTailwindcss,
  AWS: SiAmazonaws,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  Vercel: SiVercel,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Docker: SiDocker,
  Git: SiGit,
  Postman: SiPostman,
  Bruno: BrunoIcon,
  n8n: N8nIcon,
  Figma: SiFigma,
  Canva: SiCanva,
  'Adobe Premiere Pro': SiAdobepremierepro,
  'Google Workspace': SiGoogle,
  'Microsoft Office': SiMicrosoftoffice,
};

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
      setFeedback('Message sent. I’ll get back to you soon!');
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
                src="/assets/logo.png?v=20260831"
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
                src="/assets/logo.png?v=20260831"
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
                    src="/assets/portrait.jpg"
                    alt={`${personal.name} seated in a restaurant, wearing glasses and a black shirt`}
                    width="2160"
                    height="2880"
                    fetchPriority="high"
                  />
                </div>
                <div className="id-card-footer">
                  <p>hello po...</p>
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
                    <article className="skill-group">
                      <header>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <h4>{group.label}</h4>
                      </header>
                      <ul>
                        {group.skills.map((skill, skillIndex) => {
                          const SkillIcon = skillIcons[skill];

                          return (
                            <motion.li
                              key={skill}
                              data-label={skill}
                              tabIndex={0}
                              whileHover={{ y: -4, scale: 1.12, rotate: skillIndex % 2 ? 2 : -2 }}
                              whileFocus={{ y: -4, scale: 1.12 }}
                            >
                              <SkillIcon aria-hidden="true" />
                              <span className="sr-only">{skill}</span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </article>
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
      </main>
    </MotionConfig>
  );
}
