import React, { useState } from 'react';
import {
  Code2,
  Layout,
  Server,
  Database,
  Palette,
  Layers,
  Globe,
  Cpu,
  Terminal,
  ShieldCheck,
  Shield,
  GitBranch,
  Monitor,
  Box,
  Radio,
  Cloud,
  Sparkles,
  Network,
  CheckCircle2,
  Sparkle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TechPipelineStream } from './TechPipelineStream';
import { ScrollReveal, ScrollRevealItem } from './ui/ScrollReveal';

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'learning';

export interface SkillItemData {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'learning';
  level?: number;
  isConfirmedLevel?: boolean;
  status: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isLearning?: boolean;
}

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory>('all');

  const skillsData: SkillItemData[] = [
    // ----------------------------------------------------
    // 1. FRONTEND DEVELOPMENT
    // ----------------------------------------------------
    {
      name: 'HTML5',
      category: 'frontend',
      level: 85,
      isConfirmedLevel: true,
      status: 'Core Frontend',
      description:
        'Semantic document structuring, accessible landmark markup, native form controls, and standards-compliant web hierarchy.',
      icon: Layout,
    },
    {
      name: 'CSS3 & Responsive Design',
      category: 'frontend',
      level: 85,
      isConfirmedLevel: true,
      status: 'Core Frontend',
      description:
        'CSS Grid, Flexbox systems, custom properties, media queries, dark themes, and fluid layouts across mobile, tablet, and desktop.',
      icon: Palette,
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'frontend',
      level: 75,
      isConfirmedLevel: true,
      status: 'Core Language',
      description:
        'Asynchronous fetch requests, DOM manipulation, promises, modern array methods, event handling, and clean modular scripting.',
      icon: Code2,
    },
    {
      name: 'UI/UX & Responsive Wireframing',
      category: 'frontend',
      status: 'Design Practice',
      description:
        'Component hierarchy planning, mobile-first interface structure, user journey design, and high-contrast dark visual themes.',
      icon: Layers,
    },

    // ----------------------------------------------------
    // 2. PROGRAMMING & BACKEND
    // ----------------------------------------------------
    {
      name: 'Node.js',
      category: 'backend',
      level: 65,
      isConfirmedLevel: true,
      status: 'Server Runtime',
      description:
        'Server-side JavaScript runtime execution, npm package management, asynchronous event handling, and file system I/O.',
      icon: Server,
    },
    {
      name: 'Express.js',
      category: 'backend',
      level: 65,
      isConfirmedLevel: true,
      status: 'Routing Framework',
      description:
        'Server routing architecture, custom middleware pipeline, HTTP request parsing, JSON error handling, and API controllers.',
      icon: Cpu,
    },
    {
      name: 'RESTful API Architecture',
      category: 'backend',
      status: 'Architecture Pattern',
      description:
        'CRUD endpoint design, HTTP status codes, structured JSON payloads, and client-server request/response communication lifecycles.',
      icon: Globe,
    },
    {
      name: 'Supabase (Cloud PostgreSQL)',
      category: 'backend',
      level: 50,
      isConfirmedLevel: true,
      status: 'Cloud Database',
      description:
        'PostgreSQL cloud tables, relational queries, realtime data updates, and live voting persistence in the Football Zone platform.',
      icon: Database,
    },
    {
      name: 'SQL & Relational Schema Design',
      category: 'backend',
      status: 'DBMS Coursework',
      description:
        'Relational database modeling, entity-relationship diagrams (ERDs), table normalization (1NF, 2NF, 3NF), and foreign keys.',
      icon: Database,
    },
    {
      name: 'C++',
      category: 'backend',
      status: 'Academic Foundation',
      description:
        'Structured programming principles, control structures, functions, memory pointers, and algorithmic logic from BCA coursework.',
      icon: Terminal,
    },
    {
      name: 'Java & OOP Principles',
      category: 'backend',
      status: 'Infosys Springboard Verified',
      description:
        'Object-oriented principles, classes, inheritance, polymorphism, and enterprise HTTP controller mapping via Infosys Spring REST.',
      icon: ShieldCheck,
    },
    {
      name: 'Computer Networks (TCP/IP)',
      category: 'backend',
      status: 'Academic Coursework',
      description:
        'OSI 7-layer model, TCP/IP protocol suite, IP addressing, socket basics, DNS resolution, and HTTP/HTTPS network transfers.',
      icon: Network,
    },

    // ----------------------------------------------------
    // 3. TOOLS & PLATFORMS
    // ----------------------------------------------------
    {
      name: 'Git & GitHub',
      category: 'tools',
      status: 'Version Control',
      description:
        'Local repository tracking, branching, descriptive commit logs, pull requests, and remote source code hosting on GitHub.',
      icon: GitBranch,
    },
    {
      name: 'VS Code',
      category: 'tools',
      status: 'Primary IDE',
      description:
        'Source code editing, integrated terminal workflows, debugging, Git integration, and developer extensions.',
      icon: Monitor,
    },
    {
      name: 'Vite & npm',
      category: 'tools',
      status: 'Build & Package Tooling',
      description:
        'Project scaffolding, hot dev server workflows, npm package ecosystem dependency management, and production bundle builds.',
      icon: Box,
    },
    {
      name: 'Postman & Browser DevTools',
      category: 'tools',
      status: 'Testing & Debugging',
      description:
        'Inspecting HTTP network payloads, testing REST endpoint responses, console debugging, and responsive viewport verification.',
      icon: Radio,
    },
    {
      name: 'Render Cloud Deployment',
      category: 'tools',
      status: 'Cloud Hosting',
      description:
        'Continuous web service hosting, environment variable configuration, build logs, and automated deployment for Football Zone.',
      icon: Cloud,
    },

    // ----------------------------------------------------
    // 4. CURRENTLY LEARNING (DISTINCT YELLOW ACCENT, NO INVENTED PERCENTAGES)
    // ----------------------------------------------------
    {
      name: 'React.js & Modern UI',
      category: 'learning',
      isLearning: true,
      status: 'IN PROGRESS',
      description:
        'Advancing from vanilla JavaScript DOM scripting into modular component architectures, hooks, state management, and props.',
      icon: Sparkles,
    },
    {
      name: 'TypeScript',
      category: 'learning',
      isLearning: true,
      status: 'IN PROGRESS',
      description:
        'Learning static type systems, strict interfaces, generics, and compile-time error prevention for enterprise JavaScript development.',
      icon: Shield,
    },
    {
      name: 'Python Scripting',
      category: 'learning',
      isLearning: true,
      status: 'IN PROGRESS',
      description:
        'Exploring clean syntax, standard libraries, foundational data structures, and algorithmic logic for scripting and automation.',
      icon: Terminal,
    },
    {
      name: 'Advanced DBMS & Query Optimization',
      category: 'learning',
      isLearning: true,
      status: 'IN PROGRESS',
      description:
        'Deepening practical knowledge of SQL indexes, query execution analysis, ACID transactions, and database performance tuning.',
      icon: Database,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Disciplines', count: skillsData.length },
    {
      id: 'frontend',
      label: 'Frontend Development',
      count: skillsData.filter((s) => s.category === 'frontend').length,
    },
    {
      id: 'backend',
      label: 'Programming / Backend',
      count: skillsData.filter((s) => s.category === 'backend').length,
    },
    {
      id: 'tools',
      label: 'Tools & Platforms',
      count: skillsData.filter((s) => s.category === 'tools').length,
    },
    {
      id: 'learning',
      label: 'Currently Learning',
      count: skillsData.filter((s) => s.category === 'learning').length,
      isSpecial: true,
    },
  ];

  const displayedSkills =
    activeTab === 'all'
      ? skillsData
      : skillsData.filter((s) => s.category === activeTab);

  // Confirmed self-assessed skills with exact verified percentages
  const confirmedAssessment = skillsData.filter((s) => s.isConfirmedLevel);

  return (
    <section
      id="skills"
      className="relative py-24 bg-[#020617] border-t border-[#1e293b] text-[#e2e8f0] scroll-mt-20 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8] font-semibold mb-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] inline-block shadow-[0_0_8px_#facc15]" />
                <span>03 // TECHNICAL COMPETENCIES</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight bg-linear-to-br from-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
                Skills &amp; Technologies
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] bg-[#0f172a] border border-[#1e293b] px-3.5 py-2">
              <ShieldCheck className="w-4 h-4 text-[#06b6d4]" />
              <span className="uppercase tracking-wider">
                Genuine Proficiencies &bull; Transparent Learning
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Narrative & Technical Philosophy Banner */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 p-6 sm:p-7 bg-[#0f172a] border border-[#1e293b] text-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#06b6d4]/50 hover:shadow-[0_4px_20px_-2px_rgba(6,182,212,0.25)] hover:-translate-y-0.5 transition-all duration-300">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-[#22d3ee] font-bold uppercase tracking-wider block">
                // TECHNICAL PHILOSOPHY
              </span>
              <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-sans">
                &ldquo;{PERSONAL_INFO.skillsPhilosophy}&rdquo;
              </p>
            </div>
            <div className="px-4 py-2 bg-[#020617] border border-[#06b6d4]/40 text-[#22d3ee] font-mono text-xs uppercase tracking-wider whitespace-nowrap font-bold shadow-[0_0_10px_rgba(6,182,212,0.25)]">
              Verified Stack
            </div>
          </div>
        </ScrollReveal>

        {/* Continuous Tech Stack Marquee Stream */}
        <ScrollReveal delay={0.15}>
          <TechPipelineStream />
        </ScrollReveal>

        {/* Confirmed Self-Assessed Metrics Panel (Exact Verified Percentages ONLY) */}
        <ScrollReveal delay={0.15}>
          <div className="mb-14 bg-[#0f172a] border border-[#1e293b] p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#1e293b] gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] shadow-[0_0_8px_#facc15]" />
                <h3 className="font-display font-bold text-white text-base sm:text-lg uppercase tracking-wider">
                  Confirmed Core Proficiencies (Verified Baseline)
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                Validated Through BCA Coursework &amp; Football Zone Project
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {confirmedAssessment.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="p-4 bg-[#020617] border border-[#1e293b] hover:border-cyan-500/60 hover:shadow-[0_4px_16px_rgba(6,182,212,0.2)] hover:-translate-y-0.5 transition-all duration-200 space-y-2.5"
                  >
                    <div className="flex justify-between items-center text-xs font-mono uppercase">
                      <span className="font-bold text-white flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#0f172a] border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span>{skill.name}</span>
                      </span>
                      <span className="text-[#22d3ee] font-black text-sm">{skill.level}%</span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="h-2 w-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] shadow-[0_0_8px_#06b6d4] transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-0.5">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Buttons & Skill Cards */}
        <ScrollReveal delay={0.2}>
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-8">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const isLearning = cat.isSpecial;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as SkillCategory)}
                  className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? isLearning
                        ? 'bg-[#facc15] text-slate-950 font-black border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                        : 'bg-[#06b6d4] text-slate-950 font-black border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.45)]'
                      : isLearning
                      ? 'bg-[#0f172a] text-[#facc15] border-[#facc15]/40 hover:border-[#facc15] hover:bg-[#facc15]/10'
                      : 'bg-[#0f172a] text-slate-300 border-[#1e293b] hover:border-cyan-400 hover:text-white hover:-translate-y-0.5'
                  }`}
                >
                  {isLearning && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-slate-950' : 'bg-[#facc15] animate-ping'
                      }`}
                    />
                  )}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-xs font-bold ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : isLearning
                        ? 'bg-[#facc15]/15 text-[#facc15]'
                        : 'bg-[#020617] text-cyan-300'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Technology Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedSkills.map((skill, idx) => {
              const Icon = skill.icon;
              const isLearningCard = skill.isLearning;

              return (
                <ScrollRevealItem
                  key={skill.name}
                  index={idx % 6}
                  stagger={0.04}
                  delay={0.03}
                  className="h-full"
                >
                  <div
                    className={`h-full p-6 bg-[#0f172a] border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                      isLearningCard
                        ? 'border-amber-500/40 hover:border-[#facc15] hover:shadow-[0_8px_25px_-4px_rgba(250,204,21,0.35)]'
                        : 'border-[#1e293b] hover:border-[#06b6d4] hover:shadow-[0_8px_25px_-4px_rgba(6,182,212,0.35)]'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Card Top: Icon, Status Tag & Optional Indicator */}
                      <div className="flex items-start justify-between gap-3">
                        {/* Technology Icon Box with Futuristic 3D styling */}
                        <div
                          className={`w-11 h-11 border flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 ${
                            isLearningCard
                              ? 'bg-[#020617] border-[#facc15]/60 text-[#facc15] group-hover:bg-[#facc15] group-hover:text-slate-950 shadow-[0_0_12px_rgba(250,204,21,0.25)]'
                              : 'bg-[#020617] border-cyan-500/50 text-[#22d3ee] group-hover:bg-[#06b6d4] group-hover:text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Status Tag */}
                        <div className="flex flex-col items-end gap-1">
                          {isLearningCard ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/80 text-[#facc15] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#facc15]/60 shadow-[0_0_10px_rgba(250,204,21,0.3)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-ping" />
                              <span>IN PROGRESS</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-[#020617] text-[#22d3ee] font-bold uppercase border border-slate-800">
                              {skill.status}
                            </span>
                          )}

                          {/* Only show percentage if genuine and verified */}
                          {skill.isConfirmedLevel && (
                            <span className="text-xs font-mono font-extrabold text-[#facc15]">
                              {skill.level}% Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Skill Name */}
                      <h4
                        className={`font-display font-bold text-lg uppercase tracking-wide transition-colors ${
                          isLearningCard
                            ? 'text-white group-hover:text-[#facc15]'
                            : 'text-white group-hover:text-[#22d3ee]'
                        }`}
                      >
                        {skill.name}
                      </h4>

                      {/* Beginner-friendly, informative description */}
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {skill.description}
                      </p>

                      {/* Optional Animated Proficiency Indicator (ONLY if genuine level exists) */}
                      {skill.isConfirmedLevel && skill.level && (
                        <div className="pt-1 space-y-1">
                          <div className="h-1.5 w-full bg-slate-900 border border-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] shadow-[0_0_6px_#06b6d4]"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Category Label & Verified Check */}
                    <div className="pt-4 mt-4 border-t border-[#1e293b] flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase">
                      <span className="truncate">
                        {isLearningCard ? 'Learning Target' : `Domain: ${skill.category}`}
                      </span>
                      {isLearningCard ? (
                        <Sparkle className="w-3.5 h-3.5 text-[#facc15] shrink-0 group-hover:scale-110 transition-transform" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#06b6d4] shrink-0 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
