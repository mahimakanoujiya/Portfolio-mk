/**
 * ThemeCustomizer — Interactive palette and preset controller
 * Supports Cyber Nebula (default), Emerald Dimension, Cosmic Rose,
 * plus custom hex pickers for Primary, Secondary, Accent, and Background colors.
 * Persists changes in localStorage and updates CSS variables in real time.
 */

import React, { useState } from 'react';
import { X, RotateCcw, Palette, Check, Sparkles, Sliders } from 'lucide-react';
import { ThemeColors, THEME_PRESETS, applyThemeToDOM, saveTheme } from '../data/themes';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeColors;
  onThemeChange: (theme: ThemeColors) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');

  if (!isOpen) return null;

  const handleSelectPreset = (presetKey: string) => {
    const preset = THEME_PRESETS[presetKey];
    if (preset) {
      applyThemeToDOM(preset);
      saveTheme(preset);
      onThemeChange(preset);
    }
  };

  const handleCustomColorChange = (key: 'primary' | 'secondary' | 'accent' | 'bgPrimary', value: string) => {
    const updatedTheme: ThemeColors = {
      ...currentTheme,
      id: 'custom-user-theme',
      name: 'Custom Theme',
      [key]: value,
      // Adapt surface and glows dynamically
      bgSurface: key === 'bgPrimary' ? adjustBrightness(value, 10) : currentTheme.bgSurface,
      bgSurfaceElevated: key === 'bgPrimary' ? adjustBrightness(value, 18) : currentTheme.bgSurfaceElevated,
      borderSubtle: key === 'primary' ? `${value}33` : currentTheme.borderSubtle,
      borderActive: key === 'secondary' ? `${value}77` : currentTheme.borderActive,
      glowPrimary: key === 'primary' ? `${value}44` : currentTheme.glowPrimary,
      glowSecondary: key === 'secondary' ? `${value}33` : currentTheme.glowSecondary,
    };
    applyThemeToDOM(updatedTheme);
    saveTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const handleReset = () => {
    const defaultTheme = THEME_PRESETS['cyber-nebula'];
    applyThemeToDOM(defaultTheme);
    saveTheme(defaultTheme);
    onThemeChange(defaultTheme);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0c1026] border border-[#55E6FF]/35 rounded-2xl p-6 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#55E6FF]/15 border border-[#55E6FF]/35 flex items-center justify-center text-[#55E6FF]">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 id="theme-modal-title" className="font-display font-semibold text-base text-[#F5F5FF]">
                Visual Universe Customizer
              </h3>
              <p className="text-[11px] text-[#CCD0EB]">
                Personalize the Cyber Nebula atmosphere
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#CCD0EB] hover:text-[#F5F5FF] hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55E6FF]"
            aria-label="Close palette selector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-4 p-1 bg-[#070817] rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'presets'
                ? 'bg-[#55E6FF]/15 text-[#55E6FF] border border-[#55E6FF]/40 shadow-sm'
                : 'text-[#CCD0EB] hover:text-[#F5F5FF]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Theme Presets
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'custom'
                ? 'bg-[#55E6FF]/15 text-[#55E6FF] border border-[#55E6FF]/40 shadow-sm'
                : 'text-[#CCD0EB] hover:text-[#F5F5FF]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Custom Palette
          </button>
        </div>

        {/* Live Swatch Preview */}
        <div className="mt-4 p-3 rounded-xl bg-[#070817] border border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-[#CCD0EB]">ACTIVE PALETTE</span>
            <span className="text-xs font-semibold text-[#F5F5FF]">{currentTheme.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: currentTheme.primary }}
              title={`Primary: ${currentTheme.primary}`}
            />
            <div
              className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: currentTheme.secondary }}
              title={`Secondary: ${currentTheme.secondary}`}
            />
            <div
              className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: currentTheme.accent }}
              title={`Accent: ${currentTheme.accent}`}
            />
            <div
              className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: currentTheme.bgPrimary }}
              title={`Background: ${currentTheme.bgPrimary}`}
            />
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === 'presets' ? (
          <div className="mt-4 space-y-2.5">
            {Object.values(THEME_PRESETS).map((preset) => {
              const isSelected = currentTheme.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#55E6FF]/15 border-[#55E6FF] shadow-md shadow-[#55E6FF]/10'
                      : 'bg-[#070817]/60 border-white/10 hover:border-[#55E6FF]/40 hover:bg-[#070817]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-1.5">
                      <div
                        className="w-4 h-4 rounded-full border border-black/40"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-black/40"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-black/40"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F5F5FF]">{preset.name}</div>
                      <div className="text-[10px] text-[#CCD0EB]">
                        {preset.id === 'cyber-nebula' && 'Midnight Navy, Electric Violet & Icy Cyan'}
                        {preset.id === 'emerald-dimension' && 'Emerald & Seafoam Mint'}
                        {preset.id === 'cosmic-rose' && 'Cosmic Pink & Coral Rose'}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#55E6FF]" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#CCD0EB] mb-1">
                <span>Primary Accent</span>
                <span className="font-mono text-[11px] text-[#55E6FF]">{currentTheme.primary}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.primary}
                  onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/20 p-0"
                />
                <input
                  type="text"
                  value={currentTheme.primary}
                  onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                  className="flex-1 bg-[#070817] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5FF] font-mono focus:outline-none focus:border-[#55E6FF]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#CCD0EB] mb-1">
                <span>Secondary Highlights</span>
                <span className="font-mono text-[11px] text-[#55E6FF]">{currentTheme.secondary}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.secondary}
                  onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/20 p-0"
                />
                <input
                  type="text"
                  value={currentTheme.secondary}
                  onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                  className="flex-1 bg-[#070817] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5FF] font-mono focus:outline-none focus:border-[#55E6FF]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#CCD0EB] mb-1">
                <span>Accent Detail</span>
                <span className="font-mono text-[11px] text-[#55E6FF]">{currentTheme.accent}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.accent}
                  onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/20 p-0"
                />
                <input
                  type="text"
                  value={currentTheme.accent}
                  onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                  className="flex-1 bg-[#070817] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5FF] font-mono focus:outline-none focus:border-[#55E6FF]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#CCD0EB] mb-1">
                <span>Space Background</span>
                <span className="font-mono text-[11px] text-[#55E6FF]">{currentTheme.bgPrimary}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.bgPrimary}
                  onChange={(e) => handleCustomColorChange('bgPrimary', e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/20 p-0"
                />
                <input
                  type="text"
                  value={currentTheme.bgPrimary}
                  onChange={(e) => handleCustomColorChange('bgPrimary', e.target.value)}
                  className="flex-1 bg-[#070817] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5FF] font-mono focus:outline-none focus:border-[#55E6FF]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-[#CCD0EB] hover:text-[#55E6FF] px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Cyber Nebula
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#925CFF] to-[#55E6FF] text-[#070817] font-bold shadow-sm hover:scale-[1.02] transition-all"
          >
            Apply & Done
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate a subtle surface shade from background hex
function adjustBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return hex;
  const num = parseInt(cleanHex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
