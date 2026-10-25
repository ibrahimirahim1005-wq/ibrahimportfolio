import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectSection } from './components/ProjectSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PhotoModal } from './components/PhotoModal';
import { GlowCursor } from './components/ui/GlowCursor';
import { CinematicScrollProvider } from './components/CinematicScrollProvider';
// SPIDER INTRO: Full-Screen Spider Web Intro Overlay Animation
import { SpiderWebIntro } from './components/ui/SpiderWebIntro';
import { SectionDivider } from './components/ui/SectionDivider';
import { PERSONAL_INFO } from './data/portfolioData';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(() => {
    return '/ibrahim-portrait.png';
  });

  const handleUpdatePhoto = (url: string | null) => {
    setCustomPhotoUrl(url);
    if (url) {
      localStorage.setItem('ibrahim_portfolio_custom_photo', url);
    } else {
      localStorage.removeItem('ibrahim_portfolio_custom_photo');
    }
  };

  // High-performance IntersectionObserver for dynamic nav highlights & 3D canvas interaction
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'projects',
      'experience',
      'certificates',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume-modal', handleOpenResume);

    return () => {
      observer.disconnect();
      window.removeEventListener('open-resume-modal', handleOpenResume);
    };
  }, []);

  return (
    <CinematicScrollProvider>
      {/* SPIDER INTRO: Plays once per browser session before revealing Home */}
      <SpiderWebIntro />

      <div className="relative min-h-screen bg-[#020617] text-[#e2e8f0] selection:bg-[#06b6d4]/30 selection:text-cyan-200">
        {/* Global Glowing Light Cursor Trail across all sections */}
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <GlowCursor
            color="#22d3ee"
            secondaryColor="#0891b2"
            intensity={1.2}
            trailWidth={1.2}
            linger={1.1}
            glow={0.85}
            hotspot={0.55}
            followSpeed={0.65}
            clickBurst
            quality="medium"
            theme="dark"
          />
        </div>

        {/* Main UI Layer */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            onOpenResume={() => setIsResumeOpen(true)}
            activeSection={activeSection}
          />

          <main className="flex-1">
            <Hero
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenPhoto={() => setIsPhotoOpen(true)}
              customPhotoUrl={customPhotoUrl}
            />
            <SectionDivider delay={0} />
            <AboutSection onOpenResume={() => setIsResumeOpen(true)} />
            <SectionDivider delay={0.9} />
            <SkillsSection />
            <SectionDivider delay={1.8} />
            <ProjectSection />
            <SectionDivider delay={2.7} />
            <ExperienceSection />
            <SectionDivider delay={3.6} />
            <CertificatesSection />
            <SectionDivider delay={4.5} />
            <ContactSection />
          </main>

          <Footer />
        </div>

        {/* Fullscreen Interactive Resume PDF Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

        {/* Profile Photo & Cutout Portrait Modal */}
        <PhotoModal
          isOpen={isPhotoOpen}
          onClose={() => setIsPhotoOpen(false)}
          customPhotoUrl={customPhotoUrl}
          onUpdatePhoto={handleUpdatePhoto}
        />
      </div>
    </CinematicScrollProvider>
  );
}
