import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  ExternalLink,
  Mail,
  Linkedin,
  Github,
  MapPin,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Sun,
  Moon,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
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
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    // Show polite notice before printing
    setDownloadNotice('Opening print dialog. Select "Save as PDF" in the destination dropdown to download your clean PDF!');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const handleCopyText = () => {
    const resumeText = `
IBRAHIM S
Full-Stack Web Developer & BCA Candidate (Class of 2027)
Email: ${SOCIAL_LINKS.email}
LinkedIn: ${SOCIAL_LINKS.linkedin}
GitHub: ${SOCIAL_LINKS.github}
Location: Chennai, Tamil Nadu, India
Portfolio: https://football-zone-1.onrender.com

PROFESSIONAL SUMMARY
Motivated Full-Stack Web Developer and 3rd-year Bachelor of Computer Applications (BCA) candidate at Mohamed Sathak College of Arts and Science (Graduating 2027). Hands-on experience architecting responsive web applications, modular RESTful APIs using Node.js & Express, and relational cloud databases with Supabase. Completed certified 1-month Full-Stack Development internship at Alfido Tech. Creator of Football Zone, a live production analytics and community predictions platform.

EDUCATION
Bachelor of Computer Applications (BCA) | 2024 – 2027
Mohamed Sathak College of Arts and Science, Chennai, India
- Status: 3rd Year (Final Year Candidate) • Expected Graduation: May 2027
- Core Coursework: Database Management Systems (DBMS), Programming Logic (C/C++), Web Technologies, Computer Networks (TCP/IP).

TECHNICAL SKILLS
- Frontend: HTML5, CSS3, JavaScript (ES6+), Responsive Design, DOM Scripting, Tailwind CSS
- Backend & APIs: Node.js, Express.js, RESTful Architecture, HTTP Protocols, Middleware
- Databases & Cloud: Supabase, PostgreSQL, Relational Schema Normalization, SQL
- Tools: Git, GitHub, Render, VS Code, Browser DevTools, Postman

EXPERIENCE & INTERNSHIPS
Full-Stack Development Intern | Alfido Tech (June 2026)
- AICTE Approved & ISO 9001:2015 Certified Organization • ID: BS/REG/123779
- Completed intensive practical full-stack development internship.
- Built modular front-end interfaces and integrated custom RESTful APIs with Node.js and Express.
- Handled relational schema design, database queries, and dynamic state updates.

Full-Stack Project Lead & Creator | Football Zone Platform (2026)
- Live: https://football-zone-1.onrender.com
- Engineered Ballon d'Or 2026 analytics platform with live community voting and nominee tracking.
- Developed RESTful API backend using Express connected to Supabase PostgreSQL database.
- Implemented mobile-first dark UI and deployed live to Render.

VERIFIED CERTIFICATIONS
- 1-Month Internship in Full Stack Development – Alfido Tech (Credential ID: BS/REG/123779)
- Spring REST Course Completion Certificate – Infosys Springboard (Infosys Limited)
`.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isClean = themeMode === 'clean';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-[#0b1329] border border-slate-800 shadow-2xl overflow-hidden print:max-h-none print:max-w-none print:border-none print:shadow-none print:overflow-visible print:bg-white">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3.5 bg-[#020617] border-b border-slate-800 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#06b6d4]/10 border border-[#06b6d4]/50 flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#22d3ee]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white">
                  IBRAHIM.S — Official Resume
                </h3>
                <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded">
                  ATS Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                BCA Candidate &bull; Class of 2027 &bull; Mohamed Sathak College
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {/* View Style Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded text-xs font-mono">
              <button
                onClick={() => setThemeMode('clean')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer ${
                  isClean
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="ATS-Standard Clean Paper View"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Executive ATS</span>
              </button>
              <button
                onClick={() => setThemeMode('cyber')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer ${
                  !isClean
                    ? 'bg-[#06b6d4] text-slate-950 font-bold shadow-[0_0_10px_#06b6d4]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cyber Dark Portfolio Theme"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Cyber Dark</span>
              </button>
            </div>

            {/* Copy Plain Text */}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer rounded"
              title="Copy plain-text resume for job forms"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            {/* Print / Save PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-[#06b6d4] hover:bg-[#22d3ee] shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer rounded"
              title="Print or Save as PDF"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer rounded"
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notice Toast (e.g., Save as PDF instructions) */}
        {downloadNotice && (
          <div className="no-print px-4 py-2 bg-cyan-950/90 border-b border-cyan-800/80 text-cyan-200 text-xs font-mono flex items-center justify-between gap-3">
            <span>{downloadNotice}</span>
            <button
              onClick={() => setDownloadNotice(null)}
              className="text-cyan-400 hover:text-white text-xs font-bold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Scrollable Document Canvas */}
        <div className="overflow-y-auto p-3 sm:p-6 md:p-8 bg-slate-950 flex justify-center print:p-0 print:bg-white print:overflow-visible">
          {/* THE RESUME DOCUMENT (Print Target) */}
          <div
            id="printable-resume"
            className={`w-full max-w-[850px] transition-colors duration-200 print:w-full print:max-w-none print:shadow-none print:border-none print:p-0 ${
              isClean
                ? 'bg-white text-slate-900 shadow-2xl p-6 sm:p-10 md:p-12 border border-slate-200 font-sans'
                : 'bg-[#0f172a] text-slate-100 shadow-2xl p-6 sm:p-10 md:p-12 border border-slate-800 font-sans'
            }`}
          >
            {/* Header / Identity */}
            <div
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
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded ${
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

              {/* Contact Info Line */}
              <div
                className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-3 text-xs font-mono ${
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

            {/* Document Body Sections */}
            <div className="space-y-6 pt-5">
              {/* 1. PROFESSIONAL SUMMARY */}
              <section className="space-y-2">
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

              {/* 2. TECHNICAL SKILLS */}
              <section className="space-y-2.5">
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
                    className={`p-2.5 rounded border ${
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
                    className={`p-2.5 rounded border ${
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
                    className={`p-2.5 rounded border ${
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
                    className={`p-2.5 rounded border ${
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

              {/* 3. PRACTICAL EXPERIENCE & INTERNSHIPS */}
              <section className="space-y-3">
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
                      className="underline font-bold"
                    >
                      football-zone-1.onrender.com
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

              {/* 4. EDUCATION */}
              <section className="space-y-2">
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
                      Mohamed Sathak College of Arts and Science &bull; Chennai, India
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
                      Expected: May 2027
                    </span>
                  </div>
                </div>

                <div
                  className={`text-xs pt-1 ${
                    isClean ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  <p>
                    <strong className={isClean ? 'text-slate-900' : 'text-white'}>
                      Core Curriculum:
                    </strong>{' '}
                    Database Management Systems (DBMS), Programming &amp; Algorithmic Logic, Web Technologies, Computer Networks (OSI / TCP-IP), Data Structures.
                  </p>
                  <p className="mt-0.5">
                    <strong className={isClean ? 'text-slate-900' : 'text-white'}>
                      Current Standing:
                    </strong>{' '}
                    3rd Year (Final Year Candidate) &bull; Actively seeking software developer internships and entry-level engineering roles.
                  </p>
                </div>
              </section>

              {/* 5. VERIFIED CERTIFICATIONS */}
              <section className="space-y-2">
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
                      className={`p-2.5 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 ${
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
                        </p>
                      </div>

                      <div className="shrink-0 font-mono text-[10px] text-right">
                        <span
                          className={`px-2 py-0.5 rounded uppercase font-semibold ${
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

              {/* Document Sign-off / Print Footer */}
              <div
                className={`pt-4 border-t flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono ${
                  isClean
                    ? 'border-slate-200 text-slate-500'
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                <span>Certified BCA Portfolio Resume &bull; IBRAHIM. S</span>
                <span className="mt-1 sm:mt-0">
                  Contact: {SOCIAL_LINKS.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
