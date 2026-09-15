import React from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const AudioInstructionBtn = ({ 
  label = "Play Audio Instructions", 
  text = null, 
  variant = "default", // 'default' | 'pill' | 'compact'
  className = "" 
}) => {
  const { playAudio, stopAudio, isAudioPlaying, selectedLanguage } = useDemo();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAudioPlaying) {
      stopAudio();
    } else {
      playAudio(text);
    }
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={isAudioPlaying ? "Stop Audio" : label}
        className={`p-2 rounded-xl border transition-all duration-150 inline-flex items-center justify-center ${
          isAudioPlaying
            ? 'bg-amber-100 text-amber-800 border-amber-300 ring-2 ring-amber-300 animate-pulse'
            : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100'
        } ${className}`}
        aria-label={label}
      >
        {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 ${
        isAudioPlaying
          ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-300 animate-pulse'
          : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-300 shadow-2xs'
      } ${className}`}
    >
      {isAudioPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-amber-700" />
          <span>Stop Voice Audio</span>
          <span className="flex gap-0.5 ml-1">
            <span className="w-1 h-3 bg-amber-600 rounded-full animate-wave-1" />
            <span className="w-1 h-3 bg-amber-600 rounded-full animate-wave-2" />
            <span className="w-1 h-3 bg-amber-600 rounded-full animate-wave-3" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-teal-700" />
          <span>{label}</span>
          <span className="text-[10px] uppercase font-bold text-teal-600 bg-teal-100/70 px-1.5 py-0.5 rounded">
            {selectedLanguage.toUpperCase()}
          </span>
        </>
      )}
    </button>
  );
};
