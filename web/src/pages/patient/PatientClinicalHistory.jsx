import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Save,
  MessageSquare,
  Bot,
  Send,
  HeartPulse
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientClinicalHistory = () => {
  const navigate = useNavigate();
  const {
    activePatient,
    historyCompleteness,
    setHistoryCompleteness,
    selectedLanguage,
    playAudio,
    stopAudio,
    isAudioPlaying,
    notifyTriage,
    addToast
  } = useDemo();

  // Clinical Questions Dataset based on SOCRATES Framework
  const clinicalQuestions = [
    {
      id: "q1",
      section: "Chief Complaint",
      title: "Primary Symptom",
      prompt: "What brings you to the hospital today? Please describe your main health issue.",
      promptGu: "આજે તમને કઈ તકલીફ છે? કૃપા કરીને તમારી મુખ્ય સમસ્યા જણાવો.",
      promptHi: "आज आपको क्या परेशानी है? कृपया अपनी मुख्य समस्या बताएं।",
      quickTouchOptions: [
        "Chest discomfort / Pressure",
        "Breathing difficulty",
        "High fever with body ache",
        "Severe abdominal pain",
        "Persistent cough & cold"
      ],
      adaptiveTriggers: {
        "Chest discomfort / Pressure": "adaptive_chest",
        "Breathing difficulty": "adaptive_chest"
      },
      currentValue: activePatient?.chiefComplaint || "Substernal chest tightness for 3 hours"
    },
    {
      id: "q2_adaptive",
      section: "History of Present Illness (SOCRATES)",
      title: "Symptom Onset & Site",
      prompt: "When exactly did this discomfort begin, and does it radiate to your arm, jaw, or shoulder?",
      promptGu: "આ દુખાવો ક્યારે શરૂ થયો, અને તે ડાબા ખભા કે ગળા તરફ ફેલાય છે?",
      promptHi: "यह तकलीफ कब शुरू हुई, और क्या यह कंधे या जबड़े की तरफ फैलती है?",
      quickTouchOptions: [
        "Started 3 hours ago while walking",
        "Radiates to left shoulder & arm",
        "Stayed in center of chest",
        "Started suddenly this morning"
      ],
      currentValue: "Sudden retrosternal heaviness since 9:30 AM radiating to left shoulder"
    },
    {
      id: "q3_adaptive",
      section: "History of Present Illness (SOCRATES)",
      title: "Character & Aggravating Factors",
      prompt: "What does the discomfort feel like, and does resting or breathing make it better?",
      promptGu: "આ દુખાવો કેવો લાગે છે (ભારેપણું, બળતરા), અને આરામ કરવાથી રાહત થાય છે?",
      promptHi: "यह दर्द कैसा महसूस होता है, और क्या आराम करने से आराम मिलता है?",
      quickTouchOptions: [
        "Heaviness / Tight band feeling",
        "Sharp pinching sensation",
        "Burning sensation (Acidity like)",
        "No relief with sitting or rest"
      ],
      currentValue: "Heavy tight band feeling, 7/10 severity, no relief with rest"
    },
    {
      id: "q4",
      section: "Drug & Medication History",
      title: "Current Regular Medicines",
      prompt: "Are you taking any daily medicines for blood pressure, cholesterol, diabetes, or thyroid?",
      promptGu: "શું તમે બીપી, કોલેસ્ટ્રોલ, ડાયાબિટીસ કે થાયરોઈડની નિયમિત ગોળીઓ લો છો?",
      promptHi: "क्या आप बीपी, कोलेस्ट्रॉल, शुगर या थायरॉयड की नियमित दवाएं ले रहे हैं?",
      quickTouchOptions: [
        "Blood pressure tablets daily (Amlodipine)",
        "Cholesterol tablets irregularly (Atorvastatin)",
        "Diabetes insulin / Metformin",
        "No regular medications"
      ],
      currentValue: "Amlodipine 5mg OD, Atorvastatin 10mg taken irregularly (2-3 times/wk)"
    },
    {
      id: "q5",
      section: "Allergy History",
      title: "Adverse Drug Reactions",
      prompt: "Have you ever suffered an allergic rash, swelling, or breathing issue from any medication?",
      promptGu: "શું તમને કોઈ ચોક્કસ દવાથી ચકામા, ખંજવાળ કે એલર્જી થઈ છે?",
      promptHi: "क्या आपको किसी खास दवा से एलर्जी, दाने या खुजली हुई है?",
      quickTouchOptions: [
        "Penicillin allergy (skin rash)",
        "Sulfa drugs allergy",
        "Aspirin / NSAID sensitivity",
        "No known drug allergies (NKDA)"
      ],
      currentValue: "Penicillin allergy causes urticarial rash and facial pruritus"
    },
    {
      id: "q6",
      section: "Past Medical & Surgical History",
      title: "Prior Illnesses & Surgeries",
      prompt: "Have you had any prior hospital admissions, surgeries, heart stenting, or chronic illnesses?",
      promptGu: "ભૂતકાળમાં કોઈ સર્જરી, ઓપરેશન કે હોસ્પિટલમાં દાખલ થવું પડ્યું હતું?",
      promptHi: "क्या पहले कोई सर्जरी, ऑपरेशन या अस्पताल में भर्ती होना पड़ा था?",
      quickTouchOptions: [
        "Appendectomy (2008 laparoscopy)",
        "Gallbladder surgery",
        "High cholesterol diagnosed 2021",
        "No past surgeries"
      ],
      currentValue: "Appendectomy (2008), Dyslipidemia diagnosed in 2021"
    },
    {
      id: "q7",
      section: "Family Medical History",
      title: "Hereditary Risk Factors",
      prompt: "Does anyone in your direct family (parents, siblings) have heart disease or diabetes before age 60?",
      promptGu: "પરિવારમાં માતા-પિતા કે ભાઈ-બહેનને નાની ઉંમરે હાર્ટ એટેક કે ડાયાબિટીસ છે?",
      promptHi: "क्या परिवार में माता-पिता को कम उम्र में दिल का दौरा या शुगर की बीमारी है?",
      quickTouchOptions: [
        "Father had heart attack at age 58",
        "Mother has Type 2 Diabetes",
        "Strong family history of hypertension",
        "No major family hereditary diseases"
      ],
      currentValue: "Father had myocardial infarction at age 58. Mother has T2DM."
    },
    {
      id: "q8",
      section: "Personal & Lifestyle History",
      title: "Habits & Work Routine",
      prompt: "Please tell us about smoking, tobacco, alcohol use, and your daily physical activity level.",
      promptGu: "બીડી, તમાકુ, દારૂની ટેવ અથવા તમારી શારીરિક કસરત વિશે જણાવો.",
      promptHi: "तंबाकू, धूम्रपान, शराब या अपनी शारीरिक गतिविधि के बारे में बताएं।",
      quickTouchOptions: [
        "Non-smoker, sedentary desk job",
        "Occasional social alcohol",
        "Chews tobacco / Gutkha",
        "Regular 30 min daily brisk walk"
      ],
      currentValue: "Non-smoker, sedentary desk occupation, occasional social alcohol"
    },
    {
      id: "q9",
      section: "Review of Systems (ROS)",
      title: "Associated Systemic Signs",
      prompt: "Do you have dizziness, palpitations, blackouts, leg swelling, or stomach nausea?",
      promptGu: "શું તમને ચક્કર આવે છે, ધબકારા વધે છે, પગમાં સોજા છે કે ઉલટી થાય છે?",
      promptHi: "क्या आपको चक्कर, घबराहट, पैरों में सूजन या उल्टी जैसा लगता है?",
      quickTouchOptions: [
        "Mild diaphoresis (cold sweating)",
        "Shortness of breath on exertion",
        "No nausea or vomiting",
        "No loss of consciousness / syncope"
      ],
      currentValue: "Positive for exertional dyspnea & cold sweat; denies syncope or vomiting"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const initial = {};
    clinicalQuestions.forEach(q => {
      initial[q.id] = q.currentValue || "";
    });
    return initial;
  });

  const [isListening, setIsListening] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [interviewPaused, setInterviewPaused] = useState(false);

  const currentQ = clinicalQuestions[currentIndex];

  // Speak current question on index change if voice narration is active
  useEffect(() => {
    const localizedPrompt =
      selectedLanguage === 'gu' ? currentQ.promptGu :
      selectedLanguage === 'hi' ? currentQ.promptHi :
      currentQ.prompt;
    // Don't auto play if paused
    if (!interviewPaused) {
      playAudio(localizedPrompt);
    }
  }, [currentIndex, selectedLanguage, interviewPaused]);

  // Touch answer selector
  const handleTouchSelect = (option) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: prev[currentQ.id] ? `${prev[currentQ.id]}; ${option}` : option
    }));

    // Trigger red flag triage if urgent chest discomfort detected
    if (option.includes("Chest discomfort") || option.includes("radiates to left shoulder")) {
      notifyTriage();
    }

    addToast({
      title: "Response Recorded",
      message: `Captured: "${option}"`,
      type: "info",
      duration: 2000
    });
  };

  // Voice speech simulation / recognition
  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      addToast({
        title: "Microphone Active (Listening...)",
        message: "Speak naturally in your selected language.",
        type: "info"
      });

      // Simulated voice recognition transcription
      setTimeout(() => {
        setIsListening(false);
        const simulatedSpoken = currentQ.quickTouchOptions[0] || "Answer spoken via voice input";
        setAnswers(prev => ({
          ...prev,
          [currentQ.id]: prev[currentQ.id] ? `${prev[currentQ.id]} • ${simulatedSpoken}` : simulatedSpoken
        }));
        addToast({
          title: "Voice Recognized",
          message: `"${simulatedSpoken}" recorded into history.`,
          type: "success"
        });
      }, 3200);
    }
  };

  const handleNext = () => {
    if (currentIndex < clinicalQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCustomInput("");
      const pct = Math.min(100, Math.round(((currentIndex + 2) / clinicalQuestions.length) * 100));
      setHistoryCompleteness(pct);
    } else {
      setHistoryCompleteness(94);
      addToast({
        title: "Clinical History Inquiry Completed",
        message: "Structured SOCRATES case dossier synthesized for physician review.",
        type: "success"
      });
      navigate('/patient/summary');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {currentQ.section}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Question {currentIndex + 1} of {clinicalQuestions.length}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Conversational Clinical Intake
            </h2>
          </div>

          {/* Audio & Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const prompt = selectedLanguage === 'gu' ? currentQ.promptGu : selectedLanguage === 'hi' ? currentQ.promptHi : currentQ.prompt;
                playAudio(prompt);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Repeat Question Out Loud"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Repeat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setInterviewPaused(!interviewPaused);
                if (!interviewPaused) stopAudio();
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {interviewPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-amber-600" />}
              <span>{interviewPaused ? "Resume" : "Pause"}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Skip</span>
            </button>
          </div>
        </div>

        {/* Progress Completeness Meter Bar */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold">History Completeness Meter</span>
            <span className="font-bold text-blue-700">
              {Math.round(((currentIndex + 1) / clinicalQuestions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / clinicalQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main AI Question Card */}
      <div className="bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-md space-y-6">
        
        {/* AI Prompt Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
            <Bot className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              MediKiosk Clinical Question Engine
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {selectedLanguage === 'gu'
                ? currentQ.promptGu
                : selectedLanguage === 'hi'
                ? currentQ.promptHi
                : currentQ.prompt}
            </h3>
          </div>
        </div>

        {/* Input Mode 1: Large Touch-Friendly Options */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <span>Touch or Tap Answer (સ્પર્શ કરીને પસંદ કરો):</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentQ.quickTouchOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleTouchSelect(opt)}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 hover:bg-blue-50/50 text-slate-800 text-left font-bold text-xs sm:text-sm transition-all shadow-2xs hover:scale-101 cursor-pointer flex items-center justify-between group"
              >
                <span>{opt}</span>
                <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-xs transition-colors shrink-0">
                  +
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Mode 2: Voice Mic Interaction */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all cursor-pointer shadow-md ${
                isListening ? 'bg-rose-600 animate-pulse scale-110 shadow-rose-500/40' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
              }`}
              title="Speak Answer (બોલો)"
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {isListening ? "Listening to your voice..." : "Or Tap to Speak (અવાજ દ્વારા જવાબ આપો)"}
              </p>
              <p className="text-[11px] text-slate-500">
                Speech recognition trained on Indian regional medical dialects.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-mono">
              Mode: Voice + Touch
            </span>
          </div>
        </div>

        {/* Current Answer Display & Manual Text Fallback */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700">
            Recorded Clinical Answer for this Section:
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={answers[currentQ.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
              placeholder="Your answer will appear here. You can also type or edit directly..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-500 font-medium text-slate-800 shadow-2xs"
            />
          </div>
        </div>

        {/* Non-autonomous Clinical Safety Notice */}
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <p>
            <strong>Physician Verification Boundary:</strong> MediKiosk structures clinical inquiries for case preparation only. It does not provide autonomous diagnostic conclusions or prescribe therapies.
          </p>
        </div>

        {/* Navigation Buttons: Previous / Next */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>{currentIndex === clinicalQuestions.length - 1 ? "Finish & Review Summary" : "Next Question"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default PatientClinicalHistory;
