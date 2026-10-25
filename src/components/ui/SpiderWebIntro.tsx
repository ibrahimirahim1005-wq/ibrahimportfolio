// SPIDER INTRO: Full-Screen Spider Web Intro Overlay Animation
import React, { useState, useEffect, useRef, useMemo } from 'react';

interface SpiderWebIntroProps {
  onComplete?: () => void;
}

/**
 * Cinematic 10–12 Second Spider Web Intro Animation
 * - Plays once when the website is opened or reloaded
 * - Smooth step-by-step reveal:
 *   1. Thread Drops: Spider descends slowly and settles at center (0 – 2.6s)
 *   2. Radial Spokes: Anchor strands branch out one by one (2.6s – 5.4s)
 *   3. Concentric Spiral: Sagging silk rings weave progressively outward (5.2s – 9.6s)
 *   4. Energy Surge: Golden yellow & cyan lightning flash illuminates web (9.6s – 10.4s)
 *   5. Smooth Reveal: Seamless dissolve into Home screen (10.4s – 11.4s)
 */
export const SpiderWebIntro: React.FC<SpiderWebIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'dropping' | 'spinning' | 'lightning' | 'revealing' | 'done'>('dropping');
  const [spiderY, setSpiderY] = useState(0); // 0 to 500 (center)
  const [spiderRotation, setSpiderRotation] = useState(0); // subtle rotation during spinning
  const [webProgress, setWebProgress] = useState(0); // 0 to 1
  const [isSkipped, setIsSkipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Reduced motion: quick 0.3s fade and finish
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    // Lock page scroll while intro plays
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    // Cinematic 10–12 second timing timeline
    const durationTotal = mobileCheck ? 10400 : 11400; // ~10.4s mobile, ~11.4s desktop
    const dropDuration = mobileCheck ? 2300 : 2600;   // Spider descends and settles
    const spinDuration = mobileCheck ? 6700 : 7200;   // Gradual spoke & ring weaving
    const flashDuration = mobileCheck ? 600 : 800;    // Energy surge & illumination
    // Remaining time (~800ms) is revealing/dissolve transition into Home

    startTimeRef.current = performance.now();

    const loop = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;

      // 1. Thread Drops (0 to dropDuration)
      if (elapsed < dropDuration) {
        setPhase('dropping');
        const progress = Math.min(1, elapsed / dropDuration);
        // Smooth cubic ease-out
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        // Gentle realistic settle bounce at end of drop
        const settle = progress > 0.82 ? Math.sin(((progress - 0.82) / 0.18) * Math.PI) * 10 : 0;
        setSpiderY(easedProgress * 500 + settle);
        setSpiderRotation(Math.sin(progress * Math.PI * 2) * 3);
      }
      // 2. Spider Spins the Web Step-by-Step (dropDuration to dropDuration + spinDuration)
      else if (elapsed < dropDuration + spinDuration) {
        setPhase('spinning');
        setSpiderY(500);
        const spinProgress = (elapsed - dropDuration) / spinDuration;
        setWebProgress(Math.min(1, spinProgress));
        // Subtle rhythmic body rotation and breathing while weaving
        setSpiderRotation(Math.sin(spinProgress * Math.PI * 6) * 6);
      }
      // 3. Web Lights Up (Golden-Yellow & Cyan Lightning Energy Surge)
      else if (elapsed < dropDuration + spinDuration + flashDuration) {
        setPhase('lightning');
        setSpiderY(500);
        setWebProgress(1);
        setSpiderRotation(0);
      }
      // 4. Reveal & Smooth Dissolve into Home Screen
      else if (elapsed < durationTotal) {
        setPhase('revealing');
        const revealElapsed = elapsed - (dropDuration + spinDuration + flashDuration);
        const revealTotal = durationTotal - (dropDuration + spinDuration + flashDuration);
        const revealProgress = Math.min(1, revealElapsed / revealTotal);
        // Spider climbs back up smoothly toward the ceiling
        const climbY = 500 - Math.pow(revealProgress, 2) * 680;
        setSpiderY(climbY);
      } else {
        // Animation Complete
        finishIntro();
        return;
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      document.body.style.overflow = originalOverflow;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, []);

  // Finish intro and unmount cleanly
  const finishIntro = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);

    // Restore body scroll and Lenis smooth scrolling
    document.body.style.overflow = '';
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.start === 'function') {
      lenis.start();
    }

    setPhase('done');
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 60);
  };

  // Skip handler
  const handleSkip = () => {
    setIsSkipped(true);
    setTimeout(() => {
      finishIntro();
    }, 300);
  };

  // Generate 10 radial spokes from center (500, 500) to outer perimeter
  const spokes = useMemo(() => {
    const count = 10;
    const items = [];
    const radius = 700;
    for (let i = 0; i < count; i++) {
      const angle = (i * (360 / count) - 90) * (Math.PI / 180);
      const x2 = 500 + radius * Math.cos(angle);
      const y2 = 500 + radius * Math.sin(angle);
      items.push({ x1: 500, y1: 500, x2, y2, angle, index: i });
    }
    return items;
  }, []);

  // Generate 6 concentric sagging rings with curved catenary arcs (4 on mobile)
  const rings = useMemo(() => {
    const ringCount = isMobile ? 4 : 6;
    const ringItems = [];
    const count = 10;

    for (let r = 1; r <= ringCount; r++) {
      const radius = r * (isMobile ? 100 : 75);
      const sagRatio = 0.88; // Sagging curved web arc
      let pathData = '';

      for (let i = 0; i < count; i++) {
        const a1 = (i * (360 / count) - 90) * (Math.PI / 180);
        const nextIdx = (i + 1) % count;
        const a2 = (nextIdx * (360 / count) - 90) * (Math.PI / 180);
        const aMid = ((i + 0.5) * (360 / count) - 90) * (Math.PI / 180);

        const x1 = 500 + radius * Math.cos(a1);
        const y1 = 500 + radius * Math.sin(a1);
        const x2 = 500 + radius * Math.cos(a2);
        const y2 = 500 + radius * Math.sin(a2);
        const cx = 500 + radius * sagRatio * Math.cos(aMid);
        const cy = 500 + radius * sagRatio * Math.sin(aMid);

        if (i === 0) {
          pathData += `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2} `;
        } else {
          pathData += `Q ${cx} ${cy} ${x2} ${y2} `;
        }
      }
      pathData += 'Z';
      ringItems.push({ ringIndex: r, radius, path: pathData });
    }
    return ringItems;
  }, [isMobile]);

  if (!isVisible || phase === 'done') return null;

  // Web stroke color & glow styling
  const isLightning = phase === 'lightning';
  const webColor = isLightning ? '#facc15' : '#22d3ee';
  const webFilter = isLightning
    ? 'drop-shadow(0 0 12px #facc15) drop-shadow(0 0 24px rgba(250,204,21,0.6))'
    : 'drop-shadow(0 0 4px rgba(34,211,238,0.4))';

  return (
    // SPIDER INTRO: Fullscreen Overlay Container with Scale Zoom & Dissolve
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center overflow-hidden pointer-events-auto select-none transition-all duration-700 ease-out ${
        isSkipped || phase === 'revealing'
          ? 'scale-115 opacity-0 pointer-events-none'
          : 'scale-100 opacity-100'
      }`}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {/* Top Right SKIP Button */}
      <button
        onClick={handleSkip}
        aria-label="Skip spider web intro animation"
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 px-3.5 py-1.5 bg-[#020617]/85 hover:bg-[#0f172a] border border-[#06b6d4]/60 hover:border-[#22d3ee] text-[#22d3ee] hover:text-white font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:shadow-[0_0_18px_rgba(6,182,212,0.6)] cursor-pointer active:scale-95 flex items-center gap-1.5"
      >
        <span>SKIP</span>
        <span className="text-[#facc15]">&gt;&gt;</span>
      </button>

      {/* Main Vector Canvas (1000x1000 Scaled to Viewport) */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full max-w-[100vw] max-h-[100vh] pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="silkIntroGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22d3ee" floodOpacity="0.85" />
          </filter>
          <radialGradient id="centerWebGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Center Glow while Web is Spinning */}
        {phase !== 'dropping' && (
          <circle
            cx="500"
            cy="500"
            r={webProgress * 380}
            fill="url(#centerWebGlow)"
            opacity={Math.min(1, webProgress * 1.5)}
          />
        )}

        {/* 1. Dropping / Suspended Silk Thread from ceiling */}
        <line
          x1="500"
          y1="0"
          x2="500"
          y2={spiderY}
          stroke="#e0f2fe"
          strokeWidth="1.8"
          filter="url(#silkIntroGlow)"
        />
        <line
          x1="500"
          y1="0"
          x2="500"
          y2={spiderY}
          stroke="#38bdf8"
          strokeWidth="0.8"
          opacity="0.9"
        />

        {/* 2. Spider Web Geometry (Drawn slowly and visibly step-by-step) */}
        {phase !== 'dropping' && (
          <g
            style={{
              filter: webFilter,
              transition: 'filter 0.25s ease-out',
            }}
          >
            {/* Step A: 10 Radial Spokes shoot out progressively from center */}
            {spokes.map((spoke, idx) => {
              const length = 700;
              // Stagger spokes across the first 45% of spinning duration
              const spokeStart = idx * 0.035; // 0.0 to 0.315
              const spokeProgress = Math.max(0, Math.min(1, (webProgress - spokeStart) / 0.18));
              const dashOffset = length * (1 - spokeProgress);

              return (
                <g key={`spoke-group-${idx}`}>
                  <line
                    x1={spoke.x1}
                    y1={spoke.y1}
                    x2={spoke.x2}
                    y2={spoke.y2}
                    stroke={webColor}
                    strokeWidth="1.2"
                    strokeOpacity={isLightning ? 1 : 0.8}
                    strokeDasharray={length}
                    strokeDashoffset={dashOffset}
                  />
                  {/* Glowing anchor point at spoke tip once extended */}
                  {spokeProgress > 0.95 && (
                    <circle
                      cx={spoke.x2}
                      cy={spoke.y2}
                      r="2"
                      fill={isLightning ? '#facc15' : '#22d3ee'}
                      opacity="0.6"
                    />
                  )}
                </g>
              );
            })}

            {/* Step B: Concentric Sagging Rings weave outward from innermost to outermost */}
            {rings.map((ring, idx) => {
              const ringCount = rings.length;
              // Rings start weaving from center out (starting at 0.32 up to 0.98)
              const ringStart = 0.32 + (idx / ringCount) * 0.48;
              const ringProgress = Math.max(0, Math.min(1, (webProgress - ringStart) / 0.18));
              const pathLength = 3200;
              const dashOffset = pathLength * (1 - ringProgress);

              return (
                <g key={`ring-group-${idx}`}>
                  <path
                    d={ring.path}
                    fill="none"
                    stroke={webColor}
                    strokeWidth={isLightning ? '1.3' : '1.1'}
                    strokeOpacity={isLightning ? 0.95 : 0.7}
                    strokeDasharray={pathLength}
                    strokeDashoffset={dashOffset}
                  />
                  {/* Subtle silk condensation droplet on each ring once drawn */}
                  {ringProgress > 0.8 && (
                    <circle
                      cx={500}
                      cy={500 - ring.radius}
                      r="1.8"
                      fill={isLightning ? '#facc15' : '#67e8f9'}
                      opacity="0.85"
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* 3. The SVG Cyber Spider */}
        <g
          transform={`translate(500, ${spiderY}) rotate(${spiderRotation})`}
          className="transition-transform duration-75"
        >
          {/* Centered Spider SVG Graphic */}
          <g transform="translate(-25, -20)">
            {/* Abdomen with cyan markings */}
            <ellipse
              cx="25"
              cy="12"
              rx="7"
              ry="9.5"
              fill="#091124"
              stroke="#06b6d4"
              strokeWidth="1.4"
            />
            <path
              d="M 22 9 L 25 14 L 28 9"
              stroke="#22d3ee"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="25" cy="16" r="1.2" fill={isLightning ? '#facc15' : '#22d3ee'} />

            {/* Cephalothorax */}
            <ellipse
              cx="25"
              cy="23"
              rx="5.5"
              ry="4.5"
              fill="#0f172a"
              stroke="#06b6d4"
              strokeWidth="1.4"
            />

            {/* Glowing Spider Eyes */}
            <circle
              cx="23"
              cy="25"
              r={isLightning ? '1.3' : '0.9'}
              fill="#facc15"
              filter={isLightning ? 'drop-shadow(0 0 4px #facc15)' : 'none'}
            />
            <circle
              cx="27"
              cy="25"
              r={isLightning ? '1.3' : '0.9'}
              fill="#facc15"
              filter={isLightning ? 'drop-shadow(0 0 4px #facc15)' : 'none'}
            />

            {/* Fangs */}
            <path d="M 23.5 27 L 23 29.5" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
            <path d="M 26.5 27 L 27 29.5" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />

            {/* 8 Jointed Legs */}
            {/* Left Legs */}
            <path d="M 22 22 Q 13 29 16 38" stroke="#06b6d4" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M 21 21 Q 9 24 10 34" stroke="#0891b2" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            <path d="M 21 19 Q 5 15 7 6" stroke="#0891b2" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            <path d="M 22 15 Q 11 7 14 0" stroke="#06b6d4" strokeWidth="1.4" strokeLinecap="round" fill="none" />

            {/* Right Legs */}
            <path d="M 28 22 Q 37 29 34 38" stroke="#06b6d4" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M 29 21 Q 41 24 40 34" stroke="#0891b2" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            <path d="M 29 19 Q 45 15 43 6" stroke="#0891b2" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            <path d="M 28 15 Q 39 7 36 0" stroke="#06b6d4" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default SpiderWebIntro;
