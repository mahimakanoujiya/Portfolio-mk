/**
 * Ongoing Programs Section
 * Displays current active student community programs:
 * 1. Microsoft Learn Student Ambassador — Ongoing
 * 2. Unstop Campus Champion — Ongoing
 * Compact, balanced presentation with active 'Ongoing' status labels.
 */

import React from 'react';
import { Award, Compass, Sparkles, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const OngoingPrograms: React.FC = () => {
  const programs = PORTFOLIO_DATA.ongoingPrograms;

  return (
    <section id="ongoing-programs" className="py-12 sm:py-16 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#55E6FF]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/40 text-xs font-mono text-[#55E6FF] mb-2.5">
            <Activity className="w-3.5 h-3.5 text-[#55E6FF] animate-pulse" />
            <span>ACTIVE STUDENT ROLES</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F5FF] tracking-tight">
            Ongoing Programs
          </h2>
        </div>

        {/* Two Compact, Visually Balanced Cards */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-[#0c1026]/90 border border-white/10 hover:border-[#55E6FF]/50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl hover:shadow-[#55E6FF]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#070817] border border-[#55E6FF]/30 flex items-center justify-center text-[#55E6FF]">
                    {program.id.includes('microsoft') ? (
                      <Compass className="w-4 h-4 text-[#55E6FF]" />
                    ) : (
                      <Award className="w-4 h-4 text-[#55E6FF]" />
                    )}
                  </div>

                  {/* Active Status Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#55E6FF]/15 border border-[#55E6FF]/35 text-[10px] font-mono text-[#55E6FF] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55E6FF] animate-pulse" />
                    {program.status}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-base sm:text-lg text-[#F5F5FF] leading-snug">
                  {program.title}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#CCD0EB]">
                <span className="font-mono text-[11px] text-[#55E6FF] font-medium">{program.organization}</span>
                <span className="text-[11px] text-[#CCD0EB]">Student Community</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
