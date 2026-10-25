import React from 'react';
import {
  GraduationCap,
  Shield,
  Layers,
  Code2,
  Terminal,
  Cpu,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from './ui/ScrollReveal';

export const ExperienceSection: React.FC = () => {
  const practicalMilestones = [
    {
      period: '2026',
      badge: 'Full-Stack Practical Project',
      role: 'Project Creator & Solo Developer',
      context: 'Football Zone Platform (football-zone-1.onrender.com)',
      tech: ['HTML/CSS', 'JavaScript ES6+', 'Node.js', 'Express.js', 'Supabase PostgreSQL', 'Render'],
      highlights: [
        'Conceived and engineered a sports prediction and analytics web platform from ground up.',
        'Structured modular RESTful API endpoints in Node/Express for real-time community voting.',
        'Designed relational database tables in Supabase for vote tallies, constraints, and persistence.',
        'Deployed production web service on Render cloud infrastructure with zero UI framework bloat.',
      ],
    },
    {
      period: '2024 – Present',
      badge: 'BCA Coursework & Practical Labs',
      role: 'BCA Undergraduate Scholar',
      context: 'Mohamed Sathak College of Arts and Science',
      tech: ['C / C++', 'DBMS & SQL', 'Web Technologies', 'Computer Networking', 'Data Structures'],
      highlights: [
        'Executed hands-on relational schema designs, query composition, and table normalizations in DBMS labs.',
        'Implemented core algorithms, control structures, and memory pointer basics in C/C++ coursework.',
        'Explored client-server socket communication, OSI network layers, and TCP/IP protocol exchanges.',
        'Maintained high academic engagement with expected degree graduation in 2027.',
      ],
    },
    {
      period: '2025 – Present',
      badge: 'Practical Development Practice',
      role: 'Frontend Engineering & Responsive Builds',
      context: 'Independent Web Architecture Exercises',
      tech: ['Semantic HTML5', 'Modern CSS Grid & Flexbox', 'Vanilla JavaScript DOM', 'Mobile-First Design'],
      highlights: [
        'Engineered responsive web interfaces tested across real mobile, tablet, and desktop viewports.',
        'Developed custom cyberpunk and dark futuristic visual systems with clean typographic hierarchy.',
        'Mastered DOM event listeners, asynchronous fetch requests, and state reconciliation.',
        'Avoided reliance on bloated heavy libraries to retain tight control over bundle size and performance.',
      ],
    },
    {
      period: '2025 – Present',
      badge: 'Developer Discipline & Tooling',
      role: 'Version Control & Debugging Practices',
      context: 'Continuous Self-Directed Learning',
      tech: ['Git & GitHub', 'VS Code', 'Chrome DevTools', 'Postman API Testing', 'Vite & npm'],
      highlights: [
        'Managed source code repositories using Git branching, descriptive commit logs, and GitHub hosting.',
        'Utilized Chrome DevTools for DOM element inspection, CSS layout tuning, and network waterfall analysis.',
        'Validated REST API payloads, status codes, and JSON error handling via Postman.',
        'Practiced clean code documentation, consistent variable naming, and modular directory structures.',
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-24 bg-[#020617] border-t border-[#1e293b] text-[#e2e8f0] scroll-mt-20 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="left" blur={true}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8] font-semibold mb-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] inline-block shadow-[0_0_8px_#facc15]" />
                <span>05 // PRACTICAL TRACK RECORD</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight bg-linear-to-br from-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
                Practical Experience
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] bg-[#0f172a] border border-[#1e293b] px-3.5 py-2">
              <Shield className="w-4 h-4 text-[#06b6d4]" />
              <span className="uppercase tracking-wider">Zero Invented Corporate Titles &bull; 100% Honest</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Transparent Student Status Callout */}
        <ScrollReveal direction="right" blur={true} delay={0.12}>
          <div className="mb-12 p-7 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4]/50 hover:shadow-[0_8px_24px_-2px_rgba(6,182,212,0.35)] hover:-translate-y-0.5 transition-all duration-300 text-slate-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#06b6d4] text-slate-950 font-black flex items-center justify-center shadow-[0_0_10px_#06b6d4]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
                    Student Developer Journey &amp; Internship Readiness
                  </h3>
                </div>
                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
                  Currently dedicating full focus toward completing the Bachelor of Computer Applications degree at{' '}
                  <strong className="text-white">Mohamed Sathak College of Arts and Science</strong>{' '}
                  (Graduating 2027). In strict accordance with professional integrity, no artificial corporate titles
                  or unearned credentials are shown. Instead, practical development competence is demonstrated through
                  academic lab milestones, disciplined coding practices, and live deployed software like <em>Football Zone</em>.
                </p>
              </div>
              <div className="px-5 py-3 bg-[#facc15] text-slate-950 font-mono text-xs text-center shrink-0 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(250,204,21,0.35)] hover:scale-[1.02] transition-transform duration-200">
                <span className="block text-sm">Graduation: 2027</span>
                <span className="text-[10px] text-slate-900 font-semibold">Available for Internships</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Structured Milestone Cards */}
        <div className="space-y-6">
          <ScrollReveal direction="left" blur={true}>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#94a3b8] font-bold">
              <Layers className="w-4 h-4 text-[#06b6d4]" />
              <span>Academic Milestones &amp; Project Track Record</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalMilestones.map((item, idx) => (
              <ScrollRevealItem
                key={idx}
                index={idx}
                alternate={true}
                stagger={0.12}
                delay={0.12}
                className="h-full"
              >
                  <div className="h-full p-7 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_8px_24px_-2px_rgba(6,182,212,0.35)]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono px-3 py-1 bg-[#020617] border border-[#1e293b] text-[#22d3ee] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{item.period}</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#020617] text-[#facc15] font-bold uppercase border border-slate-800">
                          {item.badge}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white font-display uppercase tracking-wide group-hover:text-[#22d3ee] transition-colors">
                          {item.role}
                        </h4>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{item.context}</p>
                      </div>

                      <ul className="space-y-2 pt-1">
                        {item.highlights.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 bg-[#06b6d4] shrink-0 mt-1.5 shadow-[0_0_6px_#06b6d4]" />
                            <span className="leading-relaxed font-sans">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 bg-[#020617] border border-slate-800 text-slate-400 font-mono text-[10px] uppercase hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-[#1e293b] flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase">
                      <span>PRACTICAL RECORD</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#06b6d4] group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </ScrollRevealItem>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
};
