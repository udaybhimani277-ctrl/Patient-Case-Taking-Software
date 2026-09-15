import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Flower2,
  Leaf,
  CheckCircle2,
  FileText,
  AlertCircle,
  Save,
  Pill,
  Sparkles,
  Heart,
  Activity,
  Printer
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorAyush = () => {
  const { patientId } = useParams();
  const {
    patients,
    activePatient,
    activeDoctor,
    addToast
  } = useDemo();

  const currentPatient = patients.find((p) => p.id === patientId) || activePatient;

  const [chikitsaPlan, setChikitsaPlan] = useState({
    sutra: 'Vata Shamana, Deepana-Pachana for Agnimandya, Hridya Rasayana support.',
    pathya: 'Laghu Ahara (Mung dal khichdi, pomegranate), warm water, daily light walk.',
    apathya: 'Avoid Farsan (deep fried snacks), pungent chillies, late night sleep, psychological stress.'
  });

  const [ayushFormulations, setAyushFormulations] = useState([
    { id: 1, name: 'Arjuna Ksheerapaka', dose: '40 ml twice daily', anupana: 'Warm milk / water', duration: '30 Days' },
    { id: 2, name: 'Prabhakar Vati', dose: '1 Tab (250mg) BD', anupana: 'Honey / warm water', duration: '30 Days' },
    { id: 3, name: 'Sarpagandha Ghan Vati', dose: '1 Tab (250mg) HS', anupana: 'Warm water at bedtime', duration: '15 Days' }
  ]);

  const [isSigned, setIsSigned] = useState(false);

  const handleSignAyush = () => {
    setIsSigned(true);
    addToast({
      title: 'AYUSH Consultation Signed',
      message: 'Dashavidha Pariksha verified and Ayurvedic Chikitsa regimen finalized.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-md border border-emerald-500/30">
              <Flower2 className="w-3.5 h-3.5" />
              <span>AYUSH Medical Officer Consultation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Ayurvedic Clinical Evaluation & Review
            </h1>
            <p className="text-emerald-100 text-sm max-w-xl">
              Dashavidha Pariksha, Dosha Dushti, and holistic management plan for <span className="font-bold text-white">{currentPatient.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSignAyush}
              disabled={isSigned}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                isSigned
                  ? 'bg-emerald-800 text-emerald-300 cursor-not-allowed'
                  : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-amber-400/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSigned ? 'AYUSH Rx Signed' : 'Sign Ayurvedic Rx'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <span className="font-bold">INTEGRATIVE CLINICAL NOTICE: </span>
          AYUSH formulations are prescribed in conjunction with patient's baseline cardiovascular medications. No allopathic medication is discontinued without inter-departmental cardiology review.
        </div>
      </div>

      {/* Dashavidha Pariksha Summary */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>Verified Dashavidha Pariksha Parameters</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">1. PRAKRITI</span>
            <span className="font-bold text-slate-900">Vata-Pitta</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">2. VIKRITI</span>
            <span className="font-bold text-rose-700">Prana Vata Dushti</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">3. SARA</span>
            <span className="font-bold text-slate-900">Madhyama Sara</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">4. SAMHANANA</span>
            <span className="font-bold text-slate-900">Madhyama</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">5. PRAMANA</span>
            <span className="font-bold text-slate-900">BMI 26.2</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">6. SATMYA</span>
            <span className="font-bold text-slate-900">Mishra Satmya</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">7. SATTVA</span>
            <span className="font-bold text-slate-900">Madhyama Sattva</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">8. AHARA SHAKTI</span>
            <span className="font-bold text-slate-900">Avara Jarana</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">9. VYAYAMA SHAKTI</span>
            <span className="font-bold text-slate-900">Avara (Low)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-bold">10. VAYA</span>
            <span className="font-bold text-slate-900">54 Yrs (Madhyama)</span>
          </div>
        </div>
      </div>

      {/* Ayurvedic Formulations Prescribed */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Pill className="w-4 h-4 text-emerald-600" />
          <span>Prescribed Classical Ayurvedic Formulations</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-2.5 px-3">Formulation</th>
                <th className="py-2.5 px-3">Dosage</th>
                <th className="py-2.5 px-3">Anupana (Vehicle)</th>
                <th className="py-2.5 px-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ayushFormulations.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">{f.name}</td>
                  <td className="py-3 px-3 font-medium text-slate-700">{f.dose}</td>
                  <td className="py-3 px-3 text-emerald-700 font-semibold">{f.anupana}</td>
                  <td className="py-3 px-3 text-slate-600">{f.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pathya & Apathya */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
          <span className="font-bold text-emerald-900 block">Pathya (Do's / Wholesome Regimen)</span>
          <p className="text-emerald-800 leading-relaxed">{chikitsaPlan.pathya}</p>
        </div>
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
          <span className="font-bold text-rose-900 block">Apathya (Don'ts / Unwholesome Factors)</span>
          <p className="text-rose-800 leading-relaxed">{chikitsaPlan.apathya}</p>
        </div>
      </div>
    </div>
  );
};
export default DoctorAyush;
