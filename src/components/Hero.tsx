import React from 'react';
import {
  FileText,
  ArrowRight,
  ArrowDown,
  Camera,
  Layers,
  Sparkles,
  Trophy,
  GraduationCap,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Eye,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, SKILLS, FEATURED_PROJECT, SOCIAL_LINKS } from '../data/portfolioData';
import { LampContainer } from './ui/lamp';

interface HeroProps {
  onOpenResume: () => void;
  onOpenPhoto: () => void;
  customPhotoUrl: string | null;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenPhoto, customPhotoUrl }) => {
  const scrollToProjects = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const projectsEl = document.getElementById('work') || document.getElementById('projects');
    if (projectsEl) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(projectsEl, {
          offset: -75,
          duration: 1.3,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };



  const scrollToAbout = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(aboutEl, {
          offset: -75,
          duration: 1.3,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        aboutEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="relative w-full bg-[#020617] flex flex-col justify-between">
      <LampContainer className="w-full pt-28 sm:pt-32 pb-10 sm:pb-12 justify-center">
        <div
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center"
          style={{
            display: 'grid',
          }}
        >
          {/* Left Column: Hero Content */}
          <div className="w-full md:col-span-7 space-y-3 sm:space-y-3.5 lg:space-y-4 z-10 text-left">
              {/* "OPEN TO INTERNSHIPS" Yellow Accent Label */}
              <div className="inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold">
                <span className="px-2.5 py-0.5 bg-[#facc15] text-slate-950 font-black tracking-widest shadow-[0_0_10px_#facc15]">
                  OPEN TO INTERNSHIPS
                </span>
                <span className="text-slate-600 font-mono">//</span>
                <span className="text-[#22d3ee] tracking-widest font-mono">CLASS OF 2027</span>
              </div>

              {/* Oversized Name in Bold White / Metallic Gradient */}
                {/* SHINE SWEEP: Metallic Light Sweep Effect across Letters Only */}
                <h1
                  data-text={PERSONAL_INFO.name}
                  className="shine-sweep-heading relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display tracking-tight uppercase leading-[0.92] select-none bg-linear-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
                >
                  {PERSONAL_INFO.name}
                </h1>

                {/* Role Badge: FULL-STACK WEB DEVELOPER / BCA STUDENT */}
                <div className="inline-block pt-0.5">
                  <div className="px-3 py-1 bg-[#0f172a] border border-[#06b6d4] text-[#22d3ee] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    FULL-STACK WEB DEVELOPER / BCA STUDENT
                  </div>
                </div>

              {/* Professional Introduction & Focus */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-sans pt-0.5">
                Third-year BCA student at{' '}
                <strong className="text-white font-semibold">
                  Mohamed Sathak College of Arts and Science
                </strong>{' '}
                (Class of 2027). I build responsive web applications and REST APIs with{' '}
                <strong className="text-cyan-300 font-semibold">Node.js, Express, and Supabase</strong>.
                Creator of{' '}
                <strong className="text-cyan-300 font-semibold">Football Zone</strong>, an interactive
                analytics and community predictions platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                {/* Yellow "VIEW PROJECTS" Button */}
                <a
                  href="#work"
                  onClick={scrollToProjects}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#facc15] hover:bg-[#fde047] text-slate-950 font-mono text-xs sm:text-sm font-black tracking-wider uppercase flex items-center gap-2 transition-all shadow-[0_0_20px_-2px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)] active:translate-y-0.5 cursor-pointer"
                >
                  <span>VIEW PROJECTS</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                {/* Primary "VIEW FULL RESUME" Button */}
                <button
                  onClick={onOpenResume}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-mono text-xs sm:text-sm font-black tracking-wider uppercase flex items-center gap-2 transition-all shadow-[0_0_20px_-2px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] active:translate-y-0.5 cursor-pointer"
                  title="Open responsive full-page resume viewer"
                >
                  <Eye className="w-4 h-4 stroke-[2.5]" />
                  <span>VIEW FULL RESUME</span>
                </button>
              </div>

              {/* Social Icon Links */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  CONNECT:
                </span>
                {/* GitHub link */}
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile: ibrahimirahim1005-wq"
                  title="GitHub: ibrahimirahim1005-wq"
                  className="p-2 bg-[#0f172a] border border-[#06b6d4]/50 hover:border-[#06b6d4] text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 group relative"
                >
                  <Github className="w-4 h-4" />
                </a>

                {/* LinkedIn link */}
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile: ibrahim-i-rahim"
                  title="LinkedIn: Ibrahim I Rahim"
                  className="p-2 bg-[#0f172a] border border-[#06b6d4]/50 hover:border-[#06b6d4] text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 group relative"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* Gmail link */}
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  aria-label={`Direct Email: ${SOCIAL_LINKS.email}`}
                  title={`Email: ${SOCIAL_LINKS.email}`}
                  className="p-2 bg-[#0f172a] border border-[#06b6d4]/50 hover:border-[#06b6d4] text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 group relative"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Enhanced Professional Information Panel */}
              <div className="pt-2 sm:pt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono border-t border-slate-800/80">
                <div className="p-2.5 bg-[#0f172a]/90 border border-slate-700/80 hover:border-cyan-500/50 transition-colors shadow-sm">
                  <span className="text-slate-300 uppercase block text-[10px] font-bold tracking-wider mb-0.5">Degree &amp; College</span>
                  <span className="text-slate-100 font-semibold text-[11px] block truncate" title="Mohamed Sathak College">
                    BCA &bull; Mohamed Sathak
                  </span>
                </div>
                <div className="p-2.5 bg-[#0f172a]/90 border border-slate-700/80 hover:border-cyan-500/50 transition-colors shadow-sm">
                  <span className="text-slate-300 uppercase block text-[10px] font-bold tracking-wider mb-0.5">Graduation</span>
                  <span className="text-[#facc15] font-semibold text-[11px] block">
                    Expected 2027
                  </span>
                </div>
                <div className="p-2.5 bg-[#0f172a]/90 border border-slate-700/80 hover:border-cyan-500/50 transition-colors shadow-sm">
                  <span className="text-slate-300 uppercase block text-[10px] font-bold tracking-wider mb-0.5">Career Focus</span>
                  <span className="text-[#22d3ee] font-semibold text-[11px] block">
                    Software / Web Dev
                  </span>
                </div>
                <div className="p-2.5 bg-[#0f172a]/90 border border-slate-700/80 hover:border-cyan-500/50 transition-colors shadow-sm">
                  <span className="text-slate-300 uppercase block text-[10px] font-bold tracking-wider mb-0.5">Featured Platform</span>
                  <a
                    href="#work"
                    onClick={scrollToProjects}
                    className="text-slate-100 hover:text-[#22d3ee] transition-colors underline font-semibold text-[11px] block truncate"
                  >
                    Football Zone (Live Demo) &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent Cutout Portrait with Neon Cyan Lighting */}
            <div className="w-full md:col-span-5 relative flex flex-col items-center justify-center py-2 md:py-0 px-2 sm:px-4">
              <div className="relative w-fit max-w-full mx-auto">
                {/* Portrait Frame with Clean Neon Cyan Outline & Outer Glow tightly fitting image natural aspect ratio */}
                <div className="relative w-[302px] max-w-[85vw] bg-gradient-to-b from-[#0b1329] via-[#0f172a] to-[#020617] border-2 border-[#06b6d4] shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden group flex flex-col items-center justify-center p-0">
                  {/* Subtle inner radial ambient glow for depth */}
                  <div className="absolute inset-0 bg-radial-[at_50%_35%] from-cyan-500/20 via-transparent to-transparent pointer-events-none" />

                  {/* Top Header Tag Strip */}
                  <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3.5 py-1.5 sm:py-2 bg-gradient-to-b from-[#020617]/90 via-[#020617]/60 to-transparent border-b border-cyan-500/20 text-[10px] sm:text-[11px] font-mono">
                    <span className="text-[#22d3ee] font-bold tracking-wider flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" />
                      PORTRAIT // {PERSONAL_INFO.name}
                    </span>
                  </div>

                  {/* Cutout Portrait Image fitting snugly edge-to-edge inside the cyan frame */}
                  {customPhotoUrl ? (
                    <img
                      src={customPhotoUrl}
                      alt="Ibrahim S - BCA Student & Aspiring Software Developer Portrait"
                      className="relative z-10 w-full h-auto block object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{
                        width: '302px',
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter:
                          'drop-shadow(0 0 16px rgba(6, 182, 212, 0.45)) drop-shadow(0 8px 24px rgba(2, 6, 23, 0.85))',
                      }}
                      onError={(e) => {
                        // Fallback gracefully to default portrait asset if custom file fails
                        if (
                          customPhotoUrl !== PERSONAL_INFO.portraitAsset &&
                          PERSONAL_INFO.portraitAsset
                        ) {
                          (e.target as HTMLImageElement).src = PERSONAL_INFO.portraitAsset;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-6 relative z-10">
                      {/* Silhouette & Initial Monogram Placeholder */}
                      <div className="flex flex-col items-center justify-center my-auto space-y-3 pt-6">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-none border-2 border-[#06b6d4] bg-[#020617] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                          <span className="text-4xl sm:text-5xl font-black font-display text-white">
                            I
                          </span>
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#facc15]" />
                        </div>

                        <div className="text-center space-y-0.5">
                          <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-wider uppercase">
                            {PERSONAL_INFO.name}
                          </h3>
                          <p className="text-[11px] font-mono text-cyan-400">
                            BCA 3rd Year &bull; Mohamed Sathak College
                          </p>
                        </div>
                      </div>

                      {/* Upload / Replace button */}
                      <button
                        onClick={onOpenPhoto}
                        className="w-full py-2 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-slate-950 border border-slate-700 hover:border-cyan-400 text-slate-200 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload / Replace Photo</span>
                      </button>
                    </div>
                  )}

                  {/* Corner Accent Notches */}
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#facc15] z-30 pointer-events-none" />
                  <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-[#06b6d4] z-30 pointer-events-none" />

                  {/* Quick Change / Info Floating Pill */}
                  <button
                    onClick={onOpenPhoto}
                    className="absolute bottom-2.5 right-2.5 z-30 px-2.5 py-1 bg-black/85 hover:bg-[#06b6d4] hover:text-slate-950 text-white border border-cyan-400/80 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  >
                    <Camera className="w-3 h-3 text-[#22d3ee] group-hover:text-slate-950" />
                    <span>Photo Info</span>
                  </button>
                </div>

                {/* Floating Skill & Concept Badges - Evenly positioned around card perimeters */}
                <div className="hidden sm:block absolute -top-3.5 left-2 z-20 animate-float-slow">
                  <div className="px-2.5 py-0.5 bg-[#0f172a]/95 backdrop-blur-sm border border-cyan-500/50 hover:border-cyan-400 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <span className="w-1.5 h-1.5 bg-[#06b6d4]" />
                    <span>C++</span>
                  </div>
                </div>

                <div className="hidden sm:block absolute -top-3.5 right-2 z-20 animate-float-medium">
                  <div className="px-2.5 py-0.5 bg-[#0f172a]/95 backdrop-blur-sm border border-cyan-500/50 hover:border-cyan-400 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <span className="w-1.5 h-1.5 bg-[#06b6d4]" />
                    <span>PYTHON</span>
                  </div>
                </div>

                <div className="hidden sm:block absolute top-[56%] -left-5 -translate-y-1/2 z-20 animate-float-reverse">
                  <div className="px-2.5 py-0.5 bg-[#0f172a]/95 backdrop-blur-sm border border-cyan-500/50 hover:border-cyan-400 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <span className="w-1.5 h-1.5 bg-[#06b6d4]" />
                    <span>WEB DEV</span>
                  </div>
                </div>

                <div className="hidden sm:block absolute top-[56%] -right-5 -translate-y-1/2 z-20 animate-float-slow">
                  <div className="px-2.5 py-0.5 bg-[#0f172a]/95 backdrop-blur-sm border border-cyan-500/50 hover:border-cyan-400 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <span className="w-1.5 h-1.5 bg-[#facc15]" />
                    <span>BCA</span>
                  </div>
                </div>
              </div>

              {/* Mobile Skills Pill Row */}
              <div className="flex sm:hidden flex-wrap items-center justify-center gap-1.5 mt-3">
                <span className="px-2 py-0.5 bg-[#0f172a] border border-cyan-500/40 text-white font-mono text-[9px] font-bold uppercase">
                  HTML/CSS 85%
                </span>
                <span className="px-2 py-0.5 bg-[#0f172a] border border-cyan-500/40 text-white font-mono text-[9px] font-bold uppercase">
                  JS 75%
                </span>
                <span className="px-2 py-0.5 bg-[#0f172a] border border-cyan-500/40 text-white font-mono text-[9px] font-bold uppercase">
                  Node 65%
                </span>
                <span className="px-2 py-0.5 bg-[#06b6d4] text-slate-950 font-mono text-[9px] font-bold uppercase">
                  Supabase 50%
                </span>
            </div>
          </div>
        </div>
      </LampContainer>

      {/* Bottom Mini Stack Strip */}
      <div className="w-full border-t border-b border-slate-800 bg-[#0f172a]/90 py-2.5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#facc15] font-bold shrink-0">
              CORE STACK &bull;
            </span>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="px-2.5 py-0.5 bg-[#020617] border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-[10px] font-medium tracking-wider uppercase transition-colors whitespace-nowrap flex items-center gap-1.5 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                >
                  <span className="w-1.5 h-1.5 bg-[#06b6d4]" />
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span className="text-[9px] text-amber-400 font-bold">({skill.level}%)</span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={scrollToAbout}
              className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-slate-300 hover:text-[#22d3ee] uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
            >
              <span>Scroll to About</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
