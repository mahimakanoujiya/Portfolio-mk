/**
 * Mahima Kanoujiya | Digital Portfolio
 * Main Application Orchestrator
 */

import React, { useState, useEffect } from 'react';
import { loadSavedTheme, applyThemeToDOM, ThemeColors } from './data/themes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Leadership } from './components/Leadership';
import { OngoingPrograms } from './components/OngoingPrograms';
import { Certifications } from './components/Certifications';
import { CurrentlyBuilding } from './components/CurrentlyBuilding';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CosmicBackground } from './components/CosmicBackground';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [theme, setTheme] = useState<ThemeColors>(() => loadSavedTheme());
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Apply initial theme on mount
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#070817] text-[#F5F5FF] relative selection:bg-[#925CFF]/30 selection:text-[#55E6FF]">
      {/* Continuous Cyber Nebula Background extending across all sections */}
      <CosmicBackground theme={theme} />

      {/* Sticky Navigation */}
      <Navbar
        onOpenThemeCustomizer={() => setIsThemeCustomizerOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Interactive 3D Orbital World */}
        <Hero theme={theme} />

        {/* About Section: Beyond the Code */}
        <About />

        {/* Projects Section: Things I've Built (Exact 5 in Order) */}
        <Projects />

        {/* Skills Section: My Tech Toolkit */}
        <Skills />

        {/* Experience Section: GreenBasket */}
        <Experience />

        {/* Leadership Section */}
        <Leadership />

        {/* Ongoing Programs Section */}
        <OngoingPrograms />

        {/* Certifications & Learning Section */}
        <Certifications />

        {/* Currently Building: SpeakSphere */}
        <CurrentlyBuilding />

        {/* Contact Section: Let's Connect */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Theme Customizer Modal Dialog */}
      <ThemeCustomizer
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
        currentTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
      />

      {/* Resume & Credentials Placeholder Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
