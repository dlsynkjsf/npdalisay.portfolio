import { Reveal } from '@/src/components/shared/Reveal';

type SectionHeadingProps = {
  index?: string;
  title: string;
  note?: string;
};

export function SectionHeading({ index, title, note }: SectionHeadingProps) {
  return (
    <Reveal
      effect="rule"
      className={`section-heading${!index && !note ? ' section-heading-plain' : ''}`}
    >
      {index && <span className="section-index">{index}</span>}
      <div>
        {note && <p>{note}</p>}
        <h2>{title}</h2>
      </div>
      <span className="heading-rule" aria-hidden="true" />
    </Reveal>
  );
}
