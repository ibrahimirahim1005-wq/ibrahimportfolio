import React, { useState } from 'react';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if ((window as any).__lenis) {
      if (id === 'home') {
        (window as any).__lenis.scrollTo(0, {
          duration: 0.9,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const element =
          document.getElementById(id) ||
          (id === 'projects' ? document.getElementById('work') : null);
        if (element) {
          (window as any).__lenis.scrollTo(element, {
            offset: -75,
            duration: 0.9,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/95 backdrop-blur-md border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand / Logo - High z-index & protective background to prevent particle bleed */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="relative z-50 flex items-center gap-2.5 group cursor-pointer px-2.5 py-1.5 -ml-2.5 rounded-sm bg-[#020617]/85 backdrop-blur-sm border border-slate-800/60 shadow-[0_2px_12px_rgba(2,6,23,0.9)]"
        >
          <div className="w-8 h-8 bg-[#06b6d4] text-slate-950 font-black font-display flex items-center justify-center text-lg tracking-tighter shadow-[0_0_12px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_18px_rgba(6,182,212,0.8)] group-hover:scale-105 transition-all duration-300">
            I
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-white text-base tracking-wider uppercase group-hover:text-cyan-300 transition-colors duration-200 drop-shadow-[0_2px_6px_rgba(2,6,23,0.95)]">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-mono text-[#facc15] tracking-wider uppercase font-semibold drop-shadow-[0_1px_4px_rgba(2,6,23,0.95)]">
              PORTFOLIO
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`group text-xs font-mono tracking-widest uppercase py-1 relative transition-colors duration-200 ${
                  isActive
                    ? 'text-[#22d3ee] font-bold'
                    : 'text-slate-300 hover:text-[#22d3ee]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#06b6d4] transition-all duration-300 ${
                    isActive
                      ? 'w-full shadow-[0_0_8px_#06b6d4]'
                      : 'w-0 group-hover:w-full opacity-70 group-hover:shadow-[0_0_6px_#06b6d4]'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Right: Resume & Menu Buttons */}
        <div className="flex items-center gap-3">
          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_22px_rgba(6,182,212,0.6)] hover:brightness-105 active:translate-y-0.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Resume</span>
          </button>

          {/* Menu Button (for Mobile & Quick Drawer) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#22d3ee]" /> : <Menu className="w-4 h-4 text-[#22d3ee]" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#1e293b] bg-[#0f172a] px-6 py-6 shadow-2xl">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between p-3.5 bg-[#020617] border border-slate-800 text-xs font-mono text-slate-200 hover:text-slate-950 hover:bg-[#06b6d4] hover:border-[#06b6d4] tracking-wider uppercase transition-all cursor-pointer text-left"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-[#1e293b] flex">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-3 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <FileText className="w-4 h-4 stroke-[2.5]" />
              <span>Download / View Resume PDF</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
