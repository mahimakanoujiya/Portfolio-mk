/**
 * ResumeModal — Dialog presenting Mahima's verified resume PDF
 * Directly downloads and links to /Mahima_Kanoujiya_Resume.pdf
 */

import React, { useState } from 'react';
import { X, FileText, Download, Mail, Check, ExternalLink, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0c1026] border border-[#55E6FF]/35 rounded-2xl p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#55E6FF]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#55E6FF]/15 border border-[#55E6FF]/35 flex items-center justify-center text-[#55E6FF]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 id="resume-modal-title" className="font-display font-semibold text-lg text-[#F5F5FF]">
                Official Resume
              </h3>
              <p className="text-xs text-[#CCD0EB]">
                Mahima Kanoujiya — B.Tech CSE (AI & ML)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#CCD0EB] hover:text-[#F5F5FF] hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4 text-sm text-[#CCD0EB]">
          <div className="p-3.5 rounded-xl bg-[#070817] border border-[#55E6FF]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#55E6FF] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-[#CCD0EB]">
              <span className="font-semibold text-[#F5F5FF] block mb-1">
                Verified Document Ready
              </span>
              Download the official Curriculum Vitae PDF (<code className="text-[#55E6FF] font-mono">Mahima_Kanoujiya_Resume.pdf</code>) or view in a new browser tab.
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[#CCD0EB]">Education:</span>
              <span className="text-[#F5F5FF] font-medium text-right">
                B.Tech CSE (AI & ML) — 1st Year
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[#CCD0EB]">Institution:</span>
              <span className="text-[#F5F5FF] font-medium text-right">
                Centre for Advanced Studies, AKTU, Lucknow
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[#CCD0EB]">Focus:</span>
              <span className="text-[#55E6FF] font-medium text-right">
                AI & ML, Python/C++, Prompt Eng., UI/UX
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-white/10">
          <a
            href="/Mahima_Kanoujiya_Resume.pdf"
            download="Mahima_Kanoujiya_Resume.pdf"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#925CFF] to-[#55E6FF] text-[#070817] font-bold text-xs transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Download Mahima Kanoujiya Resume PDF"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>

          <a
            href="/Mahima_Kanoujiya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#070817] hover:bg-white/10 border border-white/20 hover:border-[#55E6FF] text-[#F5F5FF] font-medium text-xs transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#55E6FF]" />
            <span>Open in Tab</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#070817] hover:bg-white/10 border border-white/20 hover:border-[#55E6FF] text-[#F5F5FF] font-medium text-xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#55E6FF]" />
                <span className="text-[#55E6FF]">Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-[#CCD0EB]" />
                <span>Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
