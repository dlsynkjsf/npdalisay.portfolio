import { type Ref } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { HeroNavigation } from '@/src/components/navigation/SiteNavigation';
import { personal } from '@/lib/portfolio-data';

export function HeroSection({
  navigationRef,
}: {
  navigationRef: Ref<HTMLElement>;
}) {
  return (
    <section className="hero-paper" id="top" aria-labelledby="hero-heading">
      <HeroNavigation elementRef={navigationRef} />

      <div className="folder-tab" aria-hidden="true">
        Portfolio file / 2026
      </div>

      <div className="hero-grid">
        <div
          className="portrait-stage"
          aria-label={`Portrait of ${personal.name}`}
        >
          <div className="lanyard" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="portrait-stamp">
            <div className="id-card">
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
            </div>
          </div>
        </div>

        <div className="hero-copy">
          <h1 id="hero-heading">
            <span className="hero-name-line">Nikolas Josef</span>
            <span>P. Dalisay</span>
          </h1>

          <p className="hero-lede">
            I&apos;m a <strong>full-stack developer</strong> and Computer
            Science student building secure, human-centered products from
            interface to infrastructure.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore projects <ArrowDownRight aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href={personal.resume}
              download
            >
              Resume <Download aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#about">
        Scroll for more! <ArrowDownRight aria-hidden="true" />
      </a>
    </section>
  );
}
