import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { 
  Flower2, 
  Leaf, 
  Sparkles, 
  HeartHandshake, 
  FileText, 
  Check, 
  Activity, 
  Moon, 
  Sun, 
  Utensils, 
  AlertCircle,
  Stethoscope,
  Info,
  ChevronDown
} from 'lucide-react';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';

export const AyushMode = () => {
  const { activePatient, ayushMode, setAyushMode, addToast } = useDemo();
  const [showSummary, setShowSummary] = useState(false);

  // AYUSH Pariksha form state preloaded from active patient
  const [formData, setFormData] = useState({
    prakriti: activePatient.ayush?.prakriti || "Vata-Pitta",
    vikriti: activePatient.ayush?.vikriti || "Prana Vata Dushti with Pitta Vriddhi",
    sara: activePatient.ayush?.sara || "Madhyama (Moderate)",
    samhanana: activePatient.ayush?.samhanana || "Madhyama (Medium body frame)",
    pramana: activePatient.ayush?.pramana || "Normal BMI 26.2",
    satmya: activePatient.ayush?.satmya || "Mishra (Mixed adaptation)",
    sattva: activePatient.ayush?.sattva || "Madhyama Sattva (Moderate mental resilience)",
    aharaShakti: activePatient.ayush?.aharaShakti || "Abhyavaharana Shakti Madhyama, Jarana Shakti Avara",
    vyayamaShakti: activePatient.ayush?.vyayamaShakti || "Avara (Low exercise tolerance)",
    vaya: activePatient.ayush?.vaya || "Madhyama Vaya (54 yrs)",
    
    // Ahara / Vihara / Nidana / Samprapti
    aharaHabits: activePatient.ayush?.ahara || "Prefers fried snacks (Farsan), irregular meal timings, high salt intake.",
    viharaHabits: activePatient.ayush?.vihara || "Stressful business schedule, late bedtime (12:30 AM), minimal physical exercise.",
    nidanaFactors: activePatient.ayush?.nidana || "Guru-Snigdha Ahara Sevana, Ati-Chintana (High mental stress), Divasvapna.",
    sampraptiProgression: activePatient.ayush?.samprapti || "Dhamani Pratichaya (Atherosclerotic tendency) aggravating Hridya Spandana."
  });

  const handleModeToggle = (mode) => {
    setAyushMode(mode);
    addToast({
      title: mode ? "AYUSH Clinical Mode Enabled" : "Modern Allopathic Clinical Mode",
      message: mode ? "Dashavidha Pariksha parameters activated." : "Standard SOAP protocol active.",
      type: "info"
    });
  };

  const handleGenerateSummary = () => {
    setShowSummary(true);
    addToast({
      title: "AYUSH Clinical Summary Formulated",
      message: "Dashavidha Pariksha, Dosha Dushti, and Ahara-Vihara synthesized.",
      type: "success"
    });
  };

  const dashavidhaItems = [
    { key: "prakriti", label: "1. Prakriti (Constitution)", options: ["Vata-Pitta", "Pitta-Kapha", "Kapha-Vata", "Tridoshaja", "Vataja", "Pittaja", "Kaphaja"] },
    { key: "vikriti", label: "2. Vikriti (Dosha Imbalance)", options: ["Prana Vata Dushti with Pitta Vriddhi", "Jwara Samprapti (Pitta Pradhana)", "Kasa Roga (Kaphaja Shushka)", "Amlapitta with Mandagni", "Shiroroga (Ardhavabhedaka)"] },
    { key: "sara", label: "3. Sara (Tissue Excellence)", options: ["Pravara (Superior)", "Madhyama (Moderate)", "Avara (Inferior)", "Twak Sara", "Rakta Sara"] },
    { key: "samhanana", label: "4. Samhanana (Body Compactness)", options: ["Su-Samhata (Well-knit)", "Madhyama (Medium body frame)", "Heena (Loosely knit)"] },
    { key: "pramana", label: "5. Pramana (Anthropometric Measurements)", options: ["Normal BMI 26.2", "Ideal Ayurvedic Pramana", "Ati-Sthula (Obese)", "Ati-Krisha (Emaciated)"] },
    { key: "satmya", label: "6. Satmya (Homologation / Tolerance)", options: ["Mishra (Mixed adaptation)", "Satmya to Shita Ahara", "Ushna Satmya", "Ekarasa Satmya"] },
    { key: "sattva", label: "7. Sattva (Mental Resilience)", options: ["Pravara Sattva (High fortitude)", "Madhyama Sattva (Moderate resilience)", "Avara Sattva (Fragile/anxious)"] },
    { key: "aharaShakti", label: "8. Ahara Shakti (Digestive Capacity)", options: ["Abhyavaharana Shakti Madhyama, Jarana Shakti Avara", "Tikshnagni (Intense hunger)", "Mandagni (Sluggish digestion)", "Vishamagni (Irregular digestion)"] },
    { key: "vyayamaShakti", label: "9. Vyayama Shakti (Physical Capacity)", options: ["Pravara (High exercise endurance)", "Madhyama (Moderate tolerance)", "Avara (Low exercise tolerance)"] },
    { key: "vaya", label: "10. Vaya (Age / Stage of Life)", options: ["Balyavastha (Childhood < 16)", "Yuva (Youth 16–30)", "Madhyama Vaya (30–60 yrs)", "Vriddhavastha (Elderly > 60)"] }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4">
      
      {/* Header & Mode Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                AYUSH & Integrative Medicine
              </span>
              <span className="text-xs text-slate-400 font-mono">Ayurveda Framework</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              AYUSH Clinical History Intake
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Supports holistic Ayurvedic assessment including <strong>Dashavidha Pariksha</strong>, Ahara (Diet), Vihara (Lifestyle), Nidana, and Samprapti.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <AudioInstructionBtn
              label="Listen to AYUSH Guidance"
              text="AYUSH mode records your Prakriti constitution, digestive fire, sleep patterns, and daily lifestyle to support Ayurvedic doctors."
            />

            {/* Mode Switcher Toggle */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200">
              <button
                type="button"
                onClick={() => handleModeToggle(false)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  !ayushMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span>Modern Clinical</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle(true)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  ayushMode ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>AYUSH Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashavidha Pariksha 10-Point Grid */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-emerald-600" />
                <span>Dashavidha Pariksha (Tenfold Clinical Examination)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Classical Charaka Samhita methodology for patient strength & morbidity assessment:
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              10 Parameters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashavidhaItems.map((item) => (
              <div key={item.key} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  {item.label}
                </label>
                <div className="relative">
                  <select
                    value={formData[item.key] || item.options[0]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    {item.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Ahara, Vihara, Nidana, Samprapti Section */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Ahara, Vihara, Nidana & Samprapti Assessment</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Ahara */}
              <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-200/80 space-y-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-700" />
                  Ahara (Dietary Habits & Meal Pattern)
                </span>
                <textarea
                  rows={2}
                  value={formData.aharaHabits}
                  onChange={(e) => setFormData(prev => ({ ...prev, aharaHabits: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-medium text-slate-800 focus:border-amber-500"
                />
              </div>

              {/* Vihara */}
              <div className="p-4 bg-teal-50/40 rounded-2xl border border-teal-200/80 space-y-2">
                <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-teal-700" />
                  Vihara (Sleep, Physical Routine & Lifestyle)
                </span>
                <textarea
                  rows={2}
                  value={formData.viharaHabits}
                  onChange={(e) => setFormData(prev => ({ ...prev, viharaHabits: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-white border border-teal-200 text-xs font-medium text-slate-800 focus:border-teal-500"
                />
              </div>

              {/* Nidana */}
              <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-200/80 space-y-2">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                  Nidana (Causative & Aggravating Factors)
                </span>
                <textarea
                  rows={2}
                  value={formData.nidanaFactors}
                  onChange={(e) => setFormData(prev => ({ ...prev, nidanaFactors: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-white border border-rose-200 text-xs font-medium text-slate-800 focus:border-rose-500"
                />
              </div>

              {/* Samprapti */}
              <div className="p-4 bg-purple-50/40 rounded-2xl border border-purple-200/80 space-y-2">
                <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-purple-700" />
                  Samprapti (Disease Progression & Pathogenesis)
                </span>
                <textarea
                  rows={2}
                  value={formData.sampraptiProgression}
                  onChange={(e) => setFormData(prev => ({ ...prev, sampraptiProgression: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-white border border-purple-200 text-xs font-medium text-slate-800 focus:border-purple-500"
                />
              </div>

            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Captures traditional Ayurvedic markers alongside modern telemetry for integrative consultation.
            </p>
            <button
              type="button"
              onClick={handleGenerateSummary}
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AYUSH Summary</span>
            </button>
          </div>

        </div>

      </div>

      {/* Generated Structured Summary Card */}
      {showSummary && (
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Ayurvedic Clinical Synthesis
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Structured AYUSH Assessment Draft
                </h3>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Integrative Record
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <span className="font-bold text-emerald-900 block mb-1">Prakriti Constitution</span>
              <p className="font-semibold text-slate-800">{formData.prakriti}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Vata motor dominance with Pitta thermogenic activity</p>
            </div>
            <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <span className="font-bold text-emerald-900 block mb-1">Agni / Digestive Fire</span>
              <p className="font-semibold text-slate-800">{formData.aharaShakti}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Sluggish digestion causing metabolic ama accumulation</p>
            </div>
            <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <span className="font-bold text-emerald-900 block mb-1">Sattva / Resilience</span>
              <p className="font-semibold text-slate-800">{formData.sattva}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Moderate mental stamina; high business stress</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <p className="font-bold text-slate-800">Ayurvedic Physician Pre-Brief:</p>
            <p className="text-slate-600 leading-relaxed">
              Patient exhibits <strong>{formData.vikriti}</strong> triggered by <em>{formData.nidanaFactors}</em>. Progression: <em>{formData.sampraptiProgression}</em>. Recommend Deepana-Pachana therapy followed by Hridya Rasayana herbs alongside modern cardiovascular consultation.
            </p>
          </div>

          <p className="text-[11px] text-slate-400 italic text-center">
            * AYUSH Prototype Demonstration: Complies with Ministry of AYUSH standardized documentation guidelines.
          </p>
        </div>
      )}

    </div>
  );
};
