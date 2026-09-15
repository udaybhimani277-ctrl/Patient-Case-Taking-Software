import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { COMPLAINT_CATEGORIES, ADAPTIVE_FLOWS } from '../data/questions';
import { ProgressStepper } from '../components/ProgressStepper';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';
import {
  Bot,
  User,
  Send,
  Mic,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  BellRing,
  RefreshCw,
  HelpCircle,
  Clock,
  HeartPulse,
  Activity,
  Check,
  CornerDownLeft,
  Volume2
} from 'lucide-react';

export const AIHistory = () => {
  const navigate = useNavigate();
  const {
    activePatient,
    updateActivePatient,
    setActiveStep,
    selectedLanguage,
    notifyTriage,
    addToast,
    playAudio
  } = useDemo();

  // Active complaint key
  const [selectedComplaint, setSelectedComplaint] = useState("chest_pain");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [customInputText, setCustomInputText] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [redFlagActive, setRedFlagActive] = useState(true);
  const [triageNotifiedLocal, setTriageNotifiedLocal] = useState(false);

  // Chat conversation transcript state
  const [messages, setMessages] = useState([
    {
      id: "m1",
      sender: "ai",
      text: "Namaste. I am your MediKiosk Clinical Assistant. Please tell me what is troubling you today.",
      timestamp: "10:14 AM"
    },
    {
      id: "m2",
      sender: "patient",
      text: "I have been having chest discomfort and heaviness since this morning.",
      timestamp: "10:15 AM"
    },
    {
      id: "m3",
      sender: "ai",
      text: "I understand. I will guide you through structured SOCRATES questions so your doctor can evaluate you without delay. When did this chest discomfort begin, and did it start suddenly?",
      timestamp: "10:15 AM",
      category: "Onset (SOCRATES: O)"
    }
  ]);

  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  const activeFlow = ADAPTIVE_FLOWS[selectedComplaint] || ADAPTIVE_FLOWS.chest_pain;
  const currentQuestion = activeFlow.questions[currentQuestionIndex] || activeFlow.questions[activeFlow.questions.length - 1];

  // Calculate dynamic progress
  const answeredCount = messages.filter(m => m.sender === 'patient').length;
  const progressPercent = Math.min(95, Math.max(30, answeredCount * 18));

  // Change complaint category
  const handleSelectComplaint = (catId) => {
    setSelectedComplaint(catId);
    setCurrentQuestionIndex(0);
    const flow = ADAPTIVE_FLOWS[catId];

    // Set red flag based on category
    if (catId === "chest_pain") {
      setRedFlagActive(true);
    } else {
      setRedFlagActive(false);
    }

    setMessages([
      {
        id: Date.now().toString(),
        sender: "ai",
        text: flow.initialAiMessage,
        timestamp: "Just now"
      },
      {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: flow.questions[0].text,
        category: flow.questions[0].category,
        timestamp: "Just now"
      }
    ]);

    addToast({
      title: "Complaint Switched",
      message: `Adaptive questions adjusted for ${catId.replace('_', ' ').toUpperCase()}.`,
      type: "info"
    });
  };

  // Handle patient responding (via option, speech, or typed input)
  const handleAnswer = (answerText) => {
    if (!answerText.trim()) return;

    // Append patient message
    const patientMsg = {
      id: Date.now().toString(),
      sender: "patient",
      text: answerText,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, patientMsg]);
    setCustomInputText("");
    setIsAiTyping(true);

    // Check red flag trigger
    if (currentQuestion && currentQuestion.isRedFlagTrigger && currentQuestion.isRedFlagTrigger(answerText)) {
      setRedFlagActive(true);
    }

    // Simulate AI thinking & follow-up
    setTimeout(() => {
      setIsAiTyping(false);
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < activeFlow.questions.length) {
        setCurrentQuestionIndex(nextIndex);
        const nextQ = activeFlow.questions[nextIndex];
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            sender: "ai",
            text: nextQ.text,
            category: nextQ.category,
            timestamp: "Just now"
          }
        ]);
      } else {
        // Finished all questions
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 3).toString(),
            sender: "ai",
            text: "Thank you. I have captured the key characteristics of your complaint according to the SOCRATES clinical framework. Next, let's digitize any previous prescriptions or lab reports you brought today.",
            timestamp: "Just now"
          }
        ]);
        addToast({
          title: "Intake Dialogue Complete",
          message: "Clinical history captured. Proceed to Document Upload.",
          type: "success"
        });
      }
    }, 750);
  };

  const handleTriageAction = () => {
    notifyTriage(activePatient);
    setTriageNotifiedLocal(true);
    setTimeout(() => setTriageNotifiedLocal(false), 5000);
  };

  const handleContinueToScan = () => {
    setActiveStep(3);
    navigate('/documents');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4">
      {/* 5-Step Stepper */}
      <ProgressStepper currentStepNumber={2} />

      {/* Main Layout: Left = Conversation Area, Right = Patient Info + Red Flag Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: AI Conversation Module (7 or 8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">

          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">
                    AI Clinical History Assistant
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    SOCRATES Protocol
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Adaptive pre-consultation interview in real-time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AudioInstructionBtn
                variant="compact"
                label="Listen to Question"
                text={currentQuestion?.text || "Please answer the question on screen"}
              />
              <button
                type="button"
                onClick={() => handleSelectComplaint("chest_pain")}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
                title="Restart Conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restart</span>
              </button>
            </div>
          </div>

          {/* Quick Complaint Category Chips */}
          <div className="p-4 bg-slate-50/90 border-b border-slate-200/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Quick Primary Complaint Switcher:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {COMPLAINT_CATEGORIES.map((cat) => {
                const isSelected = selectedComplaint === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectComplaint(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${isSelected
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="p-4 sm:p-6 flex-1 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4 bg-slate-50/40">
            {messages.map((msg) => {
              const isAi = msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${isAi
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-slate-800 text-white'
                      }`}
                  >
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    {msg.category && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                        {msg.category}
                      </span>
                    )}

                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${isAi
                          ? 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs'
                          : 'bg-teal-700 text-white rounded-tr-xs shadow-xs'
                        }`}
                    >
                      {msg.text}
                    </div>

                    <p className={`text-[10px] text-slate-400 ${isAi ? 'text-left pl-1' : 'text-right pr-1'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* AI Typing indicator */}
            {isAiTyping && (
              <div className="flex items-center gap-2 text-xs text-teal-700 bg-teal-50 px-3 py-2 rounded-2xl w-fit border border-teal-100 animate-pulse">
                <Bot className="w-4 h-4" />
                <span>MediKiosk analyzing symptom pattern...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Interactive Option Chips (Tap Input Method) */}
          {currentQuestion && currentQuestion.options && (
            <div className="p-4 bg-white border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span>Tap an answer option or speak below:</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAnswer(opt)}
                    className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between group"
                  >
                    <span>{opt}</span>
                    <CornerDownLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-600 transition-colors shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Controls: Speak & Text Input Area */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center">

            {/* Embedded voice recorder trigger */}
            <div className="w-full sm:w-auto shrink-0">
              <VoiceRecorder
                onTranscriptionComplete={(text) => handleAnswer(text)}
                defaultPrompt="Speak your answer"
              />
            </div>

            {/* Typed Input Field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAnswer(customInputText);
              }}
              className="flex-1 flex gap-2 w-full"
            >
              <input
                type="text"
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                placeholder="Or type specific details (e.g. pain radiates to left shoulder)..."
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-hidden"
              />
              <button
                type="submit"
                disabled={!customInputText.trim()}
                className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>

        {/* RIGHT COLUMN: Patient Info + Progress + Red Flag Detection Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Patient Status & Progress Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Session Telemetry
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Live Intake
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{activePatient.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Patient ID:</span>
                <span className="font-mono text-slate-700">{activePatient.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Selected Language:</span>
                <span className="font-semibold text-teal-700">{activePatient.language}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Queue Token:</span>
                <span className="font-mono font-bold text-slate-800">{activePatient.queueNumber}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Interview Completeness</span>
                <span className="text-teal-700">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {answeredCount} clinical variables confirmed
              </p>
            </div>
          </div>

          {/* RED FLAG DETECTION: Clinical Safety Check Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">Clinical Safety Check</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real-time Rule Check</span>
            </div>

            {redFlagActive ? (
              <div className="space-y-4">
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>⚠️ Priority Attention Required</span>
                  </div>
                  <p className="text-xs text-rose-900 font-medium">
                    Potential red-flag symptoms detected:
                  </p>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Substernal chest pressure with exertional dyspnea in a hypertensive patient. Acute Coronary Syndrome (ACS) must be ruled out immediately.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleTriageAction}
                  className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <BellRing className="w-4 h-4" />
                  <span>Notify Triage Staff Now</span>
                </button>

                {triageNotifiedLocal && (
                  <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg text-center font-semibold border border-emerald-200">
                    ✓ Notification dispatched to OPD Triage Console
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-900">
                  ✓ No immediate red flags detected
                </p>
                <p className="text-[11px] text-emerald-700">
                  Vitals & reported symptoms are within standard outpatient bounds.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[10px] text-slate-500 leading-snug">
              <strong>Clinical Guardrail Notice:</strong> This is a prototype safety visualization. The system does not diagnose medical emergencies or replace physician triage.
            </div>
          </div>

          {/* Proceed to Next Step Card */}
          <div className="bg-teal-50/70 rounded-3xl border border-teal-200/80 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900">
              Next Stage: Step 03
            </h4>
            <p className="text-xs text-teal-800 leading-relaxed">
              Have old prescriptions, discharge summaries, or blood test reports? Digitize them instantly.
            </p>
            <button
              type="button"
              onClick={handleContinueToScan}
              className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Proceed to Document Digitization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
