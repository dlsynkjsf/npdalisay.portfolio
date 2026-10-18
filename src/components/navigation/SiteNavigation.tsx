import { type Ref, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PiBracketsCurlyLight,
  PiBriefcaseLight,
  PiEnvelopeSimpleLight,
  PiFolderOpenLight,
  PiHouseSimpleLight,
  PiIdentificationCardLight,
} from 'react-icons/pi';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];

const dockNavItems = [
  { label: 'Home', href: '#top', icon: PiHouseSimpleLight },
  { label: 'About', href: '#about', icon: PiIdentificationCardLight },
  { label: 'Skills', href: '#skills', icon: PiBracketsCurlyLight },
  { label: 'Experience', href: '#experience', icon: PiBriefcaseLight },
  { label: 'Projects', href: '#projects', icon: PiFolderOpenLight },
  { label: 'Contact', href: '#contact', icon: PiEnvelopeSimpleLight },
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
  const isTouchInteraction = useRef(false);
  const [pressedHref, setPressedHref] = useState<string | null>(null);

  return (
    <motion.nav
      className="mobile-dock"
      aria-label="Section navigation"
      initial={{ opacity: 1, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      {dockNavItems.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.href}
            href={item.href}
            aria-label={`Go to ${item.label}`}
            data-label={item.label}
            data-pressed={pressedHref === item.href || undefined}
            onPointerDown={(event) => {
              isTouchInteraction.current = event.pointerType === 'touch';
            }}
            onTouchStart={() => setPressedHref(item.href)}
            onTouchEnd={() => setPressedHref(null)}
            onTouchCancel={() => setPressedHref(null)}
            onTouchMove={() => setPressedHref(null)}
            onContextMenu={(event) => {
              if (isTouchInteraction.current) event.preventDefault();
            }}
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
          initial={{ opacity: 0, x: -8, y: -8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 4, y: -8, transition: { duration: 0.1 } }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
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
