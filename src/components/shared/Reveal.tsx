import { type ReactNode, type Ref, useState } from 'react';
import { motion } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  elementRef?: Ref<HTMLDivElement>;
  effect?: 'stamp' | 'rule';
};

export function Reveal({
  children,
  className,
  delay = 0,
  elementRef,
  effect,
}: RevealProps) {
  const [entered, setEntered] = useState(false);

  // Reading content stays still; only project cards and heading rules get an entrance.
  if (!effect)
    return (
      <div ref={elementRef} className={className}>
        {children}
      </div>
    );

  return (
    <motion.div
      ref={elementRef}
      className={[className, `reveal-${effect}`].filter(Boolean).join(' ')}
      data-entered={entered || undefined}
      onViewportEnter={() => setEntered(true)}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      style={{ animationDelay: `${Math.min(delay, 0.18)}s` }}
    >
      {children}
    </motion.div>
  );
}
