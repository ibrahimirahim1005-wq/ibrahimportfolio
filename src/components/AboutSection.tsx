import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Code2,
  Database,
  Network,
  Globe,
  Terminal,
  Cpu,
  Target,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { StudentIdCard } from './StudentIdCard';
import { ScrollReveal, ScrollRevealItem } from './ui/ScrollReveal';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const coreCourseCards = [
    {
      title: 'Programming & Logic',
      icon: Code2,
      code: 'BCA-CORE-01',
      description:
        'Foundational programming concepts, algorithmic logic, control structures, modular functions, and data manipulation in C/C++ and JavaScript.',
    },
    {
      title: 'Database Management (DBMS)',
      icon: Database,
      code: 'BCA-CORE-02',
      description:
        'Relational database architecture, SQL query composition, entity-relationship models, schema normalization, and cloud table persistence with Supabase.',
    },
    {
      title: 'Web Technologies & REST',
      icon: Globe,
      code: 'BCA-CORE-03',
      description:
        'Full client-server lifecycle, semantic HTML5, modern CSS Grid/Flexbox, asynchronous JavaScript DOM scripting, and custom Express REST API endpoints.',
    },
    {
      title: 'Computer Networking',
      icon: Network,
      code: 'BCA-CORE-04',
      description:
        'Seven-layer OSI model, TCP/IP protocol suite, client-server packet exchange, HTTP request/response methods, and network socket foundations.',
    },
  ];

  const methodologyCards = [
    {
      title: 'Problem-Solving & Coding Approach',
      icon: Wrench,
      highlight: 'Hands-on Prototyping',
      description:
        'I believe the deepest learning occurs when building working systems from scratch. I break complex user flows into small, testable logic blocks, inspect state with browser developer tools, and refactor code for modular readability.',
      points: [
        'Iterative development with clean version control',
        'Systematic debugging using console logs and devtools',
        'Continuous refactoring to reduce redundancy',
      ],
    },
    {
      title: 'Classroom Theory to Practical Builds',
      icon: Cpu,
      highlight: 'Bridging The Gap',
      description:
        'Rather than leaving college coursework on paper, I integrate academic theory directly into tangible projects. My Football Zone platform directly applied DBMS relational concepts, asynchronous fetch APIs, and client-server communication.',
      points: [
        'Relational schema design applied to live Supabase DB',
        'HTTP REST endpoints built with Node.js & Express',
        'Responsive mobile-first layouts without external templates',
      ],
    },
    {
      title: 'Career Ambitions & Internship Readiness',
      icon: Target,
      highlight: 'Class of 2027 Goals',
      description:
        'As an aspiring software developer graduating in 2027, my primary objective is securing a practical software development internship. I am eager to contribute to collaborative codebases, learn production standards, and solve real user problems.',
      points: [
        'Available for software development & web internships',
        'Strong motivation for continuous technical learning',
        'Commitment to professional team communication',
      ],
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-24 border-t border-[#1e293b] bg-[#020617] text-[#e2e8f0] scroll-mt-20 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="left" blur={true}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8] font-semibold mb-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] inline-block shadow-[0_0_8px_#facc15]" />
                <span>01 // BACKGROUND &amp; ACADEMICS</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight bg-linear-to-br from-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
                About Me
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#94a3b8] max-w-md">
              Third-Year BCA Scholar turning academic principles into resilient, functional software.
            </p>
          </div>
        </ScrollReveal>

        {/* Narrative & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Narrative Card */}
          <ScrollReveal direction="right" blur={true} delay={0.12} className="lg:col-span-7 h-full flex flex-col">
            <div className="bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4]/50 p-7 sm:p-9 shadow-xl flex flex-col justify-between hover:shadow-[0_8px_24px_-4px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 transition-all duration-300 h-full">
              <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#22d3ee] font-bold uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>// THE BUILDER MINDSET</span>
                </span>
                <span className="text-xs font-mono text-slate-500 uppercase">MOHAMED SATHAK COLLEGE</span>
              </div>

              {/* Exact quote from portfolio */}
              <blockquote className="text-lg sm:text-xl font-medium text-white leading-relaxed italic border-l-2 border-[#06b6d4] pl-4 py-1">
                &ldquo;{PERSONAL_INFO.aboutFull}&rdquo;
              </blockquote>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                I am a third-year Bachelor of Computer Applications (BCA) student at{' '}
                <strong className="text-white">Mohamed Sathak College of Arts and Science</strong>{' '}
                with expected graduation in <strong className="text-white">2027</strong>. My journey in technology
                is driven by a desire to understand how modern computer software functions from the user interface
                down to the data layer.
              </p>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                While excelling in core coursework like Database Management Systems, Programming Logic, and Computer
                Networks, I constantly test theory through real-world builds. Building my live sports predictions platform,{' '}
                <strong className="text-cyan-300 font-semibold">Football Zone</strong>, reinforced my skills in client-side state,
                custom REST endpoints in Node.js and Express, and cloud database operations with Supabase.
              </p>

              {/* 3 Core Development Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#020617] border border-[#1e293b] text-center hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-[10px] font-mono text-[#22d3ee] block uppercase font-bold">
                    Pillar 01
                  </span>
                  <span className="text-xs font-bold text-white uppercase font-mono">Web Systems</span>
                </div>
                <div className="p-3 bg-[#020617] border border-[#1e293b] text-center hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-[10px] font-mono text-[#22d3ee] block uppercase font-bold">
                    Pillar 02
                  </span>
                  <span className="text-xs font-bold text-white uppercase font-mono">Data &amp; APIs</span>
                </div>
                <div className="p-3 bg-[#020617] border border-[#1e293b] text-center hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-[10px] font-mono text-[#22d3ee] block uppercase font-bold">
                    Pillar 03
                  </span>
                  <span className="text-xs font-bold text-white uppercase font-mono">Clean Logic</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono text-[#94a3b8]">
              <span>ACADEMIC TIMELINE: 2024–2027</span>
              <span className="text-[#22d3ee] font-bold">STATUS: 3RD YEAR CANDIDATE</span>
            </div>
          </div>
        </ScrollReveal>

          {/* Right Hanging Student ID Badge (Anchored for #education navigation) */}
          <ScrollReveal direction="left" blur={true} delay={0.24} className="lg:col-span-5 h-full">
            <StudentIdCard onOpenResume={onOpenResume} />
          </ScrollReveal>
        </div>

        {/* 3 Practical Methodology & Goals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {methodologyCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollRevealItem
                key={item.title}
                index={idx}
                alternate={true}
                stagger={0.12}
                delay={0.12}
                className="h-full"
              >
                <div className="h-full p-6 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_8px_20px_-2px_rgba(6,182,212,0.35)]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-[#020617] border border-cyan-500/40 text-[#22d3ee] flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-[#020617] text-[#facc15] font-bold uppercase border border-slate-800">
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-display uppercase tracking-wide group-hover:text-[#22d3ee] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {item.description}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-[11px] text-slate-400 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#06b6d4] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollRevealItem>
            );
          })}
        </div>

        {/* Core Subject Breakdown from Coursework */}
        <ScrollReveal direction="left" blur={true}>
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#94a3b8] font-bold">
              <BookOpen className="w-4 h-4 text-[#06b6d4]" />
              <span>BCA Coursework Specializations (Mohamed Sathak College)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coreCourseCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <ScrollRevealItem
                    key={card.title}
                    index={idx}
                    alternate={true}
                    stagger={0.12}
                    delay={0.12}
                    className="h-full"
                  >
                    <div className="h-full p-5 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_8px_20px_-2px_rgba(6,182,212,0.35)]">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Icon className="w-5 h-5 text-[#06b6d4] group-hover:text-[#22d3ee] transition-colors" />
                          <span className="text-[10px] font-mono text-slate-500">{card.code}</span>
                        </div>
                        <h4 className="font-display font-bold text-base text-white uppercase tracking-wide group-hover:text-[#22d3ee] transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </ScrollRevealItem>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
