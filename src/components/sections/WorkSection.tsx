import { ProjectCard } from '@/src/components/projects/ProjectCard';
import { Reveal } from '@/src/components/shared/Reveal';
import { experience, projects } from '@/lib/portfolio-data';

export function WorkSection() {
  return (
    <section className="paper-section work-section" aria-labelledby="work-title">
      <Reveal className="work-heading">
        <h2 id="work-title">Experience &amp; Projects</h2>
        <p>Open a card for the project story.</p>
      </Reveal>

      <div className="work-grid">
        <div className="experience-panel" id="experience">
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
          <p className="projects-note">Open a card for the project story.</p>
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
  );
}
