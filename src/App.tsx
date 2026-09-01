import { useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import {
  MobileDock,
  PersistentNavigation,
} from '@/src/components/navigation/SiteNavigation';
import { AboutSection } from '@/src/components/sections/AboutSection';
import { ContactSection } from '@/src/components/sections/ContactSection';
import { HeroSection } from '@/src/components/sections/HeroSection';
import { WorkSection } from '@/src/components/sections/WorkSection';

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
      <MobileDock />
      <PersistentNavigation visible={showPersistentNav} />

      <main className="site-shell">
        <HeroSection navigationRef={heroNavRef} />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
    </MotionConfig>
  );
}
