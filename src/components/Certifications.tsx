/**
 * Certifications & Learning Section
 * Displays exactly 10 earned certificates in exact specified order:
 * 1. HCL — Certified UI/UX and VI Designer (Prominent)
 * 2. Great Learning — Network Security Course (Prominent)
 * 3. TCS iON — AI Foundation Certification (Prominent)
 * 4. Skill India — Network Security Engineer Certification
 * 5. be10x — AI Workshop Certification
 * 6. Great Learning — Financial Accounting Course
 * 7. SoloLearn — Prompt Engineering
 * 8. SoloLearn — Robotics & AI
 * 9. SoloLearn — SEO with AI
 * 10. SoloLearn — ChatGPT for Marketing
 *
 * Strict visual hierarchy: Top 3 cards receive elevated prominence.
 */

import React from 'react';
import {
  Award,
  ShieldCheck,
  Palette,
  Cpu,
  Brain,
  Terminal,
  Search,
  Zap,
  BarChart2,
  Sparkles,
  Bot,
} from 'lucide-react';
import { PORTFOLIO_DATA, CertificateItem } from '../data/portfolio';

export const Certifications: React.FC = () => {
  const certificates = PORTFOLIO_DATA.certifications;

  const getCertIcon = (id: string) => {
    switch (id) {
      case 'hcl-ui-ux':
        return <Palette className="w-4 h-4 text-[#55E6FF]" />;
      case 'great-learning-net-sec':
      case 'skill-india-net-sec':
        return <ShieldCheck className="w-4 h-4 text-[#C4B5FD]" />;
      case 'tcs-ion-ai-foundation':
        return <Cpu className="w-4 h-4 text-[#55E6FF]" />;
      case 'be10x-ai-workshop':
        return <Brain className="w-4 h-4 text-[#D8C49A]" />;
      case 'great-learning-fin-acct':
        return <BarChart2 className="w-4 h-4 text-[#C4B5FD]" />;
      case 'sololearn-prompt-eng':
        return <Terminal className="w-4 h-4 text-[#55E6FF]" />;
      case 'sololearn-robotics-ai':
        return <Bot className="w-4 h-4 text-[#D8C49A]" />;
      case 'sololearn-seo-ai':
        return <Search className="w-4 h-4 text-[#C4B5FD]" />;
      case 'sololearn-chatgpt-marketing':
        return <Zap className="w-4 h-4 text-[#55E6FF]" />;
      default:
        return <Award className="w-4 h-4 text-[#55E6FF]" />;
    }
  };

  const prominentCerts = certificates.slice(0, 3);
  const standardCerts = certificates.slice(3);

  return (
    <section id="certifications" className="py-12 sm:py-16 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#925CFF]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#55E6FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/35 text-xs font-mono text-[#55E6FF] mb-2.5">
            <Award className="w-3.5 h-3.5 text-[#55E6FF]" />
            <span>CREDENTIALS & COURSES</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F5FF] tracking-tight mb-2">
            Certifications & Learning
          </h2>
          <p className="text-xs sm:text-sm text-[#CCD0EB]">
            Verified course certifications across design, security, and artificial intelligence.
          </p>
        </div>

        {/* Tier 1: Top 3 Most Prominent Certificates */}
        <div className="mb-4 sm:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prominentCerts.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-[#0c1026]/95 via-[#121638]/90 to-[#0c1026]/95 border-2 border-[#55E6FF]/35 hover:border-[#55E6FF] rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-[#55E6FF]/15 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Subtle top glow bar for prominent cards */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#55E6FF] via-[#925CFF] to-[#55E6FF]" />

                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#070817] border border-[#55E6FF]/40 flex items-center justify-center shadow-inner">
                      {getCertIcon(cert.id)}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#925CFF]/20 border border-[#925CFF]/40 text-[10px] font-mono text-[#D8C49A] font-semibold">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  </div>

                  <span className="text-[11px] font-mono font-semibold tracking-wider text-[#55E6FF] uppercase block mb-1">
                    {cert.issuer}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F5FF] leading-snug group-hover:text-[#55E6FF] transition-colors">
                    {cert.title}
                  </h3>
                </div>

                <div className="pt-3.5 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#CCD0EB]">
                  <span className="font-mono text-[10px] text-[#55E6FF]">0{index + 1} // Completed</span>
                  <span className="text-[#55E6FF] font-medium">Earned Certificate</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Remaining 7 Certificates in Clean Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {standardCerts.map((cert, index) => (
            <div
              key={cert.id}
              className="bg-[#0c1026]/90 hover:bg-[#131838] border border-white/10 hover:border-[#55E6FF]/45 rounded-xl p-4 sm:p-4.5 shadow-md hover:shadow-lg hover:shadow-[#55E6FF]/10 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#070817] border border-white/10 flex items-center justify-center">
                    {getCertIcon(cert.id)}
                  </div>
                  <span className="text-[10px] font-mono text-[#CCD0EB]">
                    0{index + 4}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-[#55E6FF] uppercase tracking-wide block mb-0.5 font-medium">
                  {cert.issuer}
                </span>
                <h4 className="font-display font-semibold text-xs sm:text-sm text-[#F5F5FF] leading-snug">
                  {cert.title}
                </h4>
              </div>

              <div className="pt-2.5 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-[#CCD0EB]">
                <span className="font-mono text-[#CCD0EB]">Course Cert</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#55E6FF]/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
