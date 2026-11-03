/**
 * ProjectCard Component
 * Reusable card for Mahima's projects:
 * - Conditional Live Demo & GitHub action buttons (hidden when URL is null)
 * - Safe target="_blank" rel="noopener noreferrer" links
 * - Desktop tooltip styling & mobile-optimized touch targets with clear text labels
 * - Click anywhere to open project-details modal
 * - Interactive pointer lighting & subtle elevation
 */

import React from 'react';
import { ExternalLink, Github, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const isFeatured = project.featured;

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onOpenDetails(project)}
      className={`group relative rounded-2xl cursor-pointer transition-all duration-300 text-left overflow-hidden flex flex-col justify-between ${
        isFeatured
          ? 'col-span-1 lg:col-span-12 bg-gradient-to-br from-[#0c1026]/95 via-[#131838]/95 to-[#0c1026]/95 border-2 border-[#55E6FF]/40 hover:border-[#55E6FF] shadow-xl hover:shadow-2xl hover:shadow-[#55E6FF]/15 p-5 sm:p-7 md:p-8 backdrop-blur-sm'
          : 'bg-[#0c1026]/90 hover:bg-[#131838] border border-white/10 hover:border-[#55E6FF]/40 shadow-md hover:shadow-xl hover:shadow-[#55E6FF]/10 p-5 sm:p-6 backdrop-blur-sm'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails(project);
        }
      }}
      aria-label={`View details for ${project.name}`}
    >
      {/* Background ambient lighting for featured card */}
      {isFeatured && (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#55E6FF]/10 via-[#925CFF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#55E6FF]/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div>
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-wider text-[#55E6FF] uppercase font-semibold">
              {project.category}
            </span>
            {isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#925CFF]/20 border border-[#925CFF]/50 text-xs font-semibold text-[#D8C49A] shadow-sm">
                <Sparkles className="w-3 h-3 text-[#D8C49A]" />
                Featured Project
              </span>
            )}
          </div>

          {/* Quick Direct Actions on Top Row */}
          <div className="flex items-center gap-2">
            {/* Live Demo Action (Shown ONLY if liveUrl exists) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070817] hover:bg-[#55E6FF]/20 border border-[#55E6FF]/35 hover:border-[#55E6FF] text-[#55E6FF] text-xs font-medium transition-all shadow-sm"
                title={`Open Live Demo of ${project.name}`}
                aria-label={`Open Live Demo for ${project.name}`}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="inline">Live Demo</span>
              </a>
            )}

            {/* GitHub Repository Action (Shown ONLY if githubUrl exists) */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070817] hover:bg-white/10 border border-white/20 hover:border-[#55E6FF] text-[#CCD0EB] hover:text-[#55E6FF] text-xs font-medium transition-all shadow-sm"
                title={`Open GitHub repository for ${project.name}`}
                aria-label={`Open GitHub repository for ${project.name}`}
              >
                <Github className="w-3 h-3" />
                <span className="inline">GitHub</span>
              </a>
            )}

            {/* View Details Icon */}
            <div
              className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#55E6FF]/20 flex items-center justify-center text-[#CCD0EB] group-hover:text-[#55E6FF] transition-colors ml-1"
              title="Click card to view details"
            >
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Project Title & Subtitle */}
        <div className="mb-2.5">
          <h3
            className={`font-display font-bold text-[#F5F5FF] tracking-tight group-hover:text-[#55E6FF] transition-colors ${
              isFeatured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            {project.name}
          </h3>
          {project.subtitle && (
            <p className="text-xs font-medium text-[#D4D7EE] mt-0.5">{project.subtitle}</p>
          )}
        </div>

        {/* Project Description */}
        <p
          className={`text-[#CCD0EB] leading-relaxed mb-4 sm:mb-5 ${
            isFeatured ? 'text-sm sm:text-base max-w-3xl' : 'text-xs sm:text-sm line-clamp-3'
          }`}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom Section: Technology Tags & Interactive Cue */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center gap-1 font-mono rounded-md ${
                isFeatured
                  ? 'px-2.5 py-1 text-xs bg-[#070817] border border-[#55E6FF]/30 text-[#55E6FF]'
                  : 'px-2 py-0.5 text-[11px] bg-[#070817]/80 border border-white/10 text-[#CCD0EB]'
              }`}
            >
              <span className="w-1 h-1 rounded-full bg-[#55E6FF]" />
              {tech}
            </span>
          ))}
        </div>

        <span className="text-[11px] font-mono text-[#CCD0EB] group-hover:text-[#55E6FF] transition-colors flex items-center gap-1">
          <span>View Details</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};
