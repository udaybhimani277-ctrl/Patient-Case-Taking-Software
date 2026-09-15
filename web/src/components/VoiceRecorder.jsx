import React, { useState, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const VoiceRecorder = ({ onTranscriptionComplete, defaultPrompt = "Speak in your preferred language..." }) => {
  const { addToast, selectedLanguage } = useDemo();
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [transcriptionSuccess, setTranscriptionSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (isRecording) {
      setRecordDuration(0);
      setTranscriptionSuccess(false);
      timer = setInterval(() => {
        setRecordDuration(prev => {
          if (prev >= 3) { // 3.5-second realistic simulated speech intake
            clearInterval(timer);
            handleFinishRecording();
            return 3;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    addToast({
      title: "Microphone Active (Voice Intake)",
      message: "Listening... Speak naturally in your selected language.",
      type: "info",
      duration: 3000
    });
  };

  const handleFinishRecording = () => {
    setIsRecording(false);
    setTranscriptionSuccess(true);
    
    // Sample transcriptions depending on context
    const samplePhrases = {
      gu: "મને સવારથી છાતીમાં ખૂબ જ ભારેપણું લાગે છે અને શ્વાસ લેવામાં તકલીફ થાય છે.",
      hi: "मुझे आज सुबह से सीने में तेज भारीपन और सांस लेने में दिक्कत महसूस हो रही है।",
      mr: "मला आज सकाळपासून छातीत जडपणा आणि श्वास घेण्यास त्रास जाणवत आहे.",
      ta: "இன்று காலை முதல் எனக்கு நெஞ்சில் கடுமையான பாரமும் மூச்சுத் திணறலும் உள்ளது.",
      te: "ఈరోజు ఉదయం నుంచి నాకు ఛాతీలో విపరీతమైన బరువు, శ్వాస తీసుకోవడంలో ఇబ్బందిగా ఉంది.",
      bn: "আজ সকাল থেকে আমার বুকে ভারী ভাব এবং শ্বাসকষ্ট হচ্ছে।",
      en: "I have been experiencing intense retrosternal chest heaviness and shortness of breath since 9:30 AM."
    };

    const simulatedText = samplePhrases[selectedLanguage] || samplePhrases.en;

    addToast({
      title: "✓ Voice Captured Successfully",
      message: `Audio converted to structured text (${selectedLanguage.toUpperCase()} input).`,
      type: "success",
      duration: 4000
    });

    if (onTranscriptionComplete) {
      onTranscriptionComplete(simulatedText);
    }

    setTimeout(() => {
      setTranscriptionSuccess(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-center">
      <div className="relative">
        {/* Pulsing ring during recording */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
        )}

        <button
          type="button"
          onClick={isRecording ? handleFinishRecording : handleStartRecording}
          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
            isRecording
              ? 'bg-rose-600 text-white hover:bg-rose-700 ring-4 ring-rose-200'
              : transcriptionSuccess
              ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
              : 'bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 ring-4 ring-teal-100'
          }`}
          aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
        >
          {isRecording ? (
            <MicOff className="w-7 h-7 animate-pulse" />
          ) : transcriptionSuccess ? (
            <CheckCircle2 className="w-7 h-7" />
          ) : (
            <Mic className="w-7 h-7" />
          )}
        </button>
      </div>

      <div className="mt-3">
        {isRecording ? (
          <div className="flex flex-col items-center gap-1.5">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              Listening... (0:0{recordDuration})
            </span>
            {/* Animated Sound Wave Bars */}
            <div className="flex items-center gap-1 h-8 mt-1">
              <span className="w-1 bg-rose-500 rounded-full animate-wave-1" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-3" />
              <span className="w-1.5 bg-rose-600 rounded-full animate-wave-2" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-4" />
              <span className="w-1.5 bg-rose-600 rounded-full animate-wave-3" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-5" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-2" />
            </div>
            <p className="text-xs text-slate-500">Tap microphone to finish speaking</p>
          </div>
        ) : transcriptionSuccess ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Voice captured successfully</span>
          </div>
        ) : (
          <div>
            <p className="text-xs font-bold text-slate-700">Tap to Speak</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{defaultPrompt}</p>
          </div>
        )}
      </div>
    </div>
  );
};
