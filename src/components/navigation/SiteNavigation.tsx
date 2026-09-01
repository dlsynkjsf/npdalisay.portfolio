import { type Ref } from 'react';
import {
  ArrowDownRight,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Home as HomeIcon,
  Mail,
  SquareUserRound,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];

const dockNavItems = [
  { label: 'Home', href: '#top', icon: HomeIcon },
  { label: 'About', href: '#about', icon: SquareUserRound },
  { label: 'Skills', href: '#skills', icon: Code2 },
  { label: 'Experience', href: '#experience', icon: BriefcaseBusiness },
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Contact', href: '#contact', icon: Mail },
];

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Nikolas Dalisay, home">
      <img
        className="wordmark-mark"
        src="/assets/logo.webp?v=20260901"
        alt=""
        width="1222"
        height="1287"
      />
    </a>
  );
}

function NavigationLinks() {
  return (
    <>
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
    </>
  );
}

export function MobileDock() {
  return (
    <motion.nav
      className="mobile-dock"
      aria-label="Section navigation"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {dockNavItems.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.href}
            href={item.href}
            aria-label={`Go to ${item.label}`}
            title={item.label}
          >
            <Icon className="mobile-dock-icon" aria-hidden="true" />
            <span className="sr-only">{item.label}</span>
          </a>
        );
      })}
    </motion.nav>
  );
}

export function PersistentNavigation({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="persistent-nav"
          aria-label="Persistent primary navigation"
          initial={{ opacity: 0, y: -20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.985 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <Wordmark />
          <NavigationLinks />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export function HeroNavigation({ elementRef }: { elementRef: Ref<HTMLElement> }) {
  return (
    <nav ref={elementRef} className="top-nav" aria-label="Primary navigation">
      <Wordmark />
      <NavigationLinks />
    </nav>
  );
}
