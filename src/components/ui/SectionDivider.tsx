import React from 'react';

interface SectionDividerProps {
  className?: string;
  delay?: number;
}

/**
 * Animated Cyan Divider (Option 6)
 * Thin futuristic neon-cyan horizontal line with traveling glowing cyan dot,
 * soft light-trail, and subtle ambient neon glow.
 * Reusable between every portfolio section boundary.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  delay,
}) => {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`relative w-full py-4 sm:py-5 overflow-hidden pointer-events-none select-none z-20 flex items-center justify-center ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Soft Ambient Neon Glow Line behind the track */}
        <div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee]/25 to-transparent blur-[3px]" />

        {/* Base Static Futuristic Neon-Cyan Track Line */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/80 via-15% via-[#06b6d4]/50 via-50% via-slate-800/80 via-85% to-transparent flex items-center">
          {/* Center Micro Cyber Node Accent (Geometric Diamond) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#020617] border border-cyan-400/80 shadow-[0_0_6px_#06b6d4]" />
          </div>

          {/* Animated Traveling Glowing Cyan Dot with Soft Light-Trail */}
          <div
            className="divider-runner absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
            style={delay !== undefined ? { animationDelay: `${delay}s` } : undefined}
          >
            {/* Luminous Light-Trail fading softly behind the traveling dot */}
            <div className="w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/25 via-50% via-[#06b6d4]/70 to-[#22d3ee]" />

            {/* Glowing Photon Head Particle */}
            <div className="relative -ml-1 flex items-center justify-center">
              {/* Soft Pulsing Ambient Halo */}
              <span className="w-3 h-3 rounded-full bg-cyan-400/35 blur-[2px] absolute animate-pulse" />
              {/* Crisp Brilliant White/Cyan Core */}
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#22d3ee,0_0_16px_#06b6d4] border border-cyan-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
