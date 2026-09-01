import { type ReactNode, type Ref } from 'react';
import { motion } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  elementRef?: Ref<HTMLDivElement>;
};

export function Reveal({ children, className, delay = 0, elementRef }: RevealProps) {
  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(7px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.56, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
