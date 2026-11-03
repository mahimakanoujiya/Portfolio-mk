/**
 * Leadership Section
 * Displays only one role: AWS Student Builder Group Leader
 * Associated with: Centre for Advanced Studies, Dr. A.P.J. Abdul Kalam Technical University, Lucknow.
 * Compact, premium presentation with prominent role title and cloud-themed visual.
 */

import React from 'react';
import { Cloud, Users, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Leadership: React.FC = () => {
  const lead = PORTFOLIO_DATA.leadership;

  return (
    <section id="leadership" className="py-12 sm:py-16 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#925CFF]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/40 text-xs font-mono text-[#55E6FF] mb-2.5">
            <Users className="w-3.5 h-3.5 text-[#55E6FF]" />
            <span>STUDENT LEADERSHIP</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F5FF] tracking-tight">
            Leadership
          </h2>
        </div>

        {/* Compact Premium Leadership Card */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#0c1026]/95 via-[#101430]/95 to-[#0c1026]/95 border border-[#55E6FF]/25 hover:border-[#55E6FF]/60 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden transition-all duration-300">
          {/* Subtle animated orbital cloud graphic in background */}
          <div className="absolute -top-10 -right-10 w-60 h-60 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#55E6FF]">
              <g className="animate-[spin_30s_linear_infinite] origin-center">
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 6" opacity="0.6" />
                <circle cx="170" cy="100" r="3" fill="#55E6FF" />
                <circle cx="30" cy="100" r="3" fill="#925CFF" />
              </g>
              <circle cx="100" cy="100" r="45" stroke="#925CFF" strokeWidth="1" fill="none" opacity="0.4" />
              <circle cx="100" cy="100" r="6" fill="#925CFF" />
              <circle cx="100" cy="100" r="2.5" fill="#55E6FF" />
            </svg>
          </div>

          <div className="flex items-start sm:items-center gap-4 relative z-10">
            {/* Cloud themed badge icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#55E6FF]/15 to-[#925CFF]/15 border border-[#55E6FF]/35 flex items-center justify-center text-[#55E6FF] shadow-inner shrink-0">
              <Cloud className="w-6 h-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D8C49A] font-semibold">
                  Student Community Chapter
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F5FF] tracking-tight leading-snug">
                {lead.role}
              </h3>
              <p className="text-xs sm:text-sm text-[#CCD0EB] font-normal mt-1 leading-relaxed">
                {lead.institution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
