/**
 * About Section — Concise, professional, and student-focused
 * Updated per refinement specifications:
 * - Small label: ABOUT ME
 * - Heading: A Curious Mind. A Builder's Journey.
 * - Role: B.Tech Undergraduate in AI & Machine Learning
 * - 2 concise paragraphs
 * - Exactly 3 compact highlight cards (AI & ML, Hands-On Building, Community & Leadership)
 * - Education & personal creed integration without redundant filler text
 */

import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Cpu,
  Code2,
  Users,
  Lightbulb,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Background ambient accents - subtle */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#925CFF]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-[#55E6FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/30 text-xs font-mono text-[#55E6FF] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D8C49A]" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F5F5FF] tracking-tight mb-3">
            A Curious Mind. A Builder's Journey.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#55E6FF]/90">
            B.Tech Undergraduate in AI & Machine Learning
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Story & Concise Paragraphs */}
          <div className="lg:col-span-7 bg-[#0c1026]/90 border border-[#55E6FF]/20 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-4 text-sm sm:text-base text-[#CCD0EB] leading-relaxed">
              <p>
                I'm a Computer Science student specializing in AI & Machine Learning at the Centre for Advanced Studies, AKTU, Lucknow. I enjoy exploring technology and turning ideas into practical projects.
              </p>
              <p>
                My interests include AI applications, software development, creative problem-solving, and student technology communities. I'm learning by building, experimenting, and collaborating.
              </p>
            </div>

            {/* Exactly Three Compact Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10">
              {/* Card 1: AI & ML */}
              <div className="p-3.5 rounded-xl bg-[#070817]/70 border border-white/10 hover:border-[#55E6FF]/40 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Cpu className="w-4 h-4 text-[#55E6FF] shrink-0" />
                  <h4 className="font-semibold text-xs text-[#F5F5FF]">AI & ML</h4>
                </div>
                <p className="text-[11px] text-[#CCD0EB] leading-snug">
                  Exploring AI concepts and practical applications.
                </p>
              </div>

              {/* Card 2: Hands-On Building */}
              <div className="p-3.5 rounded-xl bg-[#070817]/70 border border-white/10 hover:border-[#55E6FF]/40 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Code2 className="w-4 h-4 text-[#55E6FF] shrink-0" />
                  <h4 className="font-semibold text-xs text-[#F5F5FF]">Hands-On Building</h4>
                </div>
                <p className="text-[11px] text-[#CCD0EB] leading-snug">
                  Learning through projects and experimentation.
                </p>
              </div>

              {/* Card 3: Community & Leadership */}
              <div className="p-3.5 rounded-xl bg-[#070817]/70 border border-white/10 hover:border-[#55E6FF]/40 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Users className="w-4 h-4 text-[#D8C49A] shrink-0" />
                  <h4 className="font-semibold text-xs text-[#F5F5FF]">Community & Leadership</h4>
                </div>
                <p className="text-[11px] text-[#CCD0EB] leading-snug">
                  Participating in student technology initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Philosophy */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 justify-between">
            {/* Compact Education Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1026]/90 border border-[#55E6FF]/20 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#55E6FF]/15 border border-[#55E6FF]/35 flex items-center justify-center text-[#55E6FF] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D8C49A] block mb-1">
                    Education
                  </span>
                  <h3 className="font-display font-semibold text-sm sm:text-base text-[#F5F5FF] leading-snug mb-1">
                    {PORTFOLIO_DATA.personal.education.degree}
                  </h3>
                  <p className="text-xs text-[#CCD0EB] leading-relaxed">
                    {PORTFOLIO_DATA.personal.education.institution}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Statement Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0c1026] to-[#131838] border border-[#55E6FF]/25 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-[#D8C49A]" />
                <span className="font-mono text-[10px] text-[#55E6FF] uppercase tracking-wider">Guiding Creed</span>
              </div>
              <blockquote className="font-display text-sm sm:text-base text-[#F5F5FF] font-medium leading-relaxed italic mb-3">
                "{PORTFOLIO_DATA.personal.personalStatement}"
              </blockquote>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#CCD0EB]">
                <span className="font-medium text-[#F5F5FF]">Mahima Kanoujiya</span>
                <span className="font-mono text-[11px] text-[#55E6FF]">CAS, AKTU Lucknow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
