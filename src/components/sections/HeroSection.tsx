import { type Ref } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroNavigation } from '@/src/components/navigation/SiteNavigation';
import { personal } from '@/lib/portfolio-data';

export function HeroSection({ navigationRef }: { navigationRef: Ref<HTMLElement> }) {
  return (
    <section className="hero-paper" id="top" aria-labelledby="hero-heading">
      <HeroNavigation elementRef={navigationRef} />

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
  );
}
