import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Type,
  Eye,
  Globe,
  Settings2,
  X,
  Sparkles,
  Check
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { SUPPORTED_LANGUAGES } from '../data/patients';

export const AccessibilityBar = () => {
  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    audioNarration,
    setAudioNarration,
    selectedLanguage,
    changeLanguage,
    playAudio,
    t
  } = useDemo();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Button on Bottom-Right */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl border border-slate-700 font-bold text-xs cursor-pointer transition-all hover:scale-105"
          title="Accessibility & Language Preferences"
        >
          <Settings2 className="w-4 h-4 text-teal-400 animate-spin-slow" />
          <span className="hidden sm:inline">Accessibility</span>
          <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-mono">
            {selectedLanguage.toUpperCase()}
          </span>
        </button>
      </div>

      {/* Slide-Up / Floating Panel */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 z-50 flex items-end sm:items-auto justify-center bg-black/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-4 sm:p-0">
          <div className="w-full sm:w-80 bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 text-slate-800 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Accessibility & Speech</h3>
                  <p className="text-[10px] text-slate-500">Touch & Voice friendly settings</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Font Size Scaling */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-blue-600" />
                <span>Text Size (અક્ષરનું કદ / आकार)</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'normal', label: 'Normal (100%)' },
                  { id: 'large', label: 'Large (115%)' },
                  { id: 'xlarge', label: 'XL (130%)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTextSize(opt.id)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      textSize === opt.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Mode */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-purple-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">High Contrast UI</p>
                  <p className="text-[10px] text-slate-500">Enhanced contrast borders</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  highContrast ? 'bg-purple-600' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Audio Speech Narration Toggle */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                {audioNarration ? (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                )}
                <div>
                  <p className="text-xs font-bold text-slate-800">Voice Readout & Audio</p>
                  <p className="text-[10px] text-slate-500">Speaks instructions aloud</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAudioNarration(!audioNarration);
                  if (!audioNarration) playAudio("Voice narration is now enabled.");
                }}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  audioNarration ? 'bg-emerald-600' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    audioNarration ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language Selection */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-600" />
                <span>Primary Language (ભાષા)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    className={`py-2 px-2.5 rounded-xl text-xs flex items-center justify-between font-semibold transition-all ${
                      selectedLanguage === lang.code
                        ? 'bg-cyan-50 border border-cyan-300 text-cyan-900 font-bold'
                        : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    {selectedLanguage === lang.code && (
                      <Check className="w-3.5 h-3.5 text-cyan-700" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playAudio();
                setIsOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Test Audio & Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
