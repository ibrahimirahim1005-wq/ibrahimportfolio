import React, { useState } from 'react';
import {
  ExternalLink,
  Trophy,
  Radio,
  Github,
  Server,
  Database,
  Globe,
  AlertCircle,
  Code2,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { FEATURED_PROJECT, SOCIAL_LINKS } from '../data/portfolioData';
import { ScrollReveal, ScrollRevealItem } from './ui/ScrollReveal';

export const ProjectSection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mockVotes, setMockVotes] = useState<Record<string, number>>({
    'Vinicius Jr': 1420,
    Rodri: 1385,
    'Jude Bellingham': 1190,
    'Lamine Yamal': 1050,
  });
  const [hasVoted, setHasVoted] = useState<string | null>(null);

  const footballImages = [
    {
      url: '/src/assets/images/football_trophy_banner_1792410546224.jpg',
      label: '🏆 Ballon d’Or Hub',
      caption: 'Golden Trophy & Holographic Sports Analytics',
      tag: 'ANALYTICS ENGINE',
    },
    {
      url: '/src/assets/images/football_match_action_1792410527030.jpg',
      label: '⚽ Match Action Turf',
      caption: 'Match Football with Cyan Cyberpunk Speed Trails',
      tag: 'SIMULATION PITCH',
    },
  ];

  const handleVote = (player: string) => {
    if (hasVoted) return;
    setHasVoted(player);
    setMockVotes((prev) => ({
      ...prev,
      [player]: (prev[player] || 0) + 1,
    }));
  };

  const isLiveUrlValid = Boolean(
    FEATURED_PROJECT.liveUrl && FEATURED_PROJECT.liveUrl.startsWith('http')
  );

  const keyEngineeringTakeaways = [
    {
      title: 'Database & Cloud Persistence',
      description:
        'Architected relational tables on Supabase (PostgreSQL) to store nominee metadata, community voting tallies, and user votes without data corruption.',
    },
    {
      title: 'RESTful API Engineering',
      description:
        'Developed modular Express.js routes for voting endpoints, validating client requests and returning structured JSON payloads for seamless UI updates.',
    },
    {
      title: 'Mobile-First Responsive UI',
      description:
        'Hand-coded custom CSS Grid and Flexbox layouts without UI templates, delivering an engaging dark aesthetic tailored for sports enthusiasts across mobile, tablet, and desktop.',
    },
    {
      title: 'Asynchronous State Management',
      description:
        'Engineered optimistic UI updates with JavaScript fetch requests, ensuring immediate voting feedback while reconciling with the backend database.',
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-24 bg-[#020617] border-t border-[#1e293b] text-[#e2e8f0] scroll-mt-20"
    >
      {/* Anchor for backward-compatible #work links */}
      <span id="work" className="sr-only scroll-mt-20">
        Projects Section
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8] font-semibold mb-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] inline-block shadow-[0_0_8px_#facc15]" />
                <span>04 // FEATURED WORK &amp; PROJECTS</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight bg-linear-to-br from-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
                Football Zone
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 bg-[#facc15] text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(250,204,21,0.35)]">
                Ballon d&apos;Or 2026 Edition
              </span>
              <span className="px-3 py-1.5 bg-[#0f172a] border border-[#1e293b] text-cyan-400 font-mono text-xs uppercase tracking-wider">
                Live on Render Cloud
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Hero Showcase Card for Football Zone */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[#0f172a] border-2 border-[#06b6d4]/60 hover:border-[#22d3ee] p-6 sm:p-10 shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] hover:shadow-[0_12px_36px_-6px_rgba(6,182,212,0.45)] hover:-translate-y-1 transition-all duration-300 relative mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left Column: Project Overview & Deep Dive */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#06b6d4] text-slate-950 font-black flex items-center justify-center shadow-[0_0_12px_#06b6d4]">
                  <Trophy className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-wide">
                    {FEATURED_PROJECT.title}
                  </h3>
                  <p className="text-xs font-mono text-[#22d3ee] uppercase tracking-wider">
                    football-zone-1.onrender.com &bull; Solo Creator &amp; Full-Stack Dev
                  </p>
                </div>
              </div>

              {/* Exact Description & Purpose */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
                {FEATURED_PROJECT.description}
              </p>

              <div className="p-4 bg-[#020617] border border-[#1e293b] space-y-2">
                <span className="text-xs font-mono text-[#facc15] font-bold uppercase tracking-wider block">
                  Project Purpose &amp; Role
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Built as a solo full-stack platform to provide football enthusiasts with transparent nominee stat
                  comparisons, predictive rankings, and verifiable community voting. As the sole developer, I designed the
                  database schema in Supabase, wrote the Express.js API, and created the responsive frontend.
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-widest block font-bold">
                  Technology Stack (100% Confirmed)
                </span>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_PROJECT.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 bg-[#020617] border border-[#1e293b] text-slate-200 font-mono text-xs font-semibold uppercase tracking-wider hover:border-[#06b6d4] hover:text-[#22d3ee] hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-widest block font-bold">
                  Core Platform Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FEATURED_PROJECT.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 bg-[#06b6d4] shrink-0 mt-1.5 shadow-[0_0_6px_#06b6d4]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Links */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {isLiveUrlValid ? (
                  <a
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 shadow-[0_0_20px_-2px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  </a>
                ) : (
                  <div className="px-5 py-3 bg-[#1e293b] text-slate-400 font-mono text-xs flex items-center gap-2 border border-slate-700">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Project URL Pending Configuration</span>
                  </div>
                )}

                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#020617] hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2 transition-all duration-200 cursor-pointer hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Github className="w-4 h-4 text-[#22d3ee]" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive UI Showcase, Football Images & Live Voting Preview */}
            <div className="lg:col-span-5 bg-[#020617] border border-[#1e293b] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#06b6d4]" />
                  <span className="text-xs font-mono text-slate-200 uppercase tracking-wider font-bold">
                    Platform Showcase &amp; Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#22d3ee] uppercase font-bold">
                  Ballon d&apos;Or 2026 Engine
                </span>
              </div>

              {/* High-Resolution Football Zone Visual Showcase with Image Switcher */}
              <div className="relative group overflow-hidden border border-[#1e293b] hover:border-cyan-400/80 transition-all bg-[#0a0f1d] shadow-lg">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={footballImages[activeImageIndex].url}
                    alt={footballImages[activeImageIndex].caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 pointer-events-none" />

                  {/* Top HUD Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                    <span className="px-2 py-0.5 bg-black/85 backdrop-blur-sm border border-cyan-500/50 text-[#22d3ee] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                      <span className="w-1.5 h-1.5 bg-[#06b6d4] animate-pulse" />
                      {footballImages[activeImageIndex].tag}
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#facc15] text-slate-950 font-black tracking-widest text-[9px] uppercase shadow-[0_0_6px_rgba(250,204,21,0.4)]">
                      2026 EDITION
                    </span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-2 inset-x-2.5 flex items-end justify-between pointer-events-none">
                    <p className="text-[11px] font-mono text-slate-200 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] truncate">
                      {footballImages[activeImageIndex].caption}
                    </p>
                  </div>
                </div>

                {/* Image Switcher Tabs */}
                <div className="grid grid-cols-2 p-1.5 bg-[#0f172a] border-t border-[#1e293b] gap-1.5">
                  {footballImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer border ${
                        activeImageIndex === idx
                          ? 'bg-[#06b6d4] text-slate-950 border-[#06b6d4] shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                          : 'bg-[#020617] text-slate-400 border-[#1e293b] hover:text-white hover:border-slate-700 hover:bg-[#0f172a]'
                      }`}
                    >
                      <span>{img.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mockup Screen: Ballon d'Or 2026 Nominee Voting */}
              <div className="space-y-3 font-sans">
                <div className="p-3 bg-[#0f172a] border border-[#1e293b] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider font-mono">
                      Ballon d&apos;Or 2026 Predictions
                    </h4>
                    <p className="text-[11px] text-slate-400">Community Voting Simulator</p>
                  </div>
                  <Trophy className="w-4 h-4 text-[#06b6d4]" />
                </div>

                {/* Nominee voting list */}
                <div className="space-y-2">
                  {Object.entries(mockVotes).map(([player, votes]) => (
                    <div
                      key={player}
                      onClick={() => handleVote(player)}
                      className={`p-3 border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        hasVoted === player
                          ? 'bg-[#1e293b] border-[#06b6d4] text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-[#0f172a] border-[#1e293b] hover:border-cyan-500/60 hover:-translate-y-0.5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Radio
                          className={`w-3.5 h-3.5 ${
                            hasVoted === player ? 'text-[#06b6d4]' : 'text-slate-600'
                          }`}
                        />
                        <span className="text-xs font-semibold uppercase font-mono">{player}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-slate-400">{votes.toLocaleString()} votes</span>
                        {hasVoted === player && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#06b6d4] text-slate-950 font-bold uppercase">
                            Voted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-mono text-slate-400 text-center">
                  {hasVoted
                    ? 'Vote recorded in local test simulator! Experience full platform with Supabase live sync.'
                    : 'Click any nominee above to test the interactive voting mechanic.'}
                </p>
              </div>

              {/* Architectural Breakdown Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1e293b]">
                <div className="p-2.5 bg-[#0f172a] border border-[#1e293b] text-center hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">
                    Frontend
                  </span>
                  <span className="text-[11px] font-bold text-white font-mono">HTML/CSS/JS</span>
                </div>
                <div className="p-2.5 bg-[#0f172a] border border-[#1e293b] text-center hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Backend</span>
                  <span className="text-[11px] font-bold text-[#22d3ee] font-mono">REST / Express</span>
                </div>
                <div className="p-2.5 bg-[#0f172a] border border-[#1e293b] text-center hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Database</span>
                  <span className="text-[11px] font-bold text-white font-mono">Supabase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Engineering Highlights & Architecture Breakdown */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#94a3b8] font-bold">
              <Cpu className="w-4 h-4 text-[#06b6d4]" />
              <span>Key Engineering Challenges &amp; Technical Learnings</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyEngineeringTakeaways.map((item, idx) => (
                <ScrollRevealItem
                  key={idx}
                  index={idx}
                  stagger={0.06}
                  delay={0.05}
                  className="h-full"
                >
                  <div className="h-full p-5 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_8px_20px_-2px_rgba(6,182,212,0.35)]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#22d3ee] font-bold uppercase">
                          0{idx + 1} // MILESTONE
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#06b6d4] group-hover:scale-110 transition-transform" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-wide group-hover:text-[#22d3ee] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollRevealItem>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
