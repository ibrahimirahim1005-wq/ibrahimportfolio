import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  threshold?: number;
  once?: boolean;
  direction?: 'up' | 'left' | 'right' | 'none';
  blur?: boolean;
}

/**
 * ScrollReveal Component
 * Replicates GSAP ScrollTrigger-style reveal animations using motion.
 * Supports standard gentle upward slide as well as alternate side-reveal (left/right)
 * with 4px blur, cubic-bezier(0.22, 1, 0.36, 1) power3.out deceleration, and 0.12s stagger.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration,
  yOffset = 18,
  threshold,
  once = true,
  direction = 'up',
  blur = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const isSideReveal = direction === 'left' || direction === 'right';
  const sideDistance = isMobile ? 30 : 60;
  const animDuration = duration ?? (isSideReveal ? 0.9 : 0.6);
  const animThreshold = threshold ?? (isSideReveal ? 0.15 : 0.08);
  const animEase: [number, number, number, number] = isSideReveal
    ? [0.22, 1, 0.36, 1] // power3.out
    : [0.16, 1, 0.3, 1];

  let initialValues: any = { opacity: 0 };
  let animateValues: any = { opacity: 1 };

  if (direction === 'left') {
    initialValues = {
      opacity: 0,
      x: -sideDistance,
      filter: blur ? 'blur(4px)' : 'none',
    };
    animateValues = {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    };
  } else if (direction === 'right') {
    initialValues = {
      opacity: 0,
      x: sideDistance,
      filter: blur ? 'blur(4px)' : 'none',
    };
    animateValues = {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    };
  } else if (direction === 'up') {
    initialValues = { opacity: 0, y: yOffset };
    animateValues = { opacity: 1, y: 0 };
  }

  return (
    <motion.div
      initial={initialValues}
      whileInView={animateValues}
      viewport={{
        once,
        amount: animThreshold,
        margin: '0px 0px -40px 0px',
      }}
      transition={{
        duration: animDuration,
        delay,
        ease: animEase,
      }}
      style={{
        willChange: isSideReveal ? 'transform, opacity, filter' : 'transform, opacity',
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollRevealItemProps extends ScrollRevealProps {
  index?: number;
  stagger?: number;
  alternate?: boolean;
}

/**
 * ScrollRevealItem Component
 * Specifically for cards and grid items to create a subtle staggered cascading entrance.
 * When alternate is true, alternates direction: even = left, odd = right.
 */
export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  className = '',
  index = 0,
  stagger = 0.06,
  delay = 0,
  duration,
  yOffset = 18,
  threshold,
  once = true,
  direction,
  blur = false,
  alternate = false,
}) => {
  const itemDirection = alternate
    ? index % 2 === 0
      ? 'left'
      : 'right'
    : direction;

  const itemBlur = alternate ? true : blur;
  const itemStagger = alternate ? (stagger === 0.06 ? 0.12 : stagger) : stagger;

  return (
    <ScrollReveal
      className={className}
      delay={delay + index * itemStagger}
      duration={duration}
      yOffset={yOffset}
      threshold={threshold}
      once={once}
      direction={itemDirection}
      blur={itemBlur}
    >
      {children}
    </ScrollReveal>
  );
};

export default ScrollReveal;
