import React from 'react';

interface TechItem {
  id: string;
  name: string;
  category: 'core' | 'ai' | 'tool' | 'data';
  renderIcon: () => React.ReactNode;
  accentGlow?: string;
}

export const TechPipelineStream: React.FC = () => {
  const techStack: TechItem[] = [
    {
      id: 'power-bi',
      name: 'POWER BI',
      category: 'data',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="13" width="3.5" height="8" rx="0.5" fill="#ECA527" opacity="0.65" />
          <rect x="10.25" y="8" width="3.5" height="13" rx="0.5" fill="#ECA527" opacity="0.88" />
          <rect x="17.5" y="3" width="3.5" height="18" rx="0.5" fill="#FACC15" />
        </svg>
      ),
      accentGlow: 'hover:border-yellow-400/80 hover:shadow-[0_0_12px_rgba(250,204,21,0.35)]',
    },
    {
      id: 'sql-dbms',
      name: 'SQL / DBMS',
      category: 'data',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="#FACC15" />
          <path d="M3 5v5c0 1.66 4.03 3 9 3s9-1.34 9-3V5" fill="none" stroke="#FACC15" strokeWidth="2" />
          <path d="M3 10v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5" fill="none" stroke="#EAB308" strokeWidth="2" />
          <path d="M3 15v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4" fill="none" stroke="#CA8A04" strokeWidth="2" />
        </svg>
      ),
      accentGlow: 'hover:border-yellow-400/80 hover:shadow-[0_0_12px_rgba(250,204,21,0.35)]',
    },
    {
      id: 'git',
      name: 'GIT',
      category: 'tool',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#F05032"
            d="M2.6 10.6L10.6 2.6c.8-.8 2.1-.8 2.8 0l8 8c.8.8.8 2.1 0 2.8l-8 8c-.8.8-2.1.8-2.8 0l-8-8c-.8-.7-.8-2 0-2.8z"
          />
          <circle cx="12" cy="12" r="2" fill="#ffffff" />
          <circle cx="8" cy="8" r="1.5" fill="#ffffff" />
          <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
          <path stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" d="M8 8l4 4m0 0l4 4" />
        </svg>
      ),
      accentGlow: 'hover:border-orange-500/80 hover:shadow-[0_0_12px_rgba(240,80,50,0.35)]',
    },
    {
      id: 'github',
      name: 'GITHUB',
      category: 'tool',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0 fill-white" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
      accentGlow: 'hover:border-slate-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]',
    },
    {
      id: 'jupyter',
      name: 'JUPYTER',
      category: 'data',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#F37626"
            d="M12 4.5a8.5 8.5 0 0 0-7.36 4.25 1 1 0 0 1 1.72 1A6.5 6.5 0 0 1 12 6.5a6.5 6.5 0 0 1 5.64 3.25 1 1 0 0 1 1.72-1A8.5 8.5 0 0 0 12 4.5z"
          />
          <path
            fill="#F37626"
            d="M12 19.5a8.5 8.5 0 0 0 7.36-4.25 1 1 0 0 1-1.72-1A6.5 6.5 0 0 1 12 17.5a6.5 6.5 0 0 1-5.64-3.25 1 1 0 0 1-1.72 1A8.5 8.5 0 0 0 12 19.5z"
          />
          <circle cx="12" cy="2" r="1.5" fill="#94A3B8" />
          <circle cx="12" cy="22" r="1.5" fill="#94A3B8" />
          <circle cx="21" cy="12" r="1.5" fill="#F37626" />
        </svg>
      ),
      accentGlow: 'hover:border-orange-400 hover:shadow-[0_0_12px_rgba(243,118,38,0.35)]',
    },
    {
      id: 'vs-code',
      name: 'VS CODE',
      category: 'tool',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#007ACC"
            d="M17.5 2.2l4.8 2.3c.7.3 1.2 1 1.2 1.8v11.4c0 .8-.5 1.5-1.2 1.8l-4.8 2.3c-.6.3-1.4.1-1.8-.4L7.5 13.5l-4.7 3.6c-.4.3-1 .3-1.4 0L.4 16.3c-.4-.3-.5-.9-.2-1.3L4.6 12 .2 9c-.3-.4-.2-1 .2-1.3l1-1c.4-.3 1-.3 1.4 0l4.7 3.6 8.2-7.9c.4-.5 1.2-.7 1.8-.4z"
          />
          <path
            fill="#1F9CF0"
            d="M17.5 2.2L9.2 10.1l8.3 7.9c.6.3 1.4.1 1.8-.4l4.2-3.8V6.2L19.3 2.6c-.4-.5-1.2-.7-1.8-.4z"
          />
        </svg>
      ),
      accentGlow: 'hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,122,204,0.4)]',
    },
    {
      id: 'java',
      name: 'JAVA',
      category: 'core',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#007396" d="M4 19c3 1.5 13 1.5 16 0-1-1-4-1.5-8-1.5s-7 .5-8 1.5z" />
          <path fill="#007396" d="M5.5 15.5c2.5 1 10.5 1 13 0-1-.8-3.5-1.2-6.5-1.2s-5.5.4-6.5 1.2z" />
          <path fill="#E76F00" d="M10 2c1 2-2 4 0 6 1.5-2 1-3.5 0-6z" />
          <path fill="#E76F00" d="M14 3.5c.8 1.8-1.5 3.5 0 5 1.2-1.5.8-3 0-5z" />
        </svg>
      ),
      accentGlow: 'hover:border-cyan-500 hover:shadow-[0_0_12px_rgba(0,115,150,0.35)]',
    },
    {
      id: 'html5',
      name: 'HTML5',
      category: 'core',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#E34F26" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
          <path fill="#EF652A" d="M12 3.8v18.4l5.6-1.4L19.1 3.8H12z" />
          <path
            fill="#ffffff"
            d="M7.4 6.7h9.2l-.3 3.3H9.9l.3 3.3h6.3l-.6 6.3-3.9 1.1-3.9-1.1-.3-3.3h2.3l.1 1.7 1.8.5 1.8-.5.2-2.3H7.1L7.4 6.7z"
          />
        </svg>
      ),
      accentGlow: 'hover:border-orange-500 hover:shadow-[0_0_12px_rgba(227,79,38,0.4)]',
    },
    {
      id: 'css3',
      name: 'CSS3',
      category: 'core',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#1572B6" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
          <path fill="#33A9DC" d="M12 3.8v18.4l5.6-1.4L19.1 3.8H12z" />
          <path
            fill="#ffffff"
            d="M16.6 6.7H7.4l.3 3.3h5.6l-.3 3.3H7.7l.3 3.3h6.3l-.6 6.3-1.7.5-1.7-.5-.1-1.7H7.9l.3 3.3 3.8 1.1 3.8-1.1 1.4-15.7h-.6z"
          />
        </svg>
      ),
      accentGlow: 'hover:border-blue-400 hover:shadow-[0_0_12px_rgba(51,169,220,0.4)]',
    },
    {
      id: 'cursor-ai',
      name: 'CURSOR AI',
      category: 'ai',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#06B6D4" d="M12 2L2 7l10 5 10-5-10-5z" />
          <path fill="#0891B2" d="M2 17l10 5V12L2 7v10z" />
          <path fill="#22D3EE" d="M12 22l10-5V7l-10 5v10z" />
        </svg>
      ),
      accentGlow: 'hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]',
    },
    {
      id: 'python',
      name: 'PYTHON',
      category: 'core',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#3776AB"
            d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h5.9v.8H6.5S4 5.3 4 8.5s2.2 3.2 2.2 3.2h1.3v-1.6s-.1-1.8 1.8-1.8h3.1s1.7 0 1.7-1.7V4.3s.3-2.3-2.2-2.3zm-1.7 1.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z"
          />
          <path
            fill="#FFD43B"
            d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-1.4H9.1v-.8h8.4s2.5.2 2.5-3-2.2-3.2-2.2-3.2h-1.3v1.6s.1 1.8-1.8 1.8h-3.1s-1.7 0-1.7 1.7v2.3s-.3 2.3 2.2 2.3zm1.7-1.3a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z"
          />
        </svg>
      ),
      accentGlow: 'hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(255,212,59,0.35)]',
    },
    {
      id: 'chatgpt',
      name: 'CHATGPT / AI',
      category: 'ai',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0 fill-[#10A37F]" viewBox="0 0 24 24">
          <path d="M22.28 9.37a5.53 5.53 0 0 0-.47-4.52 5.6 5.6 0 0 0-4.63-2.73 5.7 5.7 0 0 0-1.42.18A5.55 5.55 0 0 0 11.5 1a5.62 5.62 0 0 0-5.18 3.44 5.54 5.54 0 0 0-3.6 2.6A5.62 5.62 0 0 0 2.2 11.6a5.54 5.54 0 0 0 .47 4.52 5.6 5.6 0 0 0 4.63 2.73 5.7 5.7 0 0 0 1.42-.18A5.55 5.55 0 0 0 12.5 23a5.62 5.62 0 0 0 5.18-3.44 5.54 5.54 0 0 0 3.6-2.6 5.62 5.62 0 0 0 .52-4.56l.48-.03zM12 14.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      ),
      accentGlow: 'hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,163,127,0.4)]',
    },
    {
      id: 'claude-ai',
      name: 'CLAUDE AI',
      category: 'ai',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#D97757" d="M12 2l1.6 6.3L20 10l-6.4 1.7L12 18l-1.6-6.3L4 10l6.4-1.7L12 2z" />
        </svg>
      ),
      accentGlow: 'hover:border-orange-400 hover:shadow-[0_0_12px_rgba(217,119,87,0.4)]',
    },
    {
      id: 'javascript',
      name: 'JAVASCRIPT',
      category: 'core',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="2" fill="#F7DF1E" />
          <path
            d="M7 17.5c.5.8 1.2 1.3 2.2 1.3 1.2 0 1.9-.6 1.9-1.7V10h-2.1v7.1c0 .4-.2.6-.5.6-.3 0-.5-.2-.7-.5l-.8.3zm7.8-.3c.7 1 1.7 1.6 3.1 1.6 1.8 0 2.9-1 2.9-2.5 0-1.5-.9-2.1-2.4-2.8l-.8-.3c-.9-.4-1.3-.7-1.3-1.3 0-.6.5-1.1 1.4-1.1.8 0 1.4.3 1.8.9l1.6-1c-.8-1.3-2-1.7-3.4-1.7-2.1 0-3.3 1.2-3.3 2.7 0 1.4.8 2.2 2.2 2.8l.8.3c1 .4 1.5.8 1.5 1.4 0 .7-.6 1.2-1.6 1.2-1.1 0-1.9-.6-2.4-1.4l-1.9 1.3z"
            fill="#000000"
          />
        </svg>
      ),
      accentGlow: 'hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(247,223,30,0.4)]',
    },
    {
      id: 'supabase',
      name: 'SUPABASE',
      category: 'data',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#3ECF8E"
            d="M21.36 15.11a1.2 1.2 0 0 1-.94 1.89H13.5v5.8a1.2 1.2 0 0 1-2.14.77l-8.72-10.9a1.2 1.2 0 0 1 .94-1.89h6.92v-5.8a1.2 1.2 0 0 1 2.14-.77l8.72 10.9z"
          />
        </svg>
      ),
      accentGlow: 'hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(62,207,142,0.4)]',
    },
    {
      id: 'node-js',
      name: 'NODE.JS',
      category: 'core',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#5FA04E" d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L4.8 8.5v7.2L12 19.9l7.2-4.2V8.5L12 4.3z" />
        </svg>
      ),
      accentGlow: 'hover:border-green-500 hover:shadow-[0_0_12px_rgba(95,160,78,0.4)]',
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'core',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#00599C" d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" />
          <path fill="#ffffff" d="M10 8h2v2h2v2h-2v2h-2v-2H8v-2h2V8z" />
          <path fill="#659AD2" d="M16 10h1.5v1.5H19v1h-1.5V14H16v-1.5h-1.5v-1H16V10z" />
        </svg>
      ),
      accentGlow: 'hover:border-blue-500 hover:shadow-[0_0_12px_rgba(0,89,156,0.4)]',
    },
    {
      id: 'postman',
      name: 'POSTMAN',
      category: 'tool',
      renderIcon: () => (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#FF6C37" />
          <path
            fill="#ffffff"
            d="M7 13.5l3.5-3.5 2 2 4.5-5-1.5 6-3-1-2 2z"
          />
        </svg>
      ),
      accentGlow: 'hover:border-orange-500 hover:shadow-[0_0_12px_rgba(255,108,55,0.4)]',
    },
  ];

  // We duplicate the array to guarantee an uninterrupted, smooth, infinite continuous stream
  const marqueeItems = [...techStack, ...techStack];

  return (
    <div className="mb-14 bg-[#020617] border border-[#1e293b] p-4 sm:p-5 shadow-2xl relative overflow-hidden group/pipeline">
      {/* Top Header Bar matching reference image */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3.5 mb-4 border-b border-[#1e293b] gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-[#facc15] shadow-[0_0_8px_#facc15]" />
          <h3 className="font-mono text-xs sm:text-xs font-bold uppercase tracking-widest text-slate-100">
            CONTINUOUS PIPELINE // ACTIVE TECH STACK &amp; LIBRARIES
          </h3>
        </div>

        <div className="text-[10px] sm:text-[11px] font-mono text-[#64748b] tracking-wider uppercase flex items-center gap-2">
          <span>HOVER TO PAUSE</span>
          <span>&bull;</span>
          <span className="text-[#22d3ee]/80">HARDWARE-ACCELERATED STREAM</span>
        </div>
      </div>

      {/* Marquee Viewport with Left and Right Gradient Fades */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-10" />

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-10" />

        {/* Sliding Marquee Track */}
        <div className="animate-pipeline-stream flex gap-3 sm:gap-3.5 py-1">
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.id}-${index}`}
              className={`flex items-center gap-2.5 px-3.5 py-2 bg-[#0f172a] hover:bg-[#1e293b] border border-[#1e293b] ${
                tech.accentGlow || 'hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              } transition-all duration-200 cursor-default shrink-0 group`}
            >
              {tech.renderIcon()}
              <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-200 uppercase tracking-wider group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
