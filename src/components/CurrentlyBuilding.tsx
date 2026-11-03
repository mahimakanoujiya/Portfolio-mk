/**
 * CurrentlyBuilding Section — SpeakSphere (Work In Progress)
 * Kept strictly separate from the five main projects.
 * Features distinctive "work in progress" cyber-aesthetic styling and working GitHub link.
 */

import React from 'react';
import { Hammer, Github, Radio, Activity, AlertCircle, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const CurrentlyBuilding: React.FC = () => {
  const item = PORTFOLIO_DATA.currentlyBuilding;

  return (
    <section id="currently-building" className="py-14 sm:py-20 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#55E6FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/40 text-xs font-mono text-[#55E6FF] mb-3">
            <Radio className="w-3.5 h-3.5 text-[#55E6FF] animate-pulse" />
            <span>ACTIVE PROTOTYPING LAB</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F5F5FF] tracking-tight mb-3">
            Currently Building
          </h2>
          <p className="text-[#CCD0EB] text-sm sm:text-base leading-relaxed">
            What's presently on my development desk — experiments under active research and crafting.
          </p>
        </div>

        {/* Distinctive Work-In-Progress Card */}
        <div className="max-w-3xl mx-auto relative rounded-2xl p-[1.5px] bg-gradient-to-r from-[#55E6FF]/60 via-[#925CFF]/60 to-[#55E6FF]/60 shadow-2xl shadow-[#55E6FF]/10">
          <div className="bg-[#0c1026] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Holographic grid scan line effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(85,230,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(85,230,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Bar with Live In-Development Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#55E6FF]/15 border border-[#55E6FF]/40 flex items-center justify-center text-[#55E6FF] shadow-inner">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display font-bold text-2xl text-[#F5F5FF]">
                      {item.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D8C49A]/20 border border-[#D8C49A]/40 text-[11px] font-semibold text-[#D8C49A]">
                      <Hammer className="w-3 h-3" />
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#CCD0EB] font-mono mt-0.5">
                    Voice & Speech Interaction Prototype
                  </p>
                </div>
              </div>

              {/* GitHub Link */}
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#070817] hover:bg-[#55E6FF]/15 border border-white/20 hover:border-[#55E6FF] text-[#F5F5FF] hover:text-[#55E6FF] text-xs font-medium transition-all shadow-md"
              >
                <Github className="w-4 h-4 text-[#CCD0EB]" />
                <span>View Repository</span>
              </a>
            </div>

            {/* Content & Description */}
            <div className="py-6 space-y-4 relative z-10">
              <p className="text-sm sm:text-base text-[#F5F5FF] leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#070817]/80 border border-[#55E6FF]/25 text-xs text-[#CCD0EB]">
                <AlertCircle className="w-4 h-4 text-[#55E6FF] shrink-0 mt-0.5" />
                <span>
                  This initiative is in early prototyping and actively evolving on GitHub. Live deployment will be published upon completing core milestones.
                </span>
              </div>

              {/* Active Development Signal Indicator */}
              <div className="py-2.5 px-4 rounded-xl bg-[#070817]/90 border border-[#55E6FF]/20 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-[#55E6FF]">
                  <Terminal className="w-3.5 h-3.5 text-[#55E6FF]" />
                  <span className="text-[11px] text-[#CCD0EB]">active branch:</span>
                  <span className="text-[#F5F5FF]">main</span>
                  <span className="text-[#55E6FF] animate-pulse">_</span>
                </div>
                {/* Animated vocal frequency bars */}
                <div className="flex items-center gap-1" title="Real-time speech processing prototype pipeline">
                  <span className="w-1 h-2.5 bg-[#55E6FF] rounded-full animate-[pulse_1.2s_infinite]" />
                  <span className="w-1 h-5 bg-[#925CFF] rounded-full animate-[pulse_0.8s_infinite]" />
                  <span className="w-1 h-2 bg-[#55E6FF] rounded-full animate-[pulse_1.5s_infinite]" />
                  <span className="w-1 h-4 bg-[#D8C49A] rounded-full animate-[pulse_1.0s_infinite]" />
                  <span className="w-1 h-3 bg-[#925CFF] rounded-full animate-[pulse_0.9s_infinite]" />
                </div>
              </div>
            </div>

            {/* Tags Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-[#070817] border border-white/10 text-xs font-mono text-[#55E6FF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#D8C49A]">
                <span className="w-2 h-2 rounded-full bg-[#D8C49A] animate-ping" />
                <span>Sprint in progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
