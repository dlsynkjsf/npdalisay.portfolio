import { useRef } from 'react';
import { ArrowUpRight, Globe2, LockKeyhole } from 'lucide-react';
import { motion } from 'motion/react';
import { SiGithub } from 'react-icons/si';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Project } from '@/lib/portfolio-data';

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const resetDialogScroll = (open: boolean) => {
    if (!open) return;

    requestAnimationFrame(() => {
      dialogRef.current?.scrollTo({ top: 0, left: 0 });
    });
  };

  return (
    <Dialog onOpenChange={resetDialogScroll}>
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
          <div className="project-title-row">
            <h3>{project.title}</h3>
            <span className="private-label">
              {project.repositoryUrl ? (
                <><SiGithub aria-hidden="true" /> Public</>
              ) : (
                <><LockKeyhole aria-hidden="true" /> {project.status}</>
              )}
            </span>
          </div>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-summary">{project.summary}</p>
          <div className="project-stack">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <span className="project-open">
            View project details <ArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </DialogTrigger>

      <DialogContent
        ref={dialogRef}
        initialFocus={dialogRef}
        className="case-dialog"
        showCloseButton
      >
        <DialogHeader className="case-dialog-header">
          <DialogTitle
            className={`case-dialog-title${project.title.length > 10 ? ' is-long-title' : ''}`}
          >
            {project.title}
          </DialogTitle>
          <DialogDescription className="case-dialog-description">
            {project.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div
          className={`project-media case-dialog-media${project.placeholder ? ' is-placeholder' : ''}${project.image ? ' has-image' : ''}`}
        >
          {project.image ? (
            <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
          ) : (
            <span>{project.placeholder ? 'IMAGE PLACEHOLDER' : 'PROJECT IMAGE SLOT'}</span>
          )}
          <div className="project-media-grid" aria-hidden="true" />
        </div>

        <div className="case-dialog-grid">
          <div>
            <span>Challenge</span>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span>My role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>Approach</span>
            <p>{project.approach}</p>
          </div>
          <div>
            <span>Outcome</span>
            <p>{project.outcome}</p>
          </div>
        </div>

        <div className="case-dialog-footer">
          {(project.repositoryUrl || project.websiteUrl) && (
            <div
              className={`case-dialog-links${project.repositoryUrl && project.websiteUrl ? ' has-multiple-links' : ''}`}
            >
              {project.repositoryUrl && (
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  <SiGithub aria-hidden="true" /> Repository <ArrowUpRight aria-hidden="true" />
                </a>
              )}
              {project.websiteUrl && (
                <a href={project.websiteUrl} target="_blank" rel="noreferrer">
                  <Globe2 aria-hidden="true" /> Live site <ArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>
          )}
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
