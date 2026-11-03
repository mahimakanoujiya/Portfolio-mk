/**
 * Typewriter Component
 * Character-by-character typing & deleting animation with blinking cursor.
 * Features:
 * - Natural typing rhythm and faster erasing
 * - Zero layout shift with reserved bounding container
 * - Respects prefers-reduced-motion accessibility preference
 * - Robust cleanup on unmount
 */

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 85,
  deletingSpeed = 40,
  pauseDuration = 1800,
  className = '',
  cursorClassName = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (phrases.length === 0) return;

    // Reduced motion fallback: show first phrase statically
    if (prefersReducedMotion) {
      setDisplayText(phrases[0]);
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentPhrase.length) {
        // Slight natural jitter in typing speed for authentic feel
        const randomJitter = Math.floor(Math.random() * 25) - 12;
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, Math.max(25, typingSpeed + randomJitter));
      } else {
        // Finished typing full phrase, pause before erasing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  return (
    <span
      className={`inline-flex items-center min-h-[1.5em] align-middle select-none ${className}`}
      aria-label={phrases[phraseIndex % phrases.length]}
    >
      <span className="inline-block">{displayText}</span>
      <span
        aria-hidden="true"
        className={`inline-block w-[2px] h-[1em] ml-1 bg-[#55E6FF] shadow-[0_0_8px_#55E6FF] animate-[pulse_1s_infinite] align-middle ${cursorClassName}`}
      />
    </span>
  );
};
