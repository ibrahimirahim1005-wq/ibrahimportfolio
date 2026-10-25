import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  RotateCw,
  ArrowDown,
  Sparkles,
  Building2,
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  Code2,
  Sparkle,
} from 'lucide-react';
import QRCode from 'qrcode';
import { EDUCATION, PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';

interface StudentIdCardProps {
  onOpenResume?: () => void;
}

export const StudentIdCard: React.FC<StudentIdCardProps> = ({ onOpenResume }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [displacement, setDisplacement] = useState(0);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [dragTilt, setDragTilt] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [sparklesVisible, setSparklesVisible] = useState(false);

  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const displacementRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  displacementRef.current = displacement;

  // Generate real, scannable QR Code for the portfolio URL
  useEffect(() => {
    const portfolioUrl =
      typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
        ? window.location.origin
        : 'https://football-zone-1.onrender.com';

    QRCode.toDataURL(portfolioUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: '#020617',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, []);

  // Spring physics simulation: Damped harmonic oscillator
  const runSpringAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const stiffness = 0.12; // Spring stiffness
    const damping = 0.82; // Velocity damping factor

    const animate = () => {
      const force = -stiffness * displacementRef.current;
      velocityRef.current = (velocityRef.current + force) * damping;
      const nextDisplacement = displacementRef.current + velocityRef.current;

      displacementRef.current = nextDisplacement;
      setDisplacement(nextDisplacement);

      // Settle once movement is negligible
      if (Math.abs(velocityRef.current) > 0.12 || Math.abs(nextDisplacement) > 0.25) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        displacementRef.current = 0;
        velocityRef.current = 0;
        setDisplacement(0);
        setDragTilt(0);
        setSparklesVisible(false);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Pointer Drag Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Prevent drag if interacting with buttons, links, or flip toggle
    if ((e.target as HTMLElement).closest('button, a, input')) {
      return;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setIsDragging(true);
    setHasInteracted(true);
    setSparklesVisible(true);
    startYRef.current = e.clientY - displacementRef.current;
    startXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const currentY = e.clientY;
    const deltaY = currentY - startYRef.current;
    const currentX = e.clientX;
    const deltaX = currentX - startXRef.current;

    // Constrain downward pull up to ~120px with slight upward elasticity
    const clampedY = Math.max(-10, Math.min(120, deltaY));
    // Calculate slight horizontal drag tilt (max 6 degrees)
    const clampedTilt = Math.max(-6, Math.min(6, deltaX * 0.12));

    displacementRef.current = clampedY;
    setDisplacement(clampedY);
    setDragTilt(clampedTilt);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was automatically released
    }
    runSpringAnimation();
  };

  // Click / Keyboard bounce impulse
  const triggerBounce = () => {
    setHasInteracted(true);
    setSparklesVisible(true);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    displacementRef.current = 50;
    velocityRef.current = 14;
    setDisplacement(50);
    runSpringAnimation();
  };

  // Keyboard accessibility: Enter or Space triggers the bounce
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerBounce();
    }
  };

  // Desktop 3D Tilt & Cyan Glow tracking
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on touch / mobile devices or during active drag
    if (window.innerWidth < 768 || isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    // Max 8 degrees tilt
    setTiltX(-normY * 8);
    setTiltY(normX * 8);
    setGlowPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleCardMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Dynamic silk thread length calculation
  const threadBaseLength = 50;
  const currentThreadLength = Math.max(20, threadBaseLength + displacement);

  return (
    <div
      id="education"
      className="bg-[#0a0f1d] border border-[#1e293b] hover:border-[#06b6d4]/50 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-colors select-none scroll-mt-24 group rounded-xs"
    >
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

      {/* Top Spider Web Net in Corners */}
      {/* Left Corner Spider Web */}
      <svg
        className="absolute top-0 left-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none text-cyan-400 opacity-35 z-0"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <line x1="0" y1="0" x2="85" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <line x1="0" y1="0" x2="60" y2="85" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <line x1="0" y1="0" x2="15" y2="100" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <path d="M 25 4 Q 22 18 4 25" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 50 8 Q 44 36 8 50" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 75 11 Q 66 54 11 75" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 98 15 Q 85 70 15 98" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
      </svg>

      {/* Right Corner Spider Web */}
      <svg
        className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none text-cyan-400 opacity-35 z-0"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line x1="100" y1="0" x2="0" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <line x1="100" y1="0" x2="15" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <line x1="100" y1="0" x2="40" y2="85" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <line x1="100" y1="0" x2="85" y2="100" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <path d="M 75 4 Q 78 18 96 25" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 50 8 Q 56 36 92 50" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 25 11 Q 34 54 89 75" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 2 15 Q 15 70 85 98" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
      </svg>

      {/* Sparkles shaking off the web when card is pulled */}
      {sparklesVisible && (
        <div className="absolute inset-x-0 top-6 pointer-events-none z-10 flex justify-around">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee] animate-ping" />
          <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-bounce delay-100" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#facc15] animate-ping delay-200" />
          <span className="w-1 h-1 rounded-full bg-cyan-300 shadow-[0_0_6px_#22d3ee] animate-bounce delay-75" />
        </div>
      )}

      {/* Header bar of the panel */}
      <div className="relative z-10 p-4 sm:p-5 pb-2 border-b border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#06b6d4]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#22d3ee] font-bold">
            02 // IDENTITY &amp; CREDENTIALS
          </span>
        </div>

        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          aria-label="Flip ID card to view developer profile"
          className="px-3 py-1 bg-[#0f172a] hover:bg-[#1e293b] border border-cyan-500/50 hover:border-cyan-400 text-[#22d3ee] text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] active:scale-95"
          title="Flip ID Card"
        >
          <RotateCw className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
        </button>
      </div>

      {/* Interactive Spider Hanging & Suspension Stage */}
      <div className="relative z-10 px-3 sm:px-4 pt-1 pb-4 flex flex-col items-center">
        {/* Interaction Prompt Hint */}
        <div
          onClick={triggerBounce}
          tabIndex={0}
          role="button"
          onKeyDown={handleKeyDown}
          aria-label="Pull down badge or click to bounce"
          className={`mb-1 inline-flex items-center gap-1.5 px-3 py-1 bg-[#020617] border border-cyan-500/40 text-cyan-300 text-[10px] font-mono uppercase tracking-widest cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-950/40 shadow-xs ${
            hasInteracted ? 'opacity-75 hover:opacity-100' : 'animate-pulse'
          }`}
        >
          <ArrowDown className="w-3 h-3 text-[#22d3ee] animate-bounce" />
          <span>Pull down badge or click to bounce</span>
        </div>

        {/* Hanging Stage Anchor & Thread Area */}
        <div className="relative w-full flex flex-col items-center">
          {/* FIXED TOP CEILING SILK WEB ANCHOR (NEVER MOVES) */}
          <div className="relative flex flex-col items-center z-20 pointer-events-none">
            <div className="w-8 h-2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full shadow-[0_0_8px_#06b6d4]" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee] -mt-1" />
          </div>

          {/* DYNAMIC SILK THREAD SVG (Permanently pinned to fixed top anchor, extends down to spider) */}
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 pointer-events-none z-10"
            style={{
              height: `${currentThreadLength}px`,
              width: '40px',
            }}
          >
            <svg
              width="40"
              height={currentThreadLength}
              className="overflow-visible w-full h-full"
              viewBox={`0 0 40 ${currentThreadLength}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="silkGlow" x="-50%" y="-20%" width="200%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#22d3ee" floodOpacity="0.8" />
                </filter>
              </defs>
              {/* Core Silk Line */}
              <line
                x1="20"
                y1="0"
                x2="20"
                y2={currentThreadLength}
                stroke="#e0f2fe"
                strokeWidth="1.8"
                filter="url(#silkGlow)"
              />
              <line
                x1="20"
                y1="0"
                x2="20"
                y2={currentThreadLength}
                stroke="#38bdf8"
                strokeWidth="0.8"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Draggable Hanging Unit: Cyber Spider + Badge (Moves down on drag with spring bounce) */}
          <div
            tabIndex={0}
            role="region"
            aria-label="Interactive ID badge hanging by cyber spider. Drag down or press Enter to bounce."
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`relative flex flex-col items-center cursor-grab active:cursor-grabbing select-none ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
            style={{
              marginTop: `${threadBaseLength}px`,
              touchAction: 'none',
              transform: `translate3d(0, ${displacement}px, 0) rotate(${dragTilt}deg)`,
              transformOrigin: 'top center',
              transition: isDragging ? 'none' : 'transform 0.05s ease-out',
              willChange: 'transform',
            }}
          >
            {/* THE CYBER SPIDER (Suspended between silk thread and badge) */}
            <div
              className="relative -mt-2.5 -mb-3 z-30 transition-transform duration-150 animate-spider-idle pointer-events-none"
              style={{
                transform: isDragging ? 'scale(1.08, 0.95)' : 'scale(1)',
                willChange: 'transform',
              }}
            >
            <svg
              width="64"
              height="52"
              viewBox="0 0 64 52"
              className="overflow-visible filter drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]"
              aria-hidden="true"
            >
              {/* Abdomen / Rear Teardrop with cyber circuit markings */}
              <ellipse
                cx="32"
                cy="17"
                rx="8"
                ry="11"
                fill="#091124"
                stroke="#06b6d4"
                strokeWidth="1.4"
              />
              {/* Cyber Hourglass / Circuit Accents */}
              <path
                d="M 28 13 L 32 19 L 36 13"
                stroke="#22d3ee"
                strokeWidth="1.2"
                fill="none"
                opacity="0.95"
              />
              <path
                d="M 29 21 L 32 17 L 35 21"
                stroke="#22d3ee"
                strokeWidth="1.2"
                fill="none"
                opacity="0.95"
              />
              <circle cx="32" cy="23" r="1.5" fill="#facc15" />

              {/* Cephalothorax / Head */}
              <ellipse
                cx="32"
                cy="29"
                rx="6"
                ry="5"
                fill="#0f172a"
                stroke="#06b6d4"
                strokeWidth="1.4"
              />

              {/* Glowing Spider Eyes */}
              <circle cx="30" cy="31.5" r="1" fill="#22d3ee" />
              <circle cx="34" cy="31.5" r="1" fill="#22d3ee" />
              <circle cx="28.5" cy="30" r="0.65" fill="#facc15" />
              <circle cx="35.5" cy="30" r="0.65" fill="#facc15" />

              {/* Chelicerae / Front Fangs */}
              <path d="M 30.5 33.5 L 30 36.5" stroke="#22d3ee" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M 33.5 33.5 L 34 36.5" stroke="#22d3ee" strokeWidth="1.3" strokeLinecap="round" />

              {/* 8 Articulated Legs */}
              {/* Left Legs */}
              {/* Leg 1: Front reaching down to grip card slot */}
              <path
                d="M 28 29 Q 17 38 23 48"
                stroke="#06b6d4"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leg 2: Front gripping card edge */}
              <path
                d="M 27 28 Q 13 32 15 44"
                stroke="#0891b2"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leg 3: Mid side */}
              <path
                d="M 27 26 Q 7 21 9 10"
                stroke="#0891b2"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leg 4: Rear reaching up toward silk thread */}
              <path
                d="M 28 21 Q 14 11 18 3"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Right Legs */}
              {/* Leg 1: Front reaching down to grip card slot */}
              <path
                d="M 36 29 Q 47 38 41 48"
                stroke="#06b6d4"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leg 2: Front gripping card edge */}
              <path
                d="M 37 28 Q 51 32 49 44"
                stroke="#0891b2"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leg 3: Mid side */}
              <path
                d="M 37 26 Q 57 21 55 10"
                stroke="#0891b2"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leg 4: Rear reaching up toward silk thread */}
              <path
                d="M 36 21 Q 50 11 46 3"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Polycarbonate ID Badge Holder Frame */}
          <div
            ref={cardContainerRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="relative w-full max-w-[340px] sm:max-w-[355px] pt-3 pb-2 px-2 bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-700/60 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.7),0_0_20px_-3px_rgba(6,182,212,0.25)] transition-all"
            style={{
              transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              willChange: 'transform',
            }}
          >
            {/* Soft Cyan Cursor Follow Glow */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-60"
              style={{
                background: `radial-gradient(circle 140px at ${glowPos.x}% ${glowPos.y}%, rgba(6, 182, 212, 0.2), transparent 80%)`,
              }}
            />

            {/* Clear Badge Grip Slot Hole at the top of the holder */}
            <div className="w-14 h-2.5 mx-auto -mt-1 mb-2.5 bg-[#020617] border border-cyan-500/60 rounded-full shadow-inner flex items-center justify-center">
              <div className="w-6 h-1 bg-cyan-400/60 rounded-full" />
            </div>

            {/* THE FLIPPABLE ID CARD CONTAINER */}
            <div
              className="relative w-full rounded-lg overflow-hidden border border-cyan-500/50 bg-[#0f172a] shadow-inner transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ==================== FRONT OF ID CARD ==================== */}
              <div
                className={`p-4 sm:p-5 flex flex-col justify-between relative bg-gradient-to-b from-[#0f172a] via-[#091124] to-[#020617] text-white ${
                  isFlipped ? 'hidden' : 'block'
                }`}
              >
                {/* Holographic Sheen Overlay */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-cyan-400/5 to-transparent pointer-events-none" />

                {/* College Header Strip */}
                <div className="border-b border-[#1e293b] pb-2.5 mb-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#06b6d4] text-slate-950 font-black flex items-center justify-center text-xs font-mono shadow-[0_0_10px_#06b6d4]">
                        <Building2 className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-white font-display leading-tight">
                          MOHAMED SATHAK
                        </h4>
                        <p className="text-[9px] font-mono text-cyan-300 tracking-tight leading-none">
                          COLLEGE OF ARTS &amp; SCIENCE
                        </p>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#020617] border border-cyan-500/50 text-cyan-400 font-bold rounded-xs shadow-xs">
                      STUDENT // DEV
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>AFFILIATED TO UNIV. OF MADRAS</span>
                    <span className="text-[#22d3ee] font-semibold">CHENNAI, TN</span>
                  </div>
                </div>

                {/* Middle Section: Photo & Primary Student Data */}
                <div className="flex gap-3.5 items-start mb-3">
                  {/* Photo with Cyber Framing & Verified Tag */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-28 sm:w-26 sm:h-30 rounded-md overflow-hidden border-2 border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-[#020617]">
                      <img
                        src="/ibrahim-id-photo.png"
                        alt="Ibrahim S - Student ID Portrait"
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                    </div>
                    {/* Official Badge Indicator */}
                    <div className="absolute -bottom-1 -right-1 bg-[#020617] border border-emerald-500/80 rounded-full p-0.5 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                    </div>
                  </div>

                  {/* Student Details Column */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div>
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-bold">
                        STUDENT NAME
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white font-display tracking-wide uppercase leading-tight truncate">
                        IBRAHIM. S
                      </h3>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-bold">
                        PROGRAM / DEGREE
                      </span>
                      <p className="text-xs font-mono font-bold text-[#22d3ee] leading-tight">
                        {EDUCATION.degree}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-bold">
                        ROLE
                      </span>
                      <p className="text-xs font-mono font-bold text-[#facc15] leading-tight">
                        Full-Stack Web Developer
                      </p>
                    </div>

                    {/* Dual Status Pills: 3RD YEAR & OPEN TO INTERNSHIPS */}
                    <div className="pt-0.5 flex flex-wrap gap-1.5">
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#020617] border border-[#facc15]/50 text-[#facc15] text-[9.5px] font-mono font-bold uppercase rounded-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-ping" />
                        <span>3RD YEAR (FINAL YEAR)</span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 text-[9.5px] font-mono font-bold uppercase rounded-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>OPEN TO INTERNSHIPS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata Grid Strip (With PORTFOLIO ID & High Readability) */}
                <div className="p-2.5 bg-[#020617]/95 border border-[#1e293b] rounded-md grid grid-cols-2 gap-2 text-[10px] font-mono mb-3">
                  <div>
                    <span className="text-slate-300 block text-[9.5px] uppercase font-bold tracking-wider">
                      BATCH TIMELINE
                    </span>
                    <span className="text-white font-bold text-xs">{EDUCATION.timeline}</span>
                  </div>
                  <div>
                    <span className="text-slate-300 block text-[9.5px] uppercase font-bold tracking-wider">
                      PORTFOLIO ID
                    </span>
                    <span className="text-[#22d3ee] font-bold text-xs">IBRAHIM-DEV-2027</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-300 block text-[9.5px] uppercase font-bold tracking-wider">
                      DEPARTMENT
                    </span>
                    <span className="text-slate-100 font-bold">Dept. of Computer Applications (BCA)</span>
                  </div>
                </div>

                {/* Bottom Real Scannable QR Code & Verified Hologram */}
                <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between gap-2">
                  {/* Smart EMV Gold Chip Icon */}
                  <div className="w-7 h-5 rounded-xs bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/80 shadow-xs flex items-center justify-center p-0.5 shrink-0">
                    <div className="w-full h-full border border-amber-700/40 grid grid-cols-2 gap-0.5 opacity-80" />
                  </div>

                  {/* Real Scannable QR Code */}
                  <div className="flex items-center gap-2">
                    {qrCodeUrl ? (
                      <div className="p-0.5 bg-white rounded-xs shadow-sm">
                        <img
                          src={qrCodeUrl}
                          alt="Portfolio QR Code"
                          className="w-8 h-8 block"
                          title="Scan to view portfolio"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-white" />
                    )}
                    <div className="text-left">
                      <span className="text-[8px] font-mono text-cyan-400 block font-bold uppercase tracking-wider">
                        SCAN TO VISIT
                      </span>
                      <span className="text-[7.5px] font-mono text-slate-400 block">
                        Live Portfolio Link
                      </span>
                    </div>
                  </div>

                  {/* Verified Holographic Seal */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 via-emerald-400 to-teal-200 p-[1px] shadow-[0_0_8px_rgba(6,182,212,0.4)] flex items-center justify-center text-slate-950 font-bold shrink-0">
                    <ShieldCheck className="w-4 h-4 text-slate-950" />
                  </div>
                </div>
              </div>

              {/* ==================== BACK OF ID CARD (DEVELOPER PROFILE) ==================== */}
              <div
                className={`p-4 sm:p-5 flex flex-col justify-between relative bg-gradient-to-b from-[#0b1329] via-[#060c1c] to-[#020617] text-white [transform:rotateY(180deg)] ${
                  isFlipped ? 'block' : 'hidden'
                }`}
              >
                {/* Magnetic Strip Header */}
                <div className="h-6 -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 bg-[#020617] border-b border-cyan-500/30 mb-2.5 flex items-center justify-between px-4">
                  <span className="text-[8.5px] font-mono text-cyan-400 font-bold tracking-widest">
                    SYSTEM AUTHORIZED // VERIFIED DEV
                  </span>
                  <span className="text-[8.5px] font-mono text-amber-400 font-bold">
                    2024-2027
                  </span>
                </div>

                <div className="space-y-2.5">
                  {/* Title */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#1e293b]">
                    <span className="text-xs font-mono text-[#22d3ee] uppercase font-bold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#06b6d4]" />
                      <span>DEV PROFILE // IBRAHIM.S</span>
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#020617] border border-cyan-500/40 text-cyan-300 font-bold">
                      FULL-STACK
                    </span>
                  </div>

                  {/* Tech Stack Tags */}
                  <div>
                    <span className="text-[9.5px] font-mono text-slate-300 uppercase tracking-wider block font-bold mb-1">
                      CORE TECH STACK
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {['Node.js', 'Express', 'Supabase', 'REST APIs', 'C++', 'Python'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-[#020617] border border-cyan-500/40 text-slate-200 text-[10px] font-mono font-medium rounded-xs hover:border-cyan-300 transition-colors"
                        >
                          <span className="text-cyan-400 font-bold mr-1">&bull;</span>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured Project Box: Football Zone */}
                  <div className="p-2.5 bg-[#020617]/95 border border-[#1e293b] rounded-sm hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-mono text-[#facc15] font-bold uppercase tracking-wider">
                        FEATURED PROJECT
                      </span>
                      <a
                        href="#work"
                        className="text-[9.5px] font-mono text-[#22d3ee] hover:underline flex items-center gap-1 font-bold"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <h5 className="text-xs font-display font-bold text-white uppercase">
                      Football Zone
                    </h5>
                    <p className="text-[10px] font-sans text-slate-300 leading-snug mt-0.5">
                      Live sports analytics and community predictions platform built with modern web standards and database persistence.
                    </p>
                  </div>

                  {/* Contact Row & Resume Action */}
                  <div className="pt-1 border-t border-[#1e293b] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* GitHub Profile */}
                      <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile: ibrahimirahim1005-wq"
                        className="p-1.5 bg-[#0f172a] border border-[#1e293b] hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                        title="GitHub Profile"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>

                      {/* LinkedIn Profile */}
                      <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile: ibrahim-i-rahim"
                        className="p-1.5 bg-[#0f172a] border border-[#1e293b] hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        aria-label={`Direct Email: ${SOCIAL_LINKS.email}`}
                        className="p-1.5 bg-[#0f172a] border border-[#1e293b] hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                        title={`Direct Email: ${SOCIAL_LINKS.email}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* View / Download Resume Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenResume) {
                          onOpenResume();
                        } else {
                          window.dispatchEvent(new CustomEvent('open-resume-modal'));
                        }
                      }}
                      className="px-2.5 py-1 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-all shadow-[0_0_10px_rgba(6,182,212,0.4)] cursor-pointer"
                    >
                      <FileText className="w-3 h-3 stroke-[2.5]" />
                      <span>Resume</span>
                    </button>
                  </div>
                </div>

                {/* Back Footer Strip with QR Code Scan Note */}
                <div className="pt-2 mt-2 border-t border-[#1e293b] flex items-center justify-between">
                  <span className="text-[8px] font-mono text-slate-400">
                    SCAN OR TAP &bull; IBRAHIM.S PORTFOLIO
                  </span>
                  {qrCodeUrl && (
                    <div className="p-0.5 bg-white rounded-xs">
                      <img
                        src={qrCodeUrl}
                        alt="Portfolio QR Code"
                        className="w-5 h-5 block"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Ground Soft Shadow (expands & shrinks with spring motion) */}
          <div
            className="w-44 h-3.5 rounded-full bg-cyan-500/15 blur-md transition-all pointer-events-none mt-2"
            style={{
              transform: `scale(${Math.max(0.65, 1 - displacement * 0.0035)})`,
              opacity: Math.max(0.2, 0.65 - displacement * 0.003),
            }}
          />
        </div>
      </div>

        {/* Action Controls & Info Footer */}
        <div className="w-full mt-3 pt-2.5 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold">Active Scholar // Class of 2027</span>
          </div>

          <button
            onClick={triggerBounce}
            className="text-[11px] font-mono text-[#22d3ee] hover:text-cyan-200 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Spring Web</span>
            <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
          </button>
        </div>
      </div>
    </div>
  );
};
