import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  FileText,
  Copy,
  Check,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  ArrowUp,
  CheckCircle2,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Printer,
  ExternalLink,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EDUCATION,
  SKILLS,
  FEATURED_PROJECT,
  SOCIAL_LINKS,
  VERIFIED_CERTIFICATES,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [themeMode, setThemeMode] = useState<'clean' | 'cyber'>('clean');
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key and scroll lock on window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isFullscreen, onClose]);

  // Track scroll position to show back to top button
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowScrollTop(scrollContainerRef.current.scrollTop > 300);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyText = () => {
    const resumeText = `
IBRAHIM S
Full-Stack Web Developer & BCA Candidate (Class of 2027)
Email: ${SOCIAL_LINKS.email}
LinkedIn: ${SOCIAL_LINKS.linkedin}
GitHub: ${SOCIAL_LINKS.github}
Location: Chennai, Tamil Nadu, India
Featured Live Project: https://football-zone-1.onrender.com

========================================
PROFESSIONAL SUMMARY
========================================
Motivated Full-Stack Web Developer and 3rd-year Bachelor of Computer Applications (BCA) candidate at Mohamed Sathak College of Arts and Science (Graduating May 2027). Hands-on proficiency architecting responsive web applications, developing modular RESTful APIs with Node.js and Express, and engineering cloud relational databases with Supabase. Completed certified 1-month Full-Stack Development internship at Alfido Tech (AICTE Approved). Creator of Football Zone, a live production analytics and community predictions platform. Dedicated to clean code, systematic debugging, and scalable software architecture.

========================================
TECHNICAL SKILLS
========================================
- Frontend: HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, DOM APIs, Tailwind CSS, Flexbox/Grid
- Backend & APIs: Node.js, Express.js, RESTful Architecture, HTTP/HTTPS Protocols, Middleware, JSON Endpoints
- Databases & Cloud: Supabase (Cloud PostgreSQL), Relational Schema Design, Normalization, SQL Querying, Cloud Persistence
- Tools & Workflows: Git, GitHub, Render, VS Code, Browser DevTools, Postman, Linux Terminal
- Core CS: Programming Logic (C/C++), Computer Networks (TCP/IP), DBMS, Data Structures

========================================
PRACTICAL EXPERIENCE & INTERNSHIPS
========================================
Full Stack Development Intern | Alfido Tech
Duration: May 25, 2026 – June 25, 2026 | Chennai, India
Credential ID: BS/REG/123779 • AICTE Approved • ISO 9001:2015 Certified • MSME Registered
- Completed an intensive 1-month practical internship covering modern web application development, frontend architectures, and REST API integration.
- Engineered dynamic frontend user interfaces with modular JavaScript and connected them to custom backend routes.
- Implemented database connectivity, validated data schemas, and practiced clean Git version control workflows.

Lead Full-Stack Developer & Architect | Football Zone Platform
Duration: 2026 | Live Production System (football-zone-1.onrender.com)
- Engineered an end-to-end sports analytics and Ballon d'Or 2026 predictions platform from scratch without external commercial website templates.
- Integrated live community voting persistence using Supabase PostgreSQL cloud backend-as-a-service.
- Developed RESTful API endpoints using Node.js and Express for data querying and aggregate tally calculations.
- Designed a sleek mobile-first responsive dark theme interface ensuring rapid load times and cross-device usability.

========================================
EDUCATION
========================================
Bachelor of Computer Applications (BCA) | 2024 – 2027
Mohamed Sathak College of Arts and Science, Chennai, Tamil Nadu, India
- Standing: 3rd Year (Final Year Candidate) • Expected Graduation: May 2027
- Core Coursework: Database Management Systems (DBMS), Programming Logic (C/C++), Web Technologies, Computer Networks (OSI / TCP-IP), Data Structures.

========================================
VERIFIED CERTIFICATIONS
========================================
- 1-Month Internship in Full Stack Development – Alfido Tech (Credential ID: BS/REG/123779)
- Spring REST Course Completion Certificate – Infosys Springboard (Infosys Limited)

========================================
ACADEMIC HIGHLIGHTS & PRACTICAL LABS
========================================
- Relational Database Schema Design (DBMS Lab): Normalized entities up to 3NF, constructed complex JOIN and aggregate queries, and practiced ACID transaction integrity.
- Socket & Networking Principles: Studied TCP/IP, client-server models, HTTP request lifecycle, and REST architectural constraints.
`.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  const isClean = themeMode === 'clean';

  const navSections = [
    { id: 'res-overview', label: 'Overview' },
    { id: 'res-summary', label: 'Summary' },
    { id: 'res-skills', label: 'Skills' },
    { id: 'res-experience', label: 'Experience' },
    { id: 'res-education', label: 'Education' },
    { id: 'res-certifications', label: 'Certifications' },
    { id: 'res-academic', label: 'Highlights' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-6 bg-slate-950/90 backdrop-blur-md print:p-0 print:bg-white print:static print:overflow-visible"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className={`relative flex flex-col bg-[#0b1329] border border-slate-800 shadow-2xl transition-all duration-300 print:max-h-none print:max-w-none print:border-none print:shadow-none print:overflow-visible print:bg-white ${
          isFullscreen
            ? 'w-screen h-screen max-w-none max-h-none border-none'
            : 'w-full max-w-5xl h-[95vh] max-h-[95vh] sm:rounded-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="no-print flex flex-col bg-[#020617] border-b border-slate-800 shrink-0">
          {/* Main Controls Row */}
          <div className="flex flex-wrap items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 gap-2">
            {/* Title / Identity Tag */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-none bg-[#06b6d4]/10 border border-[#06b6d4]/60 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <FileText className="w-4 h-4 text-[#22d3ee]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white">
                    IBRAHIM. S — FULL RESUME
                  </h3>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    VERIFIED ATS
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                  BCA 3rd Year &bull; Class of 2027 &bull; Mohamed Sathak College
                </p>
              </div>
            </div>

            {/* Toolbar Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
              {/* Theme Mode Switcher */}
              <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                <button
                  onClick={() => setThemeMode('clean')}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 transition-all cursor-pointer text-[11px] ${
                    isClean
                      ? 'bg-white text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Clean Executive ATS Style (White Paper)"
                >
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span className="hidden sm:inline">Executive ATS</span>
                </button>
                <button
                  onClick={() => setThemeMode('cyber')}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 transition-all cursor-pointer text-[11px] ${
                    !isClean
                      ? 'bg-[#06b6d4] text-slate-950 font-bold shadow-[0_0_8px_#06b6d4]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Cyber Dark Portfolio Theme"
                >
                  <Moon className="w-3 h-3 text-cyan-400" />
                  <span className="hidden sm:inline">Cyber Dark</span>
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[10px] text-slate-300 min-w-[34px] text-center font-bold">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 100 && (
                  <button
                    onClick={() => setZoomLevel(100)}
                    className="p-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 text-slate-400 hover:text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Copy Plain Text */}
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-mono font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                title="Copy formatted plain text of full resume"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span className="hidden sm:inline">Copy Text</span>
                  </>
                )}
              </button>

              {/* Print / Save */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-mono font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                title="Print or Save Document"
              >
                <Printer className="w-3 h-3 text-[#22d3ee]" />
                <span className="hidden sm:inline">Print</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/50 bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                aria-label="Close full resume viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Section Jump Strip */}
          <div className="flex items-center gap-1 px-3 sm:px-6 py-1.5 bg-[#0a0f1d] border-t border-slate-800/80 overflow-x-auto no-scrollbar text-[10px] font-mono">
            <span className="text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#06b6d4]" />
              SECTIONS:
            </span>
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-2 py-0.5 uppercase transition-colors shrink-0 cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-[#06b6d4] text-slate-950 font-bold shadow-[0_0_8px_#06b6d4]'
                    : 'text-slate-300 hover:text-[#22d3ee] bg-slate-900/60 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Document Canvas - With flex-1 min-h-0 so the entire document scrolls cleanly without cutoff */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-6 md:p-8 bg-slate-950 flex flex-col items-center print:p-0 print:bg-white print:overflow-visible print:block"
        >
          <div
            id="printable-resume"
            style={{
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
              transformOrigin: 'top center',
            }}
            className={`w-full max-w-[850px] transition-all duration-200 pb-16 print:w-full print:max-w-none print:shadow-none print:border-none print:p-0 print:pb-0 space-y-6 ${
              isClean ? 'text-slate-900 font-sans' : 'text-slate-100 font-sans'
            }`}
          >
            {/* ========================================================
                PAGE 1 CONTAINER: OVERVIEW, SKILLS, EXPERIENCE
                ======================================================== */}
            <div
              className={`p-6 sm:p-10 md:p-12 border shadow-2xl relative transition-colors ${
                isClean
                  ? 'bg-white border-slate-200'
                  : 'bg-[#0f172a] border-slate-800'
              }`}
            >
              {/* Page Indicator Tag */}
              <div className="no-print absolute top-3.5 right-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#06b6d4]" />
                <span>Page 1 of 2</span>
              </div>

              {/* 1. Header / Identity Section */}
              <div
                id="res-overview"
                className={`pb-5 border-b ${
                  isClean ? 'border-slate-300' : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h1
                      className={`text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-display ${
                        isClean ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      IBRAHIM. S
                    </h1>
                    <p
                      className={`text-sm sm:text-base font-semibold mt-0.5 ${
                        isClean ? 'text-cyan-700' : 'text-[#22d3ee]'
                      }`}
                    >
                      Full-Stack Web Developer &bull; BCA Candidate (Class of 2027)
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isClean ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Mohamed Sathak College of Arts and Science &bull; Chennai, Tamil Nadu, India
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex sm:flex-col items-start sm:items-end gap-1.5 shrink-0">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase ${
                        isClean
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      Available for Internships
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        isClean ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Expected Graduation: May 2027
                    </span>
                  </div>
                </div>

                {/* Contact Line */}
                <div
                  className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-3.5 text-xs font-mono ${
                    isClean ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className={`flex items-center gap-1 hover:underline ${
                      isClean ? 'text-cyan-800' : 'text-cyan-300'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{SOCIAL_LINKS.email}</span>
                  </a>

                  <span className={isClean ? 'text-slate-300' : 'text-slate-700'}>&bull;</span>

                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 hover:underline ${
                      isClean ? 'text-cyan-800' : 'text-cyan-300'
                    }`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>linkedin.com/in/ibrahim-i-rahim</span>
                  </a>

                  <span className={isClean ? 'text-slate-300' : 'text-slate-700'}>&bull;</span>

                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 hover:underline ${
                      isClean ? 'text-cyan-800' : 'text-cyan-300'
                    }`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>github.com/ibrahimirahim1005-wq</span>
                  </a>

                  <span className={isClean ? 'text-slate-300' : 'text-slate-700'}>&bull;</span>

                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Chennai, India</span>
                  </span>
                </div>
              </div>

              {/* Document Body Sections - Page 1 */}
              <div className="space-y-6 pt-5">
                {/* 2. PROFESSIONAL SUMMARY */}
                <section id="res-summary" className="space-y-2">
                  <h2
                    className={`text-xs font-mono font-bold tracking-widest uppercase pb-1 border-b ${
                      isClean
                        ? 'text-slate-900 border-slate-300'
                        : 'text-[#22d3ee] border-slate-800'
                    } flex items-center gap-2`}
                  >
                    <span className="w-2 h-2 bg-[#06b6d4] inline-block" />
                    <span>Professional Summary</span>
                  </h2>
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed text-justify ${
                      isClean ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    Motivated Full-Stack Web Developer and third-year Bachelor of Computer Applications (BCA) candidate at Mohamed Sathak College of Arts and Science (expected graduation May 2027). Hands-on proficiency architecting responsive web applications, developing modular RESTful APIs with Node.js and Express, and engineering cloud relational databases with Supabase. Creator of <strong>Football Zone</strong> (a live sports analytics and predictions platform with community voting) and completed a verified 1-month Full-Stack Development internship at Alfido Tech. Dedicated to clean code, systematic debugging, and scalable software architecture.
                  </p>
                </section>

                {/* 3. TECHNICAL SKILLS */}
                <section id="res-skills" className="space-y-2.5">
                  <h2
                    className={`text-xs font-mono font-bold tracking-widest uppercase pb-1 border-b ${
                      isClean
                        ? 'text-slate-900 border-slate-300'
                        : 'text-[#22d3ee] border-slate-800'
                    } flex items-center gap-2`}
                  >
                    <span className="w-2 h-2 bg-[#06b6d4] inline-block" />
                    <span>Technical Skills</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div
                      className={`p-3 border ${
                        isClean
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <span
                        className={`font-mono font-bold uppercase block text-[11px] mb-1 ${
                          isClean ? 'text-cyan-800' : 'text-[#22d3ee]'
                        }`}
                      >
                        Frontend Technologies
                      </span>
                      <p className={isClean ? 'text-slate-700' : 'text-slate-300'}>
                        HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, DOM APIs, Tailwind CSS, Flexbox/Grid
                      </p>
                    </div>

                    <div
                      className={`p-3 border ${
                        isClean
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <span
                        className={`font-mono font-bold uppercase block text-[11px] mb-1 ${
                          isClean ? 'text-cyan-800' : 'text-[#22d3ee]'
                        }`}
                      >
                        Backend &amp; API Architecture
                      </span>
                      <p className={isClean ? 'text-slate-700' : 'text-slate-300'}>
                        Node.js, Express.js, RESTful API Design, JSON endpoints, Middleware, HTTP/HTTPS Protocols
                      </p>
                    </div>

                    <div
                      className={`p-3 border ${
                        isClean
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <span
                        className={`font-mono font-bold uppercase block text-[11px] mb-1 ${
                          isClean ? 'text-cyan-800' : 'text-[#22d3ee]'
                        }`}
                      >
                        Database &amp; Cloud Storage
                      </span>
                      <p className={isClean ? 'text-slate-700' : 'text-slate-300'}>
                        Supabase (Cloud PostgreSQL), Relational Schema Design, Normalization, SQL Querying, Cloud Persistence
                      </p>
                    </div>

                    <div
                      className={`p-3 border ${
                        isClean
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <span
                        className={`font-mono font-bold uppercase block text-[11px] mb-1 ${
                          isClean ? 'text-cyan-800' : 'text-[#22d3ee]'
                        }`}
                      >
                        Core CS, Tools &amp; Workflow
                      </span>
                      <p className={isClean ? 'text-slate-700' : 'text-slate-300'}>
                        C/C++, Computer Networking (TCP/IP), DBMS, Git, GitHub, Render, VS Code, Browser DevTools, Postman
                      </p>
                    </div>
                  </div>
                </section>

                {/* 4. PRACTICAL EXPERIENCE & INTERNSHIPS */}
                <section id="res-experience" className="space-y-4">
                  <h2
                    className={`text-xs font-mono font-bold tracking-widest uppercase pb-1 border-b ${
                      isClean
                        ? 'text-slate-900 border-slate-300'
                        : 'text-[#22d3ee] border-slate-800'
                    } flex items-center gap-2`}
                  >
                    <span className="w-2 h-2 bg-[#06b6d4] inline-block" />
                    <span>Practical Experience &amp; Internships</span>
                  </h2>

                  {/* Alfido Tech Internship */}
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                      <div>
                        <span
                          className={`font-bold text-sm ${
                            isClean ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          Full Stack Development Intern
                        </span>{' '}
                        &bull;{' '}
                        <span
                          className={`font-semibold ${
                            isClean ? 'text-cyan-800' : 'text-[#22d3ee]'
                          }`}
                        >
                          Alfido Tech
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[11px] ${
                          isClean ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        May 25, 2026 – June 25, 2026 &bull; Chennai, India
                      </span>
                    </div>

                    <p
                      className={`text-[11px] font-mono italic ${
                        isClean ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Credential ID: BS/REG/123779 &bull; AICTE Approved &bull; ISO 9001:2015 Certified &bull; MSME Registered
                    </p>

                    <ul
                      className={`list-disc list-outside ml-4 space-y-1 text-xs ${
                        isClean ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <li>
                        Successfully completed an intensive 1-month practical internship covering modern web application development, frontend architectures, and REST API integration.
                      </li>
                      <li>
                        Engineered dynamic frontend user interfaces with modular JavaScript and connected them to custom backend routes.
                      </li>
                      <li>
                        Implemented database connectivity, validated data schemas, and practiced clean Git version control workflows.
                      </li>
                    </ul>
                  </div>

                  {/* Featured Production Project Experience */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                      <div>
                        <span
                          className={`font-bold text-sm ${
                            isClean ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          Lead Full-Stack Developer &amp; Architect
                        </span>{' '}
                        &bull;{' '}
                        <span
                          className={`font-semibold ${
                            isClean ? 'text-cyan-800' : 'text-[#22d3ee]'
                          }`}
                        >
                          Football Zone Platform
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[11px] ${
                          isClean ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        2026 &bull; Live Production System
                      </span>
                    </div>

                    <p
                      className={`text-[11px] font-mono ${
                        isClean ? 'text-cyan-800' : 'text-cyan-300'
                      }`}
                    >
                      Live Deployment:{' '}
                      <a
                        href={FEATURED_PROJECT.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-bold inline-flex items-center gap-1"
                      >
                        <span>football-zone-1.onrender.com</span>
                        <ExternalLink className="w-3 h-3 inline" />
                      </a>
                    </p>

                    <ul
                      className={`list-disc list-outside ml-4 space-y-1 text-xs ${
                        isClean ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <li>
                        Engineered an end-to-end sports analytics and Ballon d&apos;Or 2026 predictions platform from scratch without external commercial website templates.
                      </li>
                      <li>
                        Integrated live community voting persistence using Supabase PostgreSQL cloud backend-as-a-service.
                      </li>
                      <li>
                        Developed RESTful API endpoints using Node.js and Express for data querying and aggregate tally calculations.
                      </li>
                      <li>
                        Designed a sleek mobile-first responsive dark theme interface ensuring rapid load times and cross-device usability.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Page 1 Bottom Divider Note */}
                <div
                  className={`pt-3 border-t flex items-center justify-between text-[10px] font-mono ${
                    isClean ? 'border-slate-200 text-slate-400' : 'border-slate-800 text-slate-500'
                  }`}
                >
                  <span>IBRAHIM. S &bull; Full-Stack Developer Resume</span>
                  <span>Continued Below &bull; Page 2 &rarr;</span>
                </div>
              </div>
            </div>

            {/* Seamless Visual Separator Between Pages */}
            <div className="no-print flex items-center justify-center gap-3 py-1 text-xs font-mono text-slate-500 uppercase tracking-widest">
              <span className="w-16 h-px bg-slate-800" />
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-cyan-400 text-[10px] font-bold">
                PAGE 2 &bull; EDUCATION, CERTIFICATIONS &amp; ACADEMICS
              </span>
              <span className="w-16 h-px bg-slate-800" />
            </div>

            {/* ========================================================
                PAGE 2 CONTAINER: EDUCATION, CERTIFICATIONS & ACADEMICS
                ======================================================== */}
            <div
              className={`p-6 sm:p-10 md:p-12 border shadow-2xl relative transition-colors ${
                isClean
                  ? 'bg-white border-slate-200'
                  : 'bg-[#0f172a] border-slate-800'
              }`}
            >
              {/* Page Indicator Tag */}
              <div className="no-print absolute top-3.5 right-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#06b6d4]" />
                <span>Page 2 of 2</span>
              </div>

              {/* Minimal Header on Page 2 */}
              <div
                className={`pb-3 border-b flex items-center justify-between text-xs font-mono mb-5 ${
                  isClean ? 'border-slate-300 text-slate-600' : 'border-slate-800 text-slate-400'
                }`}
              >
                <span className="font-bold uppercase tracking-wider">
                  IBRAHIM. S &bull; BCA CANDIDATE (CLASS OF 2027)
                </span>
                <span>{SOCIAL_LINKS.email}</span>
              </div>

              <div className="space-y-6">
                {/* 5. EDUCATION */}
                <section id="res-education" className="space-y-2">
                  <h2
                    className={`text-xs font-mono font-bold tracking-widest uppercase pb-1 border-b ${
                      isClean
                        ? 'text-slate-900 border-slate-300'
                        : 'text-[#22d3ee] border-slate-800'
                    } flex items-center gap-2`}
                  >
                    <span className="w-2 h-2 bg-[#06b6d4] inline-block" />
                    <span>Education</span>
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                    <div>
                      <span
                        className={`font-bold text-sm ${
                          isClean ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        Bachelor of Computer Applications (BCA)
                      </span>
                      <p
                        className={`font-semibold ${
                          isClean ? 'text-cyan-800' : 'text-[#22d3ee]'
                        }`}
                      >
                        Mohamed Sathak College of Arts and Science &bull; Chennai, Tamil Nadu, India
                      </p>
                    </div>
                    <div className="sm:text-right font-mono text-[11px]">
                      <span
                        className={`block font-bold ${
                          isClean ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        2024 – 2027
                      </span>
                      <span className={isClean ? 'text-slate-500' : 'text-slate-400'}>
                        Expected Graduation: May 2027
                      </span>
                    </div>
                  </div>

                  <div
                    className={`text-xs pt-1.5 space-y-1 ${
                      isClean ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    <p>
                      <strong className={isClean ? 'text-slate-900' : 'text-white'}>
                        Core Curriculum:
                      </strong>{' '}
                      Database Management Systems (DBMS), Programming Logic (C/C++), Web Technologies, Computer Networks (OSI / TCP-IP), Data Structures.
                    </p>
                    <p>
                      <strong className={isClean ? 'text-slate-900' : 'text-white'}>
                        Current Standing:
                      </strong>{' '}
                      3rd Year (Final Year Candidate) &bull; Actively seeking software developer internships and entry-level engineering opportunities.
                    </p>
                  </div>
                </section>

                {/* 6. VERIFIED CERTIFICATIONS */}
                <section id="res-certifications" className="space-y-2.5">
                  <h2
                    className={`text-xs font-mono font-bold tracking-widest uppercase pb-1 border-b ${
                      isClean
                        ? 'text-slate-900 border-slate-300'
                        : 'text-[#22d3ee] border-slate-800'
                    } flex items-center gap-2`}
                  >
                    <span className="w-2 h-2 bg-[#06b6d4] inline-block" />
                    <span>Verified Certifications</span>
                  </h2>

                  <div className="space-y-2 text-xs">
                    {VERIFIED_CERTIFICATES.map((cert) => (
                      <div
                        key={cert.id}
                        className={`p-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isClean
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-slate-900/60 border-slate-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className={isClean ? 'text-slate-900' : 'text-white'}>
                              {cert.title}
                            </span>
                          </div>
                          <p
                            className={`text-[11px] mt-0.5 font-mono ${
                              isClean ? 'text-slate-600' : 'text-slate-400'
                            }`}
                          >
                            Issued by {cert.issuer} &bull; {cert.issueDate}
                            {cert.candidateId ? ` • ID: ${cert.candidateId}` : ''}
                          </p>
                        </div>

                        <div className="shrink-0 font-mono text-[10px] text-right">
                          <span
                            className={`px-2 py-0.5 uppercase font-semibold ${
                              isClean
                                ? 'bg-slate-200 text-slate-800'
                                : 'bg-slate-800 text-cyan-300'
                            }`}
                          >
                            {cert.credentialType}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 7. KEY ACADEMIC HIGHLIGHTS */}
                <section id="res-academic" className="space-y-2">
                  <h2
                    className={`text-xs font-mono font-bold tracking-widest uppercase pb-1 border-b ${
                      isClean
                        ? 'text-slate-900 border-slate-300'
                        : 'text-[#22d3ee] border-slate-800'
                    } flex items-center gap-2`}
                  >
                    <span className="w-2 h-2 bg-[#06b6d4] inline-block" />
                    <span>Academic Highlights &amp; Systems</span>
                  </h2>

                  <div
                    className={`p-3.5 border text-xs space-y-2 ${
                      isClean
                        ? 'bg-slate-50 border-slate-200 text-slate-700'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <p>
                      <strong className={isClean ? 'text-slate-900' : 'text-white'}>
                        Relational Database Schema Design (DBMS Lab):
                      </strong>{' '}
                      Normalized entities up to 3NF, constructed complex JOIN and aggregate queries, and practiced ACID transaction integrity.
                    </p>
                    <p>
                      <strong className={isClean ? 'text-slate-900' : 'text-white'}>
                        Socket &amp; Networking Principles:
                      </strong>{' '}
                      Studied TCP/IP, client-server models, HTTP request lifecycle, and REST architectural constraints.
                    </p>
                    <p>
                      <strong className={isClean ? 'text-slate-900' : 'text-white'}>
                        Professional Career Objective:
                      </strong>{' '}
                      Seeking an internship or junior developer role where I can apply full-stack JavaScript, Node.js, and cloud database capabilities to build high-performance products.
                    </p>
                  </div>
                </section>

                {/* Document Sign-off / Print Footer */}
                <div
                  className={`pt-4 border-t flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono ${
                    isClean
                      ? 'border-slate-200 text-slate-500'
                      : 'border-slate-800 text-slate-400'
                  }`}
                >
                  <span>Official BCA Portfolio Resume &bull; IBRAHIM. S</span>
                  <span className="mt-1 sm:mt-0">
                    Contact: {SOCIAL_LINKS.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Back to Top Button inside Scroll Container */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="no-print fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40 p-2.5 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all cursor-pointer flex items-center gap-1 font-mono text-xs font-black uppercase"
              title="Scroll Back to Top of Resume"
            >
              <ArrowUp className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Top</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
