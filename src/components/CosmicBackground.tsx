/**
 * CosmicBackground Component
 * Continuous Cyber Nebula atmosphere spanning the entire digital portfolio:
 * - Multi-layer twinkling starfield
 * - Slowly drifting electric violet & icy cyan cosmic particles
 * - Occasional dynamic shooting stars with glowing gradient trails
 * - Scroll-linked parallax depth
 * - Performance optimized: throttled on mobile, paused when tab hidden, zero-garbage render loop
 */

import React, { useEffect, useRef } from 'react';
import { ThemeColors } from '../data/themes';

interface CosmicBackgroundProps {
  theme: ThemeColors;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  color: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<ThemeColors>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resize handling
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    // Visibility handling to pause when tab is inactive
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        loop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Scroll parallax tracking
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize Stars
    const starCount = isMobile ? 65 : 160;
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.003 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.8 + 0.2, // Parallax depth factor
        });
      }
    };
    initStars();

    // Initialize Drifting Particles (Violet & Cyan)
    const particleCount = isMobile ? 18 : 38;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isCyan = i % 2 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1.0,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: isCyan ? themeRef.current.secondary : themeRef.current.primary,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.002 + 0.001,
      });
    }

    // Shooting Stars
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarSpawn = performance.now();
    const spawnInterval = isMobile ? 9000 : 5500; // spawn every 5-9s

    const spawnShootingStar = () => {
      if (prefersReducedMotion) return;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25; // ~45 deg
      shootingStars.push({
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.35),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 9 + 12,
        angle,
        alpha: 1.0,
        active: true,
        color: Math.random() > 0.4 ? themeRef.current.secondary : themeRef.current.primary,
      });
    };

    let lastTime = performance.now();

    const loop = () => {
      if (!isVisible) return;

      const now = performance.now();
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      // Smooth scroll parallax
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Spawn shooting stars periodically
      if (now - lastShootingStarSpawn > spawnInterval + Math.random() * 3000) {
        spawnShootingStar();
        lastShootingStarSpawn = now;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background orbital curves
      const currentTheme = themeRef.current;
      ctx.save();
      ctx.strokeStyle = currentTheme.primary;
      ctx.globalAlpha = 0.04;
      ctx.lineWidth = 1;

      // Slow orbital ring 1
      ctx.beginPath();
      const orbitY1 = (height * 0.4 - scrollY * 0.05) % (height * 1.5);
      ctx.ellipse(width * 0.5, orbitY1, width * 0.6, height * 0.3, Math.PI / 12, 0, Math.PI * 2);
      ctx.stroke();

      // Slow orbital ring 2
      ctx.strokeStyle = currentTheme.secondary;
      ctx.globalAlpha = 0.035;
      ctx.beginPath();
      const orbitY2 = (height * 0.75 - scrollY * 0.08) % (height * 1.5);
      ctx.ellipse(width * 0.4, orbitY2, width * 0.7, height * 0.35, -Math.PI / 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 2. Render and twinkle Stars with parallax
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Calculate parallax Y
        const parallaxY = (star.y - scrollY * star.depth * 0.15) % height;
        const actualY = parallaxY < 0 ? parallaxY + height : parallaxY;

        // Twinkle calculation
        const twinkle = Math.sin(now * star.twinkleSpeed + star.twinkleOffset);
        const alpha = Math.max(0.08, star.baseAlpha + twinkle * 0.35);

        ctx.fillStyle = i % 4 === 0 ? currentTheme.secondary : '#FFFFFF';
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, actualY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render Drifting Nebula Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const parallaxY = (p.y - scrollY * 0.1) % height;
        const actualY = parallaxY < 0 ? parallaxY + height : parallaxY;

        const pulse = Math.sin(now * p.pulseSpeed + i);
        const currentAlpha = Math.max(0.12, p.alpha + pulse * 0.2);

        // Particle Glow
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        const color = i % 2 === 0 ? currentTheme.secondary : currentTheme.primary;
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(p.x, actualY, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo on larger particles (skipped on mobile for performance)
        if (!isMobile && p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, actualY, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = currentAlpha * 0.18;
          ctx.fill();
        }
        ctx.restore();
      }

      // 4. Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.014;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          s.active = false;
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.6, s.color);
        grad.addColorStop(1, '#FFFFFF');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = Math.max(0, s.alpha);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Bright head point
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle soft cosmic nebula glows in corners - reduced intensity for crisp text contrast */}
      <div
        className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: theme.primary }}
      />
      <div
        className="absolute top-3/4 -right-48 w-[500px] h-[500px] rounded-full blur-[160px] opacity-12 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: theme.secondary }}
      />
    </div>
  );
};
