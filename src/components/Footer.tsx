import React from 'react';
import { ChevronUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { ScrollReveal } from './ui/ScrollReveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, {
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 bg-[#020617] border-t border-[#1e293b] text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal duration={0.65}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1e293b]">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#06b6d4] text-slate-950 font-black font-display flex items-center justify-center text-base shadow-[0_0_10px_#06b6d4]">
              I
            </div>
            <div>
              <span className="text-white font-bold font-display text-sm uppercase tracking-wider">
                {PERSONAL_INFO.name}
              </span>
              <p className="text-[11px] text-slate-500">
                BCA Student Portfolio &bull; Mohamed Sathak College (2024–27)
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#22d3ee] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Github className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>GitHub</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#22d3ee] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-slate-400 hover:text-[#22d3ee] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Mail className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Email</span>
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] text-slate-300 hover:text-[#22d3ee] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer uppercase tracking-wider hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>© 2026 IBRAHIM.S — ALL RIGHTS RESERVED &bull; MOHAMED SATHAK COLLEGE (2027)</span>
          <span className="tracking-widest uppercase text-[#22d3ee] font-bold">
            BUILT WITH CODE &amp; CURIOSITY
          </span>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
