/**
 * Sticky Navigation Bar
 * Features:
 * - Brand logo: MK
 * - Smooth section navigation
 * - Active section detection with IntersectionObserver
 * - Mobile hamburger responsive menu
 * - Theme Customizer launcher trigger
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Palette, Sparkles, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface NavbarProps {
  onOpenThemeCustomizer: () => void;
  onOpenResumeModal?: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Currently Building', href: '#currently-building' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenThemeCustomizer, onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'experience', 'leadership', 'ongoing-programs', 'certifications', 'currently-building', 'contact'];
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px',
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070817]/90 backdrop-blur-md border-b border-[#55E6FF]/15 py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF] rounded-lg p-1"
          aria-label="Mahima Kanoujiya - Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#925CFF] to-[#55E6FF] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#070817] rounded-[10px] flex items-center justify-center">
              <span className="font-display font-bold text-sm tracking-widest text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
                {PORTFOLIO_DATA.personal.logo}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-sm tracking-tight text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
              Mahima Kanoujiya
            </span>
            <span className="text-[10px] text-[#CCD0EB] tracking-wider font-mono">
              DIGITAL PORTFOLIO
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0c1026]/80 border border-[#55E6FF]/20 px-3 py-1.5 rounded-full shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#55E6FF]/15 text-[#55E6FF] border border-[#55E6FF]/35 shadow-sm'
                    : 'text-[#CCD0EB] hover:text-[#F5F5FF] hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Theme Customizer Trigger */}
          <button
            onClick={onOpenThemeCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c1026] border border-[#55E6FF]/30 hover:border-[#55E6FF] text-[#F5F5FF] hover:text-[#55E6FF] text-xs font-medium transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF]"
            aria-label="Customize theme colors"
            title="Customize theme colors"
          >
            <Palette className="w-3.5 h-3.5 text-[#55E6FF]" />
            <span className="hidden sm:inline">Theme</span>
          </button>

          {/* Direct Resume Download Link */}
          <a
            href="/Mahima_Kanoujiya_Resume_Updated.pdf"
            download="Mahima_Kanoujiya_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#925CFF]/20 to-[#55E6FF]/20 border border-[#55E6FF]/35 hover:border-[#55E6FF] text-[#F5F5FF] hover:text-[#55E6FF] text-xs font-medium transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF]"
            aria-label="Download Mahima Kanoujiya Resume PDF"
          >
            <Download className="w-3.5 h-3.5 text-[#55E6FF]" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0c1026] border border-[#55E6FF]/25 text-[#F5F5FF] hover:text-[#55E6FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#070817]/98 border-b border-[#55E6FF]/25 backdrop-blur-xl px-5 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#55E6FF]/15 text-[#55E6FF] border border-[#55E6FF]/40 font-semibold'
                      : 'text-[#CCD0EB] hover:text-[#F5F5FF] hover:bg-[#0c1026]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="/Mahima_Kanoujiya_Resume_Updated.pdf"
                download="Mahima_Kanoujiya_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#925CFF] to-[#55E6FF] text-[#070817] font-semibold text-sm shadow-md"
                aria-label="Download Mahima Kanoujiya Resume PDF"
              >
                <Download className="w-4 h-4 text-[#070817]" />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
