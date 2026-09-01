import { motion } from 'motion/react';
import { Reveal } from '@/src/components/shared/Reveal';
import { skillIcons } from '@/src/components/skills/skill-icons';
import { education, skillGroups } from '@/lib/portfolio-data';

export function SkillsEducation() {
  return (
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
  );
}
