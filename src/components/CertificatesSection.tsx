import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Eye,
  Download,
  X,
  FileCheck,
  Calendar,
  UserCheck,
  Hash,
  Sparkles,
} from 'lucide-react';
import { EDUCATION, VERIFIED_CERTIFICATES } from '../data/portfolioData';
import { VerifiedCertificate } from '../types';
import { ScrollReveal, ScrollRevealItem } from './ui/ScrollReveal';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<VerifiedCertificate | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const academicCredentials = [
    {
      title: 'Bachelor of Computer Applications (BCA) Candidacy',
      issuer: 'Mohamed Sathak College of Arts and Science',
      period: '2024 – 2027',
      status: 'Active Undergraduate Degree',
      type: 'Degree Program',
      description:
        'Official enrollment and curriculum progression across core computer application subjects, software development foundations, and computer laboratory sessions.',
      verified: true,
    },
    {
      title: 'Database Management Systems & SQL Lab Completion',
      issuer: 'Mohamed Sathak College of Arts and Science',
      period: 'BCA Curriculum Milestone',
      status: 'Coursework Verified',
      type: 'Academic Laboratory',
      description:
        'Hands-on laboratory completion covering relational schema normalization, query formulation, and entity-relationship data modeling.',
      verified: true,
    },
    {
      title: 'Web Technologies & Application Architecture Milestone',
      issuer: 'Mohamed Sathak College of Arts and Science',
      period: 'BCA Curriculum Milestone',
      status: 'Coursework Verified',
      type: 'Technical Practical',
      description:
        'Core competency validation in semantic HTML5 markup, modern CSS styling, client-server web architectures, and client-side scripting.',
      verified: true,
    },
    {
      title: 'Programming in C/C++ Logic & Algorithms Milestone',
      issuer: 'Mohamed Sathak College of Arts and Science',
      period: 'BCA Curriculum Milestone',
      status: 'Coursework Verified',
      type: 'Programming Core',
      description:
        'Comprehensive study of structured programming syntax, memory pointers, algorithmic problem-solving, and computational logic.',
      verified: true,
    },
  ];

  return (
    <section
      id="certificates"
      className="relative py-24 bg-[#020617] border-t border-[#1e293b] text-[#e2e8f0] scroll-mt-20 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="left" blur={true}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8] font-semibold mb-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] inline-block shadow-[0_0_8px_#facc15]" />
                <span>06 // CREDENTIALS &amp; VERIFICATION</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight bg-linear-to-br from-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
                Certificates &amp; Credentials
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] bg-[#0f172a] border border-[#1e293b] px-3.5 py-2">
              <ShieldCheck className="w-4 h-4 text-[#06b6d4]" />
              <span className="uppercase tracking-wider">Verified Industry &amp; Academic Records</span>
            </div>
          </div>
        </ScrollReveal>

        {/* FEATURED INDUSTRY CERTIFICATES (TEXT INTRODUCTION FIRST, CLICK 'VIEW' TO SEE CERTIFICATE) */}
        <div className="mb-16">
          <ScrollReveal direction="right" blur={true} delay={0.12}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b border-[#1e293b] gap-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#22d3ee] font-bold">
                <Award className="w-4 h-4 text-[#06b6d4]" />
                <span>Verified Industry Certifications &amp; Internships</span>
              </div>
              <span className="text-[11px] font-mono text-[#94a3b8]">
                Select &quot;View Certificate&quot; to inspect official documents
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {VERIFIED_CERTIFICATES.map((cert, cIdx) => (
              <ScrollRevealItem
                key={cert.id}
                index={cIdx}
                alternate={true}
                stagger={0.12}
                delay={0.12}
                className="h-full"
              >
                <div className="h-full group relative bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_8px_30px_-5px_rgba(6,182,212,0.35)] hover:-translate-y-1">
                  {/* Card Header: Category & Verification Status */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-[#1e293b] gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#06b6d4] rounded-full shadow-[0_0_6px_#06b6d4]" />
                        <span className="font-mono text-xs text-[#22d3ee] font-bold uppercase tracking-wider">
                          {cert.credentialType === 'Internship'
                            ? 'Industry Internship'
                            : 'Technical Certification'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#020617] border border-emerald-500/50 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Verified</span>
                        </span>
                        <span className="px-2 py-0.5 bg-[#020617] border border-[#1e293b] text-slate-400 font-mono text-[10px] uppercase font-semibold">
                          {cert.documentType === 'pdf' ? 'Official PDF' : 'Digital Cert'}
                        </span>
                      </div>
                    </div>

                    {/* Title & Issuing Organization */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#020617] border border-cyan-500/40 text-[#22d3ee] flex items-center justify-center shrink-0 group-hover:bg-[#06b6d4] group-hover:text-slate-950 transition-colors shadow-sm">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-wide group-hover:text-[#22d3ee] transition-colors leading-snug">
                          {cert.title}
                        </h3>
                        <p className="text-xs font-mono text-[#facc15] font-semibold">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    {/* Accreditation Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {cert.accreditation?.map((acc, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-[#020617] border border-[#1e293b] text-[#22d3ee] font-mono text-[10px] font-bold uppercase tracking-wider"
                        >
                          {acc}
                        </span>
                      ))}
                    </div>

                    {/* Introduction Overview Paragraph */}
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Metadata Specification Table */}
                    <div className="p-4 bg-[#020617] border border-[#1e293b] space-y-2.5 text-xs font-mono">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]/70">
                        <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#06b6d4]" />
                          <span>Candidate Name</span>
                        </span>
                        <span className="text-white font-bold">{cert.recipient}</span>
                      </div>

                      <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]/70">
                        <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#facc15]" />
                          <span>{cert.duration ? 'Internship Period' : 'Issue Date'}</span>
                        </span>
                        <span className="text-slate-200">{cert.duration || cert.issueDate}</span>
                      </div>

                      {cert.candidateId && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1.5">
                            <Hash className="w-3.5 h-3.5 text-[#22d3ee]" />
                            <span>Candidate / Verification ID</span>
                          </span>
                          <span className="text-[#22d3ee] font-bold">{cert.candidateId}</span>
                        </div>
                      )}
                    </div>

                    {/* Skills Covered Tags */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                        Core Competencies Covered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 bg-[#020617] border border-slate-800 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons: View Certificate (Opens Modal) & External Document */}
                  <div className="pt-6 mt-6 border-t border-[#1e293b] flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="w-full sm:flex-1 py-3 px-5 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_24px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 stroke-[2.5]" />
                      <span>View Certificate</span>
                    </button>

                    <a
                      href={cert.originalDocumentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3 px-4 bg-[#020617] hover:bg-[#1e293b] border border-[#1e293b] hover:border-[#06b6d4] text-slate-300 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{cert.documentType === 'pdf' ? 'Original PDF' : 'Inspect File'}</span>
                    </a>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        </div>

        {/* Primary Official Degree Candidacy Banner */}
        <ScrollReveal direction="left" blur={true} delay={0.12}>
          <div className="p-7 sm:p-9 bg-[#0f172a] border-2 border-[#1e293b] hover:border-[#06b6d4]/50 hover:shadow-[0_8px_30px_-5px_rgba(6,182,212,0.25)] hover:-translate-y-0.5 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-all duration-300 mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#1e293b]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#06b6d4] text-slate-950 font-black flex items-center justify-center shrink-0 shadow-[0_0_15px_#06b6d4]">
                  <Award className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#facc15] text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider">
                      Official Degree Status
                    </span>
                    <span className="text-xs font-mono text-slate-400">Undergraduate Degree in Progress</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-wide">
                    Candidate for {EDUCATION.degree}
                  </h3>
                  <p className="text-sm font-mono text-[#22d3ee]">
                    {EDUCATION.institution} &bull; Expected Graduation {EDUCATION.expectedGraduation}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 bg-[#020617] border border-cyan-500/40 font-mono text-xs text-center shrink-0">
                <span className="text-cyan-400 font-bold block text-sm">Graduation: 2027</span>
                <span className="text-[10px] text-slate-400 uppercase">3rd Year Finalist</span>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-[#020617] border border-[#1e293b] hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-slate-500 uppercase block text-[10px]">Affiliated Institution</span>
                <span className="text-white font-bold text-xs mt-0.5 block">{EDUCATION.institution}</span>
              </div>
              <div className="p-3.5 bg-[#020617] border border-[#1e293b] hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-slate-500 uppercase block text-[10px]">Academic Timeline</span>
                <span className="text-[#22d3ee] font-bold text-xs mt-0.5 block">{EDUCATION.timeline} (3 Years)</span>
              </div>
              <div className="p-3.5 bg-[#020617] border border-[#1e293b] hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-slate-500 uppercase block text-[10px]">Verification Standard</span>
                <span className="text-emerald-400 font-bold text-xs mt-0.5 block">100% Genuine Coursework</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Verified Academic Milestones Grid */}
        <div className="space-y-6">
          <ScrollReveal direction="right" blur={true} delay={0.12}>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#94a3b8] font-bold">
              <BookOpen className="w-4 h-4 text-[#06b6d4]" />
              <span>Academic Curriculum Milestones &amp; Laboratory Validations</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicCredentials.map((cred, idx) => (
              <ScrollRevealItem
                key={idx}
                index={idx}
                alternate={true}
                stagger={0.12}
                delay={0.12}
                className="h-full"
              >
                  <div className="h-full p-6 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_8px_20px_-2px_rgba(6,182,212,0.35)]">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 bg-[#020617] text-[#22d3ee] font-bold uppercase border border-slate-800">
                          {cred.type}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                          {cred.period}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white font-display uppercase tracking-wide group-hover:text-[#22d3ee] transition-colors">
                          {cred.title}
                        </h4>
                        <p className="text-xs text-[#94a3b8] font-mono mt-0.5">{cred.issuer}</p>
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {cred.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1e293b] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{cred.status}</span>
                      </span>
                      <span className="text-slate-500 uppercase">Verified Milestone</span>
                    </div>
                  </div>
                </ScrollRevealItem>
              ))}
            </div>
          </div>
      </div>

      {/* FULLSCREEN / DEDICATED CERTIFICATE VIEWER MODAL - ONLY SHOWN WHEN USER CLICKS 'VIEW' */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0f172a] border border-[#1e293b] shadow-2xl flex flex-col my-auto overflow-hidden animate-gentle-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#020617] border-b border-[#1e293b] gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 bg-[#facc15] shrink-0 shadow-[0_0_8px_#facc15]" />
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-white font-bold truncate">
                    {selectedCert.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#22d3ee] truncate">
                    {selectedCert.issuer} &bull; Candidate: {selectedCert.recipient}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={selectedCert.originalDocumentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#06b6d4] text-slate-200 hover:text-slate-950 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open Original</span>
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 bg-[#1e293b] hover:bg-red-500 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View Area - Here is where the actual certificate document is displayed */}
            <div className="p-4 sm:p-6 bg-[#020617] max-h-[72vh] overflow-y-auto flex items-center justify-center">
              <div className="relative max-w-full bg-[#0b1329] border border-[#1e293b] shadow-2xl p-1.5 sm:p-2">
                <img
                  src={selectedCert.previewImage}
                  alt={selectedCert.title}
                  className="max-h-[64vh] w-auto max-w-full object-contain mx-auto shadow-md"
                />
              </div>
            </div>

            {/* Modal Footer Verification Strip */}
            <div className="px-5 sm:px-6 py-4 bg-[#0a1020] border-t border-[#1e293b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>AUTHENTIC VERIFIED CREDENTIAL</span>
                  </span>
                  {selectedCert.candidateId && (
                    <span className="text-[#94a3b8]">&bull; ID: {selectedCert.candidateId}</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {selectedCert.duration ? `Conducted: ${selectedCert.duration}` : `Issued: ${selectedCert.issueDate}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#22d3ee] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Verify Online</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={selectedCert.originalDocumentUrl}
                  download
                  className="px-3.5 py-1.5 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
