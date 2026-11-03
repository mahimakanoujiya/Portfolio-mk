/**
 * Experience Section — Real-World Experience with GreenBasket
 * Honest framing: practical exposure to an e-commerce platform without claiming complete solo development.
 * Working external link to https://greenbasketshop.in and editable contribution field.
 */

import React from 'react';
import { Briefcase, ExternalLink, Sparkles, Sprout, ShoppingBag, Layers, AlertCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Experience: React.FC = () => {
  const exp = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="py-14 sm:py-20 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/30 text-xs font-mono text-[#55E6FF] mb-3">
            <Briefcase className="w-3.5 h-3.5 text-[#55E6FF]" />
            <span>PRACTICAL EXPOSURE</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F5F5FF] tracking-tight mb-3">
            Real-World Experience
          </h2>
          <p className="text-[#CCD0EB] text-sm sm:text-base leading-relaxed">
            Hands-on exposure to production digital platforms and real-world commercial workflows.
          </p>
        </div>

        {/* Feature Experience Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0c1026] via-[#101430] to-[#0c1026] border border-[#55E6FF]/25 hover:border-[#55E6FF]/50 rounded-2xl p-6 sm:p-9 shadow-2xl relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#55E6FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Brand & External Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981]/20 to-[#55E6FF]/20 border border-[#10B981]/40 flex items-center justify-center text-[#34D399] shadow-inner">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-2xl text-[#F5F5FF]">
                    {exp.company}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[11px] font-medium text-[#34D399]">
                    <ShoppingBag className="w-3 h-3" />
                    Live Platform
                  </span>
                </div>
                <p className="text-xs text-[#CCD0EB] font-mono mt-0.5">
                  {exp.role} • {exp.period}
                </p>
              </div>
            </div>

            {/* Visit Website Button */}
            <a
              href={exp.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#55E6FF] text-[#070817] font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Description & Contribution */}
          <div className="py-6 space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#55E6FF] mb-2 font-semibold">
                Platform Overview
              </h4>
              <p className="text-sm sm:text-base text-[#F5F5FF] leading-relaxed">
                {exp.description}
              </p>
            </div>

            {/* My Contribution Section (Editable Placeholder) */}
            <div className="p-5 rounded-xl bg-[#070817]/70 border border-[#55E6FF]/20 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#D8C49A] flex items-center gap-2 font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  My Contribution
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D8C49A]/20 text-[#D8C49A] border border-[#D8C49A]/30">
                  Editable Field
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#CCD0EB] leading-relaxed">
                {exp.contribution}
              </p>
            </div>
          </div>

          {/* Technology & Exposure Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#070817] border border-white/10 text-xs font-mono text-[#CCD0EB]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#CCD0EB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="font-mono text-[11px]">Real-World Exposure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
