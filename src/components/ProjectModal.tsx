/**
 * ProjectModal — Detailed, accessible project popup
 * Features verified links only, hides missing links, and never uses empty '#' hrefs.
 */

import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Sparkles, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-name"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0c1026] border border-[#55E6FF]/35 rounded-2xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#55E6FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono tracking-wider text-[#55E6FF] uppercase font-semibold">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#925CFF]/20 border border-[#925CFF]/45 text-[10px] font-semibold text-[#D8C49A]">
                    <Sparkles className="w-2.5 h-2.5" />
                    Featured
                  </span>
                )}
              </div>
              <h3 id="project-modal-name" className="font-display font-bold text-2xl sm:text-3xl text-[#F5F5FF]">
                {project.name}
              </h3>
              {project.subtitle && (
                <p className="text-xs text-[#CCD0EB] mt-0.5">{project.subtitle}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#CCD0EB] hover:text-[#F5F5FF] hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-6 space-y-5 overflow-y-auto max-h-[50vh] pr-1">
            {/* Primary description */}
            <div className="text-sm sm:text-base text-[#F5F5FF] leading-relaxed">
              {project.description}
            </div>

            {project.fullDetails && (
              <p className="text-xs sm:text-sm text-[#CCD0EB] leading-relaxed bg-[#070817]/70 p-4 rounded-xl border border-white/10">
                {project.fullDetails}
              </p>
            )}

            {/* Placeholder description notice if applicable */}
            {project.isPlaceholderDescription && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070817] border border-[#D8C49A]/30 text-xs text-[#D8C49A]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  This project description is an editable placeholder awaiting repository/live verification.
                </span>
              </div>
            )}

            {/* Verified Technology Tags */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#CCD0EB] block mb-2.5">
                Verified Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#070817] border border-[#55E6FF]/30 text-xs font-mono text-[#55E6FF]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#55E6FF]" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-4 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Live Demo Button — Rendered ONLY if real live URL exists */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#925CFF] to-[#55E6FF] text-[#070817] font-semibold text-xs transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* GitHub Repository Button — Rendered ONLY if real repo URL exists */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#070817] hover:bg-white/10 border border-white/20 hover:border-[#55E6FF] text-[#F5F5FF] text-xs font-medium transition-colors"
              >
                <Github className="w-4 h-4 text-[#CCD0EB]" />
                <span>GitHub Repository</span>
              </a>
            )}

            {/* Notice if neither link is available yet */}
            {!project.liveUrl && !project.githubUrl && (
              <span className="text-xs text-[#CCD0EB] italic">
                External repository / live URL will appear once confirmed.
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-[#CCD0EB] hover:text-[#F5F5FF] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
