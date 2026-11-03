/**
 * Skills Section — "My Tech Toolkit"
 * Organized strictly by editable categories without fake progress bars or percentages.
 * Features elegant interactive tags and category filtering.
 */

import React, { useState } from 'react';
import {
  Code,
  Cpu,
  Globe,
  Terminal,
  Palette,
  CheckCircle2,
  Sparkles,
  Filter,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = PORTFOLIO_DATA.skillCategories;
  const categoryNames = ['All', ...categories.map((c) => c.title)];

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Programming Languages':
        return <Code className="w-4 h-4 text-[#55E6FF]" />;
      case 'AI & Machine Learning':
        return <Cpu className="w-4 h-4 text-[#925CFF]" />;
      case 'Web Development':
        return <Globe className="w-4 h-4 text-[#55E6FF]" />;
      case 'Tools & Platforms':
        return <Terminal className="w-4 h-4 text-[#D8C49A]" />;
      case 'Creative & Productivity Tools':
        return <Palette className="w-4 h-4 text-[#C4B5FD]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#55E6FF]" />;
    }
  };

  const filteredCategories =
    selectedCategory === 'All'
      ? categories
      : categories.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" className="py-14 sm:py-20 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#925CFF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/30 text-xs font-mono text-[#55E6FF] mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#55E6FF]" />
            <span>KNOWLEDGE ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F5F5FF] tracking-tight mb-3">
            My Tech Toolkit
          </h2>
          <p className="text-[#CCD0EB] text-sm sm:text-base leading-relaxed">
            Technologies, frameworks, and tools I actively practice, study, and apply in projects.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {categoryNames.map((catName) => {
            const isSelected = selectedCategory === catName;
            return (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#925CFF] text-white shadow-md shadow-[#925CFF]/25 border border-[#55E6FF]/50 scale-105'
                    : 'bg-[#0c1026] text-[#CCD0EB] hover:text-[#F5F5FF] border border-white/10 hover:border-[#55E6FF]/40'
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="bg-[#0c1026]/90 border border-white/10 hover:border-[#55E6FF]/40 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-[#55E6FF]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-[#070817] border border-[#55E6FF]/30 flex items-center justify-center">
                    {getCategoryIcon(category.title)}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-[#F5F5FF]">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-[#CCD0EB] leading-tight">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-default ${
                        skill.highlight
                          ? 'bg-[#070817] border border-[#55E6FF]/40 text-[#55E6FF] hover:border-[#55E6FF] hover:scale-105 hover:shadow-sm hover:shadow-[#55E6FF]/25'
                          : 'bg-[#070817]/80 border border-white/10 text-[#CCD0EB] hover:border-[#55E6FF]/35 hover:text-[#F5F5FF] hover:scale-105'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          skill.highlight ? 'bg-[#55E6FF]' : 'bg-[#925CFF]'
                        }`}
                      />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#CCD0EB]">
                <span className="font-mono">{category.skills.length} competencies</span>
                <span className="text-[#55E6FF]">Verified in Projects</span>
              </div>
            </div>
          ))}
        </div>

        {/* Anti-Fake-Progress-Bar Statement */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#CCD0EB] max-w-xl mx-auto italic">
            "Skills reflect genuine hands-on study, coursework, and prototype implementation.
            I value practical understanding over arbitrary percentage ratings."
          </p>
        </div>
      </div>
    </section>
  );
};
