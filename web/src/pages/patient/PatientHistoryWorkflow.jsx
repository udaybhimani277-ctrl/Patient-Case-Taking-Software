import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Bot,
  User,
  ShieldAlert
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

const PatientHistoryWorkflow = () => {
  const {
    activePatient,
    historyCompleteness,
    setHistoryCompleteness,
    selectedLanguage,
    notifyTriage,
    addToast
  } = useDemo();
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(3); // On Socrates follow-up

  const socratesSteps = [
    { key: 'site', title: 'Site', question: 'Where exactly do you feel the pain or discomfort?' },
    { key: 'onset', title: 'Onset', question: 'When did this discomfort start, and was it sudden or gradual?' },
    { key: 'character', title: 'Character', question: 'Can you describe the pain? Is it sharp, burning, heavy pressure, or squeezing?' },
    { key: 'radiation', title: 'Radiation', question: 'Does the pain radiate or travel anywhere, such as your left arm, jaw, neck, or back?' },
    { key: 'association', title: 'Associated Symptoms', question: 'Are you experiencing sweating, nausea, dizziness, or shortness of breath?' },
    { key: 'timing', title: 'Timing', question: 'How long do the episodes last, and is it constant or intermittent?' },
    { key: 'exacerbating', title: 'Exacerbating Factors', question: 'Does physical activity, climbing stairs, or emotional stress trigger the pain?' },
    { key: 'severity', title: 'Severity (1-10)', question: 'On a scale from 1 (mild) to 10 (unbearable), how severe is the pain?' }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste Ramesh ji. I am your MediKiosk AI Clinical Assistant. I see you noted chest discomfort. Can you tell me if the pain radiates to your left arm or jaw?',
      timestamp: '10:14 AM'
    },
    {
      id: 2,
      sender: 'patient',
      text: 'Yes, whenever I climb stairs or walk fast, the pain spreads to my left shoulder and down my left arm.',
      timestamp: '10:15 AM'
    },
    {
      id: 3,
      sender: 'bot',
      text: 'Thank you for clarifying. Does this discomfort come with profuse sweating, shortness of breath, or palpitations?',
      timestamp: '10:15 AM'
    }
  ]);

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      addToast({
        title: 'Voice Input Active',
        message: 'Listening in ' + selectedLanguage.toUpperCase() + '... Please speak clearly.',
        type: 'info'
      });

      // Simulate voice capture
      setTimeout(() => {
        setInputMessage('Yes, I feel breathless after 50 meters and have mild cold sweating.');
        setIsListening(false);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedLanguage === 'hi') utterance.lang = 'hi-IN';
      else if (selectedLanguage === 'gu') utterance.lang = 'gu-IN';
      else utterance.lang = 'en-US';

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      addToast({
        title: 'Audio Playback',
        message: text,
        type: 'info'
      });
    }
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const newMsg = {
      id: Date.now(),
      sender: 'patient',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Check for red flag words
    if (userText.toLowerCase().includes('severe') || userText.toLowerCase().includes('crushing') || userText.toLowerCase().includes('pass out')) {
      notifyTriage({
        urgency: 'Immediate',
        reason: 'Patient described severe crushing symptom in AI dialogue.'
      });
    }

    // AI automated clinical response
    setTimeout(() => {
      const nextStep = currentStepIndex + 1;
      let botReply = '';
      if (nextStep < socratesSteps.length) {
        setCurrentStepIndex(nextStep);
        botReply = `Noted. ${socratesSteps[nextStep].question}`;
        setHistoryCompleteness(prev => Math.min(100, prev + 2));
      } else {
        botReply = "Excellent. All key SOCRATES dimensions have been captured and synthesized into your clinical intake report. Let's proceed to review your complete structured record.";
        setHistoryCompleteness(96);
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Conversational AI Case Intake</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Adaptive Socrates clinical dialogue powered by Indian healthcare language models.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => notifyTriage({ urgency: 'High', reason: 'Patient reported worsening retrosternal heaviness during intake.' })}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Report Red Flag</span>
          </button>

          <button
            onClick={() => navigate('/patient/my-history')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <span>Review History</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Socrates Progress Stepper */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] gap-2">
          {socratesSteps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center text-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-[11px] font-medium mt-1 truncate max-w-[80px] ${isCurrent ? 'text-blue-700 font-bold' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Window */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Box (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[520px]">
          {/* Chat Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.sender === 'patient' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'patient'
                      ? 'bg-slate-800 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {msg.sender === 'patient' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                    msg.sender === 'patient'
                      ? 'bg-slate-800 text-white rounded-tr-xs'
                      : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/10 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:opacity-100 flex items-center space-x-1"
                        title="Read out loud"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input & Mic Bar */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 rounded-b-2xl">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-3 rounded-xl transition-all flex items-center justify-center ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                }`}
                title="Voice Input (Speech to Text)"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Type your reply or click the microphone to speak in English, Hindi, or Gujarati..."
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-colors flex items-center space-x-1"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>Supports multilingual voice: Gujarati, Hindi, English</span>
              <span>Audio playback via browser synthesis</span>
            </div>
          </div>
        </div>

        {/* Right Helper / Socrates Guide (1 col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Current Clinical Focus</span>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-xs font-bold text-blue-900">
                {socratesSteps[currentStepIndex]?.title}
              </div>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                {socratesSteps[currentStepIndex]?.question}
              </p>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              SOCRATES is a clinical interview framework used by physicians to analyze symptoms comprehensively. MediKiosk automatically converts patient dialogue into structured SNOMED CT clinical terms.
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Quick Clinical Suggestions</h3>
            <p className="text-xs text-slate-500">Tap any phrase to insert into your reply:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Radiates to left shoulder',
                'Aggravated by stair climbing',
                'Relieved within 5 mins of rest',
                'Cold sweating during episodes',
                'No dizziness or fainting'
              ].map(phrase => (
                <button
                  key={phrase}
                  onClick={() => setInputMessage(phrase)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors text-left"
                >
                  + {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistoryWorkflow;
