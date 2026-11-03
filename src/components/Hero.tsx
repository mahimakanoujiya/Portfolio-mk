/**
 * Hero Section — Fullscreen opening experience
 * Displays Mahima Kanoujiya's identity, tagline, 3D Orbital Portal, and primary CTAs.
 * Direct PDF download for Mahima_Kanoujiya_Resume.pdf.
 */

import React from 'react';
import { Sparkles, Download, Compass, ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { OrbitalPortal } from './OrbitalPortal';
import { Typewriter } from './Typewriter';
import { ThemeColors } from '../data/themes';

interface HeroProps {
  theme: ThemeColors;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden scroll-mt-20"
    >
      {/* 3D Visual Atmosphere Background Layer */}
      <div className="absolute inset-0 pointer-events-none md:pointer-events-auto z-0 opacity-80 md:opacity-100">
        <OrbitalPortal theme={theme} className="w-full h-full" />
      </div>

      {/* Subtle radial gradients to enhance text legibility over 3D scene without muddying */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070817] via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(7,8,23,0.85)_0%,rgba(7,8,23,0.5)_60%,transparent_100%)] pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Storytelling & Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status & Identity Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-[#0c1026]/90 border border-[#55E6FF]/30 mb-4 sm:mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#55E6FF] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono tracking-wide text-[#CCD0EB]">
                {PORTFOLIO_DATA.personal.professionalIdentity}
              </span>
            </div>

            {/* Main Greeting / Heading */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F5FF] tracking-tight leading-[1.15] mb-2 sm:mb-3">
              {PORTFOLIO_DATA.personal.heroGreeting}
            </h1>

            {/* Subtitle with Genuine Character-by-Character Typewriter */}
            <div className="font-display font-semibold text-base sm:text-lg md:text-xl text-[#55E6FF] mb-2 sm:mb-3 tracking-wide flex items-center gap-2 min-h-[1.75em]">
              <Sparkles className="w-4 h-4 text-[#D8C49A] shrink-0" />
              <Typewriter
                phrases={[
                  'AI & ML Student',
                  'Creative Developer',
                  'Technology Explorer',
                  'Building Digital Experiences',
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={1800}
              />
            </div>

            {/* Tagline */}
            <p className="font-display text-lg sm:text-xl md:text-2xl text-[#E2E5F8] font-medium tracking-tight mb-4 sm:mb-5">
              "{PORTFOLIO_DATA.personal.tagline}"
            </p>

            {/* Short Two-Line Introduction - bright and readable */}
            <p className="text-sm sm:text-base md:text-lg text-[#CCD0EB] leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal">
              {PORTFOLIO_DATA.personal.shortIntro}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#925CFF] to-[#55E6FF] text-[#070817] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#925CFF]/25 hover:shadow-[#55E6FF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF]"
              >
                <Compass className="w-4 h-4" />
                <span>Explore My Work</span>
              </a>

              {/* Direct Download of actual Mahima_Kanoujiya_Resume.pdf */}
              <a
                href="/Mahima_Kanoujiya_Resume.pdf"
                download="Mahima_Kanoujiya_Resume.pdf"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#0c1026] hover:bg-[#131838] border border-[#55E6FF]/30 hover:border-[#55E6FF]/70 text-[#F5F5FF] hover:text-[#55E6FF] font-medium text-xs sm:text-sm transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF] active:scale-[0.98]"
                aria-label="Download Mahima Kanoujiya Resume PDF"
              >
                <Download className="w-4 h-4 text-[#55E6FF]" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Education Highlight Strip */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 w-full flex items-center gap-2.5 text-xs text-[#CCD0EB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8C49A] shrink-0" />
              <span className="leading-snug">
                <strong className="text-[#F5F5FF] font-medium">B.Tech in CSE (AI & ML)</strong> — Centre for Advanced Studies, AKTU Lucknow
              </span>
            </div>
          </div>

          {/* Right Column: Space reserved for 3D orbital presence */}
          <div className="hidden lg:flex lg:col-span-5 h-[440px] pointer-events-none items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Subtle visual orbit frame ring */}
              <div className="w-80 h-80 rounded-full border border-[#55E6FF]/15 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-96 h-96 rounded-full border border-[#55E6FF]/10 animate-[spin_60s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <a
          href="#about"
          onClick={handleScrollToAbout}
          className="flex flex-col items-center text-[#CCD0EB] hover:text-[#55E6FF] transition-colors text-xs font-mono group"
          aria-label="Scroll down to About section"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#55E6FF] group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
