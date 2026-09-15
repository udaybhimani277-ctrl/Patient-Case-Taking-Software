import React, { useState } from 'react';
import {
  Flower2,
  Leaf,
  Sparkles,
  HeartHandshake,
  FileText,
  CheckCircle2,
  Activity,
  Moon,
  Sun,
  Utensils,
  AlertCircle,
  Stethoscope,
  Info,
  ChevronDown,
  Volume2,
  RotateCcw,
  Save,
  Check
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientAyushHistory = () => {
  const { activePatient, ayushMode, setAyushMode, addToast } = useDemo();
  const [showSummary, setShowSummary] = useState(false);
  const [activeTab, setActiveTab] = useState('pariksha');

  // AYUSH Pariksha form state preloaded from active patient
  const [formData, setFormData] = useState({
    prakriti: activePatient?.ayush?.prakriti || 'Vata-Pitta',
    vikriti: activePatient?.ayush?.vikriti || 'Prana Vata Dushti with Pitta Vriddhi',
    sara: activePatient?.ayush?.sara || 'Madhyama (Moderate)',
    samhanana: activePatient?.ayush?.samhanana || 'Madhyama (Medium body frame)',
    pramana: activePatient?.ayush?.pramana || 'Normal BMI 26.2',
    satmya: activePatient?.ayush?.satmya || 'Mishra (Mixed adaptation)',
    sattva: activePatient?.ayush?.sattva || 'Madhyama Sattva (Moderate mental resilience)',
    aharaShakti: activePatient?.ayush?.aharaShakti || 'Abhyavaharana Shakti Madhyama, Jarana Shakti Avara',
    vyayamaShakti: activePatient?.ayush?.vyayamaShakti || 'Avara (Low exercise tolerance)',
    vaya: activePatient?.ayush?.vaya || 'Madhyama Vaya (54 yrs)',

    // Ahara / Vihara / Nidana / Samprapti
    aharaHabits: activePatient?.ayush?.ahara || 'Prefers fried snacks (Farsan), irregular meal timings, high salt intake.',
    viharaHabits: activePatient?.ayush?.vihara || 'Stressful business schedule, late bedtime (12:30 AM), minimal physical exercise.',
    nidanaFactors: activePatient?.ayush?.nidana || 'Guru-Snigdha Ahara Sevana, Ati-Chintana (High mental stress), Divasvapna.',
    sampraptiProgression: activePatient?.ayush?.samprapti || 'Dhamani Pratichaya (Atherosclerotic tendency) aggravating Hridya Spandana.'
  });

  const handleModeToggle = (mode) => {
    setAyushMode(mode);
    addToast({
      title: mode ? 'AYUSH Clinical Mode Activated' : 'Modern Allopathic Mode Active',
      message: mode ? 'Dashavidha Pariksha & Dosha assessment ready.' : 'Standard SOAP protocol active.',
      type: 'info'
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowSummary(true);
    addToast({
      title: 'AYUSH Assessment Saved',
      message: 'Dashavidha Pariksha, Ahara and Vihara parameters recorded for consultation.',
      type: 'success'
    });
  };

  const playVoice = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
      addToast({
        title: 'Voice Guidance Playing',
        message: text.slice(0, 45) + '...',
        type: 'info'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-md">
              <Flower2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ayurveda, Yoga, Unani, Siddha, Homeopathy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">AYUSH Holistic Clinical Intake</h1>
            <p className="text-emerald-100 text-sm max-w-xl">
              MediKiosk integrates traditional Indian medicine protocols including Dashavidha Pariksha (10-fold clinical evaluation), Prakriti/Vikriti analysis, and Ahara-Vihara lifestyle assessment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleModeToggle(!ayushMode)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                ayushMode
                  ? 'bg-amber-400 text-emerald-950 hover:bg-amber-300'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>{ayushMode ? 'AYUSH Mode Active' : 'Enable AYUSH Mode'}</span>
            </button>
            <button
              onClick={() => playVoice('Welcome to AYUSH holistic clinical intake. Please answer the 10-fold clinical questions on Prakriti, diet, and lifestyle.')}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Voice Instructions"
            >
              <Volume2 className="w-5 h-5 text-emerald-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold">CLINICAL NOTICE: </span>
          AYUSH formulations, Dosha balance, and dietary assessments are clinical intake aids designed to assist consulting AYUSH Vaidyas and Medical Officers. All suggestions require professional physician verification.
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pariksha')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'pariksha'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Dashavidha Pariksha (10 Parameters)
        </button>
        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'lifestyle'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Ahara & Vihara (Diet & Lifestyle)
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'summary'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. Holistic Clinical Summary
        </button>
      </div>

      {/* Tab 1: Dashavidha Pariksha */}
      {activeTab === 'pariksha' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Dashavidha Pariksha (दशविध परीक्षा)</h2>
              <p className="text-xs text-slate-500">Charaka Samhita 10-fold clinical evaluation protocol</p>
            </div>
            <button
              onClick={() => playVoice('Dashavidha Pariksha evaluates Prakriti, Vikriti, body tissue essence, physical frame, adaptation, mental fortitude, and digestive capacity.')}
              className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-50"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">1. Prakriti (प्रकृति - Body Constitution)</label>
                <select
                  value={formData.prakriti}
                  onChange={(e) => setFormData({ ...formData, prakriti: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Vata">Vata Dominant</option>
                  <option value="Pitta">Pitta Dominant</option>
                  <option value="Kapha">Kapha Dominant</option>
                  <option value="Vata-Pitta">Vata-Pitta (Dvidoshaja)</option>
                  <option value="Pitta-Kapha">Pitta-Kapha (Dvidoshaja)</option>
                  <option value="Vata-Kapha">Vata-Kapha (Dvidoshaja)</option>
                  <option value="Tridoshaja">Tridoshaja (Sama Prakriti)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">2. Vikriti (विकृति - Current Morbidity)</label>
                <input
                  type="text"
                  value={formData.vikriti}
                  onChange={(e) => setFormData({ ...formData, vikriti: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">3. Sara (सार - Tissue Essence)</label>
                <select
                  value={formData.sara}
                  onChange={(e) => setFormData({ ...formData, sara: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Pravara (Superior)">Pravara (Superior Essence)</option>
                  <option value="Madhyama (Moderate)">Madhyama (Moderate Essence)</option>
                  <option value="Avara (Inferior)">Avara (Inferior / Debilitated)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">4. Samhanana (संहनन - Compactness)</label>
                <select
                  value={formData.samhanana}
                  onChange={(e) => setFormData({ ...formData, samhanana: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Su-samhata (Well-built & compact)">Su-samhata (Well-built & compact)</option>
                  <option value="Madhyama (Medium body frame)">Madhyama (Medium body frame)</option>
                  <option value="Heena-samhanana (Frail / Loose frame)">Heena-samhanana (Frail / Loose frame)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">5. Pramana (प्रमाण - Anthropometry)</label>
                <input
                  type="text"
                  value={formData.pramana}
                  onChange={(e) => setFormData({ ...formData, pramana: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">6. Satmya (सात्म्य - Homologation)</label>
                <select
                  value={formData.satmya}
                  onChange={(e) => setFormData({ ...formData, satmya: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Sarva-rasa Satmya (All 6 tastes adapted)">Sarva-rasa Satmya (All 6 tastes)</option>
                  <option value="Mishra (Mixed adaptation)">Mishra (Mixed adaptation)</option>
                  <option value="Eka-rasa Satmya (Single taste preference)">Eka-rasa Satmya (Single taste)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">7. Sattva (सत्त्व - Mental Resilience)</label>
                <select
                  value={formData.sattva}
                  onChange={(e) => setFormData({ ...formData, sattva: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Pravara Sattva (High mental fortitude)">Pravara (High mental fortitude)</option>
                  <option value="Madhyama Sattva (Moderate mental resilience)">Madhyama (Moderate resilience)</option>
                  <option value="Avara Sattva (Easily distressed / anxious)">Avara (Easily distressed / anxious)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">8. Ahara Shakti (आहार शक्ति - Agni & Digestion)</label>
                <input
                  type="text"
                  value={formData.aharaShakti}
                  onChange={(e) => setFormData({ ...formData, aharaShakti: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">9. Vyayama Shakti (व्यायाम शक्ति - Stamina)</label>
                <select
                  value={formData.vyayamaShakti}
                  onChange={(e) => setFormData({ ...formData, vyayamaShakti: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Pravara (High physical capacity)">Pravara (High physical capacity)</option>
                  <option value="Madhyama (Moderate capacity)">Madhyama (Moderate capacity)</option>
                  <option value="Avara (Low exercise tolerance)">Avara (Low exercise tolerance)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Dashavidha Evaluation</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Ahara & Vihara */}
      {activeTab === 'lifestyle' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Ahara & Vihara (आहार और विहार)</h2>
              <p className="text-xs text-slate-500">Dietary regimen, diurnal routine, Nidana (etiological factors), and Samprapti</p>
            </div>
            <button
              onClick={() => playVoice('Ahara assesses dietary tastes, oiliness, meal regularity, and digestive fire. Vihara evaluates sleep schedule, mental stress, and physical exercise.')}
              className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-50"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <label className="text-xs font-bold text-amber-900 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>Ahara Habits (Dietary Intake & Rasa Balance)</span>
              </label>
              <textarea
                rows={3}
                value={formData.aharaHabits}
                onChange={(e) => setFormData({ ...formData, aharaHabits: e.target.value })}
                className="w-full p-3 bg-white rounded-xl border border-amber-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <label className="text-xs font-bold text-blue-900 flex items-center gap-2">
                <Moon className="w-4 h-4 text-blue-600" />
                <span>Vihara Habits (Daily Routine, Nidra, Physical Exertion)</span>
              </label>
              <textarea
                rows={3}
                value={formData.viharaHabits}
                onChange={(e) => setFormData({ ...formData, viharaHabits: e.target.value })}
                className="w-full p-3 bg-white rounded-xl border border-blue-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <label className="text-xs font-bold text-rose-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-600" />
                <span>Nidana & Samprapti (Causative Factors & Pathogenesis Pathway)</span>
              </label>
              <textarea
                rows={3}
                value={formData.sampraptiProgression}
                onChange={(e) => setFormData({ ...formData, sampraptiProgression: e.target.value })}
                className="w-full p-3 bg-white rounded-xl border border-rose-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Ahara & Vihara Record</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Holistic Clinical Summary */}
      {activeTab === 'summary' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Ayurvedic Clinical Summary (आयुर्वेदिक सारांश)</h2>
                <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  AI GENERATED AYUSH SUMMARY — AYUSH PHYSICIAN VERIFICATION REQUIRED
                </span>
              </div>
            </div>
            <button
              onClick={() => playVoice('Here is your Ayurvedic clinical summary. Prakriti is Vata-Pitta, current condition shows Prana Vata Dushti with Pitta Vriddhi.')}
              className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-50"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Dosha & Constitutional State</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Deha Prakriti:</span>
                  <span className="font-bold text-emerald-800">{formData.prakriti}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Vikriti (Dosha Dushti):</span>
                  <span className="font-bold text-rose-700">{formData.vikriti}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Dhatus Involved:</span>
                  <span className="font-semibold text-slate-800">Rasa, Rakta, Medas</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Srotas Dushti:</span>
                  <span className="font-semibold text-slate-800">Rasavaha & Pranavaha Srotas (Sanga type)</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Digestive & Lifestyle Factors</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Agni Status:</span>
                  <span className="font-bold text-amber-700">Vishama Agni (Irregular digestive fire)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Kostha (Bowel Tendency):</span>
                  <span className="font-semibold text-slate-800">Krura Kostha (Tendency for constipation)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Manasa Prakriti:</span>
                  <span className="font-semibold text-slate-800">Rajasika dominant</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Physical Stamina:</span>
                  <span className="font-semibold text-slate-800">{formData.vyayamaShakti}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-900 block">Suggested Chikitsa Sutra (Therapeutic Guidance for Consulting Vaidya):</span>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Vata Shamana with Pitta-Aviruddha measures. Deepana-Pachana for Mandagni/Amapachana. Hridya Rasayana (Arjuna, Pushkarmool) and Shirodhara / Pranayama for Ati-Chintana (mental stress alleviation).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default PatientAyushHistory;
