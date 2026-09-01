import { motion } from 'motion/react';
import { Reveal } from '@/src/components/shared/Reveal';

type SectionHeadingProps = {
  index?: string;
  title: string;
  note?: string;
};

export function SectionHeading({ index, title, note }: SectionHeadingProps) {
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
