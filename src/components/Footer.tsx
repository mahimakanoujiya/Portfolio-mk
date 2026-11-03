/**
 * Footer Component
 * Includes:
 * - Brand wordmark & Mahima Kanoujiya name
 * - Tagline: "Exploring Intelligence. Building Possibilities."
 * - Quick navigation links
 * - GitHub, LinkedIn, Instagram icons
 * - Auto-updating current year
 * - Subtle back-to-top control
 */

import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail, Sparkles, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const contact = PORTFOLIO_DATA.personal.contact;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Currently Building', href: '#currently-building' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-[#55E6FF]/15 bg-[#070817] relative z-20 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-[#55E6FF]/05 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Brand & Identity Column */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#925CFF] to-[#55E6FF] p-[1.5px]">
                <div className="w-full h-full bg-[#070817] rounded-[10px] flex items-center justify-center font-display font-bold text-xs text-[#F5F5FF]">
                  {PORTFOLIO_DATA.personal.logo}
                </div>
              </div>
              <span className="font-display font-bold text-lg text-[#F5F5FF]">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>

            <p className="font-display text-sm text-[#E2E5F8] font-medium mb-3 italic">
              "{PORTFOLIO_DATA.personal.tagline}"
            </p>

            <p className="text-xs text-[#CCD0EB] max-w-sm leading-relaxed mb-6">
              Computer Science student specializing in Artificial Intelligence & Machine Learning at Dr. A.P.J. Abdul Kalam Technical University, Lucknow.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0c1026] border border-white/10 hover:border-[#55E6FF] flex items-center justify-center text-[#CCD0EB] hover:text-[#55E6FF] transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0c1026] border border-white/10 hover:border-[#55E6FF] flex items-center justify-center text-[#CCD0EB] hover:text-[#55E6FF] transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0c1026] border border-white/10 hover:border-[#55E6FF] flex items-center justify-center text-[#CCD0EB] hover:text-[#55E6FF] transition-all"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="w-9 h-9 rounded-xl bg-[#0c1026] border border-white/10 hover:border-[#55E6FF] flex items-center justify-center text-[#CCD0EB] hover:text-[#55E6FF] transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#55E6FF] mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#CCD0EB] hover:text-[#55E6FF] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top & Direct Contacts */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between self-stretch">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c1026] border border-[#55E6FF]/30 hover:border-[#55E6FF] text-xs font-mono text-[#CCD0EB] hover:text-[#55E6FF] transition-all shadow-sm"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <div className="mt-8 text-left md:text-right">
              <span className="text-[11px] font-mono text-[#CCD0EB] block">
                Primary Contact
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-xs font-medium text-[#F5F5FF] hover:text-[#55E6FF] transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CCD0EB]">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>© {currentYear} Mahima Kanoujiya.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#CCD0EB]">
            <span>Crafted with Three.js, React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
