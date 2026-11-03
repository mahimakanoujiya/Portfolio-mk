/**
 * Contact Section — "Let's Connect"
 * Features:
 * - Direct verified links: Email, GitHub, LinkedIn, Instagram (NO phone/whatsapp)
 * - Validated contact form that generates a clean mailto link
 * - Transparent notice that no backend is pretended: visitor's default email client is opened.
 * - One-click clipboard copy for email.
 */

import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const contact = PORTFOLIO_DATA.personal.contact;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Correctly encoded mailto URL
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Mahima,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent via Mahima Kanoujiya Portfolio Contact Form`
    );
    const mailtoUrl = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    setSubmittedFeedback(true);
    // Open visitor's default email client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmittedFeedback(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#925CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1026] border border-[#55E6FF]/30 text-xs font-mono text-[#55E6FF] mb-3">
            <Mail className="w-3.5 h-3.5 text-[#55E6FF]" />
            <span>DIRECT COMMUNICATION</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F5F5FF] tracking-tight mb-3">
            Let's Connect
          </h2>
          <p className="text-[#CCD0EB] text-sm sm:text-base leading-relaxed">
            Have an idea, a project, or an opportunity to discuss? I'd be happy to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
          {/* Left Column: Direct Links & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#0c1026]/90 border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl">
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#F5F5FF] mb-2">
                Get in Touch
              </h3>
              <p className="text-xs sm:text-sm text-[#CCD0EB] leading-relaxed mb-6">
                Whether you'd like to collaborate on an AI/ML prototype, discuss a student hackathon, or explore opportunities, feel free to reach out directly.
              </p>

              {/* Exact contact links list */}
              <div className="space-y-3.5">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070817] border border-[#55E6FF]/25 hover:border-[#55E6FF]/50 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-[#55E6FF]/15 flex items-center justify-center text-[#55E6FF] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono uppercase text-[#CCD0EB] block">Email</span>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xs sm:text-sm font-medium text-[#F5F5FF] hover:text-[#55E6FF] truncate block transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-[#CCD0EB] hover:text-[#55E6FF] hover:bg-white/5 transition-colors shrink-0"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#55E6FF]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* GitHub Item */}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#070817] border border-white/10 hover:border-[#55E6FF]/50 hover:bg-[#131838] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#55E6FF]/20 flex items-center justify-center text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#CCD0EB] block">GitHub</span>
                      <span className="text-xs sm:text-sm font-medium text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
                        github.com/mahimakanoujiya
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#CCD0EB] group-hover:text-[#55E6FF] group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* LinkedIn Item */}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#070817] border border-white/10 hover:border-[#55E6FF]/50 hover:bg-[#131838] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#55E6FF]/20 flex items-center justify-center text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#CCD0EB] block">LinkedIn</span>
                      <span className="text-xs sm:text-sm font-medium text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
                        linkedin.com/in/mahima-kanoujiya
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#CCD0EB] group-hover:text-[#55E6FF] group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Instagram Item */}
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#070817] border border-white/10 hover:border-[#55E6FF]/50 hover:bg-[#131838] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#55E6FF]/20 flex items-center justify-center text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#CCD0EB] block">Instagram</span>
                      <span className="text-xs sm:text-sm font-medium text-[#F5F5FF] group-hover:text-[#55E6FF] transition-colors">
                        @gloryy_13_
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#CCD0EB] group-hover:text-[#55E6FF] group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* Note regarding direct contacts */}
            <div className="p-4 rounded-xl bg-[#0c1026]/70 border border-white/10 text-[11px] text-[#CCD0EB] flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55E6FF] shrink-0 mt-1" />
              <span>
                Personal contact channels are verified above. No phone or WhatsApp numbers are publicized.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#0c1026]/95 border border-[#55E6FF]/25 rounded-2xl p-7 sm:p-9 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#55E6FF]" />
                <h3 className="font-display font-semibold text-xl text-[#F5F5FF]">
                  Send a Direct Message
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#CCD0EB] mb-6">
                Fill in the details below to generate an email directly addressed to Mahima Kanoujiya.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-[#F5F5FF] mb-1.5">
                    Your Name <span className="text-[#55E6FF]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Alex Sharma"
                    className={`w-full bg-[#070817] border rounded-xl px-4 py-3 text-sm text-[#F5F5FF] placeholder-[#CCD0EB]/40 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-white/15 focus:border-[#55E6FF]'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-[#F5F5FF] mb-1.5">
                    Your Email Address <span className="text-[#55E6FF]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@organization.com"
                    className={`w-full bg-[#070817] border rounded-xl px-4 py-3 text-sm text-[#F5F5FF] placeholder-[#CCD0EB]/40 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-white/15 focus:border-[#55E6FF]'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#F5F5FF] mb-1.5">
                    Message <span className="text-[#55E6FF]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell me about your idea, collaboration concept, or project..."
                    className={`w-full bg-[#070817] border rounded-xl px-4 py-3 text-sm text-[#F5F5FF] placeholder-[#CCD0EB]/40 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-400 focus:border-red-500' : 'border-white/15 focus:border-[#55E6FF]'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#925CFF] to-[#55E6FF] text-[#070817] font-bold text-sm shadow-lg shadow-[#925CFF]/25 hover:shadow-[#55E6FF]/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via Email Client</span>
                </button>
              </form>
            </div>

            {/* Transparent mailto Notice */}
            <div className="pt-4 mt-6 border-t border-white/10 flex items-start gap-2.5 text-xs text-[#CCD0EB]">
              <AlertCircle className="w-4 h-4 text-[#55E6FF] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Clicking <strong className="text-[#F5F5FF]">Send Message</strong> will launch your device's default email client with your text pre-composed to <code className="text-[#55E6FF] font-mono">{contact.email}</code>. No third-party server intercepts your communication.
              </p>
            </div>

            {submittedFeedback && (
              <div className="mt-3 p-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-xs text-[#34D399] flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>Default mail app triggered! If it didn't open automatically, use the copy email button on the left.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
