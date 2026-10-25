import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

interface CinematicScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Isolated Top Scroll Progress Beam
 * Updates directly via CSS DOM transform/width without causing React tree re-renders
 */
const TopScrollBeam: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = (fraction: number) => {
      const pct = Math.min(100, Math.max(0, Math.round(fraction * 100)));
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
      if (headRef.current) {
        headRef.current.style.left = `calc(${pct}% - 6px)`;
        headRef.current.style.opacity = pct > 1 ? '1' : '0';
      }
    };

    const handleScrollUpdate = (e: any) => {
      updateProgress(e.progress ?? 0);
    };

    const handleNativeScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      updateProgress(progress);
    };

    // Native scroll listener as baseline fallback
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    // Connect to Lenis high-precision progress if active
    const interval = setInterval(() => {
      try {
        const lenis = (window as any).__lenis;
        if (lenis && typeof lenis.on === 'function') {
          lenis.on('scroll', handleScrollUpdate);
          clearInterval(interval);
        }
      } catch (_) {}
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      clearInterval(interval);
      try {
        const lenis = (window as any).__lenis;
        if (lenis && typeof lenis.off === 'function') {
          lenis.off('scroll', handleScrollUpdate);
        }
      } catch (_) {}
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] bg-[#020617]/50 pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-linear-to-r from-[#06b6d4] via-[#22d3ee] to-[#facc15] transition-all duration-75 ease-out shadow-[0_0_12px_#06b6d4]"
        style={{ width: '0%' }}
      />
      {/* Glowing Photon Head Particle */}
      <div
        ref={headRef}
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee,0_0_25px_#06b6d4] transition-all duration-75 ease-out pointer-events-none opacity-0"
        style={{ left: '-6px' }}
      />
    </div>
  );
};

export const CinematicScrollProvider: React.FC<CinematicScrollProviderProps> = ({
  children,
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  // Responsive, silky-smooth scroll to target with professional easing
  const scrollToTarget = useCallback((targetId: string) => {
    if (!lenisRef.current) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (targetId === 'home') {
      lenisRef.current.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    const targetEl =
      document.getElementById(targetId) ||
      (targetId === 'work' ? document.getElementById('projects') : null);

    if (targetEl) {
      lenisRef.current.scrollTo(targetEl, {
        offset: -75, // offset for fixed navbar
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }, []);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Detect touch device to keep touch scrolling native 120Hz while keeping wheel silky
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Clean up any pre-existing duplicate Lenis instance
    if ((window as any).__lenis) {
      try {
        (window as any).__lenis.destroy();
      } catch (_) {}
      (window as any).__lenis = null;
    }

    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    try {
      // Initialize Lenis smooth scroll engine with ultra-smooth momentum
      lenis = new Lenis({
        duration: prefersReducedMotion ? 0.01 : 1.25, // Buttery smooth deceleration & momentum
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: 1.15, // Effortless glide with less wheel friction
        touchMultiplier: 1.5,
        syncTouch: false, // Prevents fighting native touch inertia on mobile
        infinite: false,
        autoResize: true,
      });

      lenisRef.current = lenis;
      (window as any).__lenis = lenis;

      // High performance RAF loop
      const raf = (time: number) => {
        if (lenis) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      };
      rafId = requestAnimationFrame(raf);
    } catch (err) {
      console.warn('Lenis smooth scroll failed to initialize, falling back to native browser scrolling:', err);
      lenisRef.current = null;
      (window as any).__lenis = null;
    }

    // Enhance standard anchor link clicks throughout the app
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const id = href.slice(1);
        const element =
          document.getElementById(id) ||
          (id === 'projects' ? document.getElementById('work') : null);

        if (element) {
          e.preventDefault();
          scrollToTarget(id);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        try {
          lenis.destroy();
        } catch (_) {}
      }
      if ((window as any).__lenis === lenis) {
        (window as any).__lenis = null;
      }
      lenisRef.current = null;
    };
  }, [scrollToTarget]);

  return (
    <>
      <TopScrollBeam />
      {children}
    </>
  );
};
