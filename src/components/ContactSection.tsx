import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { SOCIAL_LINKS, PERSONAL_INFO, EDUCATION } from '../data/portfolioData';
import { ScrollReveal } from './ui/ScrollReveal';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Hidden honeypot check: silently ignore if filled by spam bots
    if (honeypot) {
      setStatus('success');
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
      return;
    }

    // Basic validation: required name, valid email, and message >= 10 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!senderName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!senderEmail.trim() || !emailRegex.test(senderEmail.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a message of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const emailjs = (window as any).emailjs;
      if (!emailjs) {
        throw new Error('EmailJS SDK not available');
      }

      // Initialize with public key
      emailjs.init('8S_7e8ZnQ4IrKivN8');

      // Send with exact keys: {{name}}, {{email}}, {{subject}}, {{message}}, {{time}}
      await emailjs.send('service_7ejuof8', 'template_lumdrni', {
        name: senderName.trim(),
        email: senderEmail.trim(),
        subject: subject.trim() || 'New message',
        message: message.trim(),
        time: new Date().toLocaleString(),
      });

      setStatus('success');
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('EmailJS submit error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#020617] border-t border-[#1e293b] text-[#e2e8f0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8] font-semibold mb-2">
                <span className="w-2.5 h-2.5 bg-[#facc15] inline-block shadow-[0_0_8px_#facc15]" />
                <span>07 // CONNECT &amp; COLLABORATE</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight bg-linear-to-br from-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
                Let Us Work Together
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#94a3b8] max-w-md">
              Open for software development internships, web roles, and technical project collaborations.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4]/50 hover:shadow-[0_0_20px_-2px_rgba(6,182,212,0.4)] transition-all space-y-6">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#facc15] text-slate-950 font-bold uppercase tracking-wider inline-block mb-2">
                  Internship &amp; Project Inquiries
                </span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                  Get in Touch
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                  I am actively seeking software engineering and full-stack development internship opportunities for
                  2026/2027. Whether you want to discuss my Football Zone project, evaluate my coursework, or explore a
                  collaborative build, I would love to connect.
                </p>
              </div>

              {/* Direct Link Cards */}
              <div className="space-y-3">
                {/* Email Card with Copy button */}
                <div className="p-4 bg-[#020617] border border-[#1e293b] hover:border-[#06b6d4] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(6,182,212,0.25)] transition-all duration-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#06b6d4] text-slate-950 font-black flex items-center justify-center shadow-[0_0_10px_#06b6d4]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase block font-bold">
                        Direct Email Address
                      </span>
                      <a
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        className="text-xs sm:text-sm font-mono text-white hover:text-[#22d3ee] transition-colors font-medium break-all"
                      >
                        {SOCIAL_LINKS.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 bg-[#1e293b] hover:bg-[#06b6d4] text-slate-300 hover:text-slate-950 transition-colors cursor-pointer hover:scale-105 active:scale-95"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Card */}
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-[#020617] border border-[#1e293b] hover:border-[#06b6d4] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(6,182,212,0.25)] transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1e293b] text-cyan-400 border border-slate-700 flex items-center justify-center group-hover:bg-[#06b6d4] group-hover:text-slate-950 transition-colors shadow-sm">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase block font-bold">
                        LinkedIn Profile
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-slate-200 group-hover:text-[#22d3ee] transition-colors">
                        ibrahim-i-rahim-975a73413
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* GitHub Card */}
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-[#020617] border border-[#1e293b] hover:border-[#06b6d4] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(6,182,212,0.25)] transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1e293b] text-cyan-400 border border-slate-700 flex items-center justify-center group-hover:bg-[#06b6d4] group-hover:text-slate-950 transition-colors shadow-sm">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase block font-bold">
                        GitHub Profile &amp; Repos
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-slate-200 group-hover:text-[#22d3ee] transition-colors">
                        ibrahimirahim1005-wq
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>

              {/* Geographic and Academic Location Details */}
              <div className="pt-4 border-t border-[#1e293b] space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#06b6d4] shrink-0" />
                  <span>Chennai, Tamil Nadu, India (IST Timezone)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>BCA 3rd Year Scholar &bull; Mohamed Sathak College</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4]/50 hover:shadow-[0_0_20px_-2px_rgba(6,182,212,0.4)] transition-all p-7 sm:p-9 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1e293b]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#06b6d4] text-slate-950 font-black flex items-center justify-center shadow-[0_0_10px_#06b6d4]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                  Send a Direct Message
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#22d3ee] uppercase font-bold">
                Student Inquiry Portal
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hidden honeypot field to block spam bots */}
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#e2e8f0] uppercase tracking-widest block font-bold">
                    Your Name / Recruiter <span className="text-[#facc15]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Engineering Lead / Recruiter"
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1e293b] focus:border-[#06b6d4] focus:outline-none text-white font-sans text-sm transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#e2e8f0] uppercase tracking-widest block font-bold">
                    Your Email Address <span className="text-[#facc15]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. recruiter@company.com"
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1e293b] focus:border-[#06b6d4] focus:outline-none text-white font-sans text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#e2e8f0] uppercase tracking-widest block font-bold">
                  Opportunity Subject <span className="text-[#facc15]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Software Development Internship / Full-Stack Project"
                  className="w-full px-4 py-3 bg-[#020617] border border-[#1e293b] focus:border-[#06b6d4] focus:outline-none text-white font-sans text-sm transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#e2e8f0] uppercase tracking-widest block font-bold">
                  Your Message <span className="text-[#facc15]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Ibrahim, I reviewed your BCA portfolio and Football Zone platform. We would like to connect with you regarding an opportunity..."
                  className="w-full px-4 py-3 bg-[#020617] border border-[#1e293b] focus:border-[#06b6d4] focus:outline-none text-white font-sans text-sm transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage || 'Something went wrong. Please try again or email me directly.'}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_20px_-2px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>{isSubmitting ? 'SENDING...' : 'Dispatch Message via Email'}</span>
                </button>

                <p className="text-[11px] font-mono text-slate-500 text-center sm:text-right">
                  Delivers directly to {SOCIAL_LINKS.email}
                </p>
              </div>

              {status === 'success' && (
                <div className="p-3.5 bg-[#082f49]/60 border border-cyan-500/50 text-[#22d3ee] text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-bold">Message sent!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* POLISHED PORTFOLIO ENDING: THANK YOU & LET'S CONNECT */}
        <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-[#1e293b] relative animate-gentle-fade-in">
          {/* Subtle Ambient Cyan Glow Behind the Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-36 bg-[#06b6d4]/10 blur-[80px] pointer-events-none rounded-full" />

          <div className="relative bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4]/50 transition-all duration-300 p-6 sm:p-9 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] hover:shadow-[0_8px_30px_-5px_rgba(6,182,212,0.25)] hover:-translate-y-0.5">
            {/* Top Indicator & Restrained Yellow Accent */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8] font-semibold">
                <span className="w-2.5 h-2.5 bg-[#facc15] inline-block shadow-[0_0_8px_#facc15]" />
                <span className="text-[#22d3ee]">WRAP-UP // LET&apos;S DEVELOP TOGETHER</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 bg-[#020617] border border-[#1e293b] text-[#facc15] font-bold uppercase tracking-wider">
                Open to Opportunities
              </span>
            </div>

            {/* Thank You Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display uppercase tracking-tight text-white mb-4">
              Thank You for Visiting My Portfolio
            </h3>

            {/* Required Message Sentences */}
            <div className="space-y-2 text-slate-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
              <p className="text-slate-100 font-medium">
                Thank you for taking the time to explore my portfolio.
              </p>
              <p className="text-slate-400">
                I&apos;m continuously learning, building projects, and growing as a future software developer. I&apos;d love to connect and learn from new opportunities.
              </p>
            </div>

            {/* LET'S CONNECT Area */}
            <div className="pt-6 border-t border-[#1e293b]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-3.5 bg-[#facc15]" />
                <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#22d3ee]">
                  Let&apos;s Connect
                </h4>
              </div>

              {/* Three Clickable Social / Contact Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. GitHub */}
                <a
                  href="https://github.com/ibrahimirahim1005-wq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-[#020617] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow-[0_4px_18px_rgba(6,182,212,0.25)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-[#1e293b] text-[#22d3ee] border border-slate-700/80 flex items-center justify-center group-hover:bg-[#06b6d4] group-hover:text-slate-950 transition-colors shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase block font-bold leading-tight">
                        GitHub
                      </span>
                      <span className="text-xs font-mono text-slate-200 group-hover:text-[#22d3ee] transition-colors truncate block">
                        ibrahimirahim1005-wq
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#22d3ee] transition-colors shrink-0 ml-2" />
                </a>

                {/* 2. LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ibrahim-i-rahim-975a73413/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-[#020617] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow-[0_4px_18px_rgba(6,182,212,0.25)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-[#1e293b] text-[#22d3ee] border border-slate-700/80 flex items-center justify-center group-hover:bg-[#06b6d4] group-hover:text-slate-950 transition-colors shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase block font-bold leading-tight">
                        LinkedIn
                      </span>
                      <span className="text-xs font-mono text-slate-200 group-hover:text-[#22d3ee] transition-colors truncate block">
                        ibrahim-i-rahim
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#22d3ee] transition-colors shrink-0 ml-2" />
                </a>

                {/* 3. Email */}
                <a
                  href="mailto:ibrahimirahim1005@gmail.com"
                  className="group relative p-4 bg-[#020617] border border-[#1e293b] hover:border-[#06b6d4] transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow-[0_4px_18px_rgba(6,182,212,0.25)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-[#1e293b] text-[#22d3ee] border border-slate-700/80 flex items-center justify-center group-hover:bg-[#06b6d4] group-hover:text-slate-950 transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase block font-bold leading-tight">
                        Email
                      </span>
                      <span className="text-xs font-mono text-slate-200 group-hover:text-[#22d3ee] transition-colors truncate block">
                        ibrahimirahim1005@gmail.com
                      </span>
                    </div>
                  </div>
                  <Mail className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#22d3ee] transition-colors shrink-0 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
