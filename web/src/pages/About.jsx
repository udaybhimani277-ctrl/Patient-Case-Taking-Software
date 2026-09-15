import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Sparkles, 
  AlertOctagon, 
  CheckCircle2, 
  Cpu, 
  ArrowRight, 
  Mic, 
  Globe, 
  Brain, 
  AlertTriangle, 
  FileSearch, 
  Clock, 
  Flower2, 
  FileText, 
  Volume2, 
  Share2,
  Users,
  Timer,
  Check,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';

export const About = () => {
  const differentiators = [
    {
      num: "01",
      icon: Mic,
      title: "🎙️ Voice + Touch Input",
      desc: "Patients can either tap large touch-optimized cards or speak naturally in their native language.",
      tag: "Accessibility"
    },
    {
      num: "02",
      icon: Globe,
      title: "🌐 Multilingual by Design",
      desc: "Engineered specifically for Indian linguistic diversity: Gujarati, Hindi, Marathi, Bengali, Tamil, Telugu & English.",
      tag: "Linguistic Inclusion"
    },
    {
      num: "03",
      icon: Brain,
      title: "🧠 Adaptive SOCRATES Logic",
      desc: "Dynamic clinical questions that adapt in real time to symptom site, onset, character, radiation, and severity.",
      tag: "Clinical AI"
    },
    {
      num: "04",
      icon: AlertTriangle,
      title: "🚨 Red Flag Detection",
      desc: "Critical symptoms like chest pain with dyspnea immediately alert triage staff without claiming emergency diagnosis.",
      tag: "Patient Safety"
    },
    {
      num: "05",
      icon: FileSearch,
      title: "📄 Medical OCR & Extraction",
      desc: "Instantly digitizes previous prescriptions, lab ranges, and discharge summaries with out-of-bounds highlighting.",
      tag: "Vision AI"
    },
    {
      num: "06",
      icon: Clock,
      title: "🕐 Longitudinal Medical Timeline",
      desc: "Synthesizes multi-year paper trails into a clear chronological visual trajectory for rapid doctor review.",
      tag: "Data Synthesis"
    },
    {
      num: "07",
      icon: Flower2,
      title: "🌿 Integrative AYUSH Mode",
      desc: "Supports traditional Ayurvedic Dashavidha Pariksha, Ahara (Diet), Vihara (Lifestyle), Nidana, and Samprapti.",
      tag: "Traditional Medicine"
    },
    {
      num: "08",
      icon: FileText,
      title: "🧾 Physician-Ready Summary",
      desc: "Transforms raw conversational notes into standardized SOAP drafts, returning 3-5 minutes back to the doctor.",
      tag: "Doctor Ergonomics"
    },
    {
      num: "09",
      icon: Volume2,
      title: "🔊 Audio Consent & Guidance",
      desc: "Spoken prompts throughout every step empower elderly and low-digital-literacy citizens to participate easily.",
      tag: "Universal Design"
    },
    {
      num: "10",
      icon: Share2,
      title: "🔗 ABDM & FHIR Interoperability",
      desc: "Simulates seamless connectivity to Ayushman Bharat Health Accounts (ABHA) and FHIR R4 diagnostic bundles.",
      tag: "National Standards"
    }
  ];

  const problemPoints = [
    { title: "Overloaded Hospital OPDs", desc: "Major government and civil hospitals handle 4,000–10,000 patients every single day, creating massive queues." },
    { title: "Short Consultation Window", desc: "Doctors have only 2–5 minutes per patient, leaving virtually zero time to extract thorough past histories." },
    { title: "Fragmented Paper Records", desc: "Patients bring crumpled, torn, or misplaced physical prescriptions that physicians cannot decipher in seconds." },
    { title: "Manual History Taking", desc: "Physicians repeatedly ask the same 15 basic questions for every patient instead of focusing on physical examination." },
    { title: "Multilingual & Literacy Barriers", desc: "Patients often struggle to articulate medical terminology across regional dialects and low digital comfort." },
    { title: "AYUSH History Complexity", desc: "Ayurvedic doctors require extensive Dashavidha Pariksha documentation that standard digital portals ignore." }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Hackathon Prototype Dossier
              </span>
              <span className="text-xs text-slate-400 font-mono">Academic Whitepaper</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
              About MediKiosk Platform
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              MediKiosk provides patient-facing structured clinical intake before consultation, solving the critical OPD bottleneck in public and private hospitals.
            </p>
          </div>

          <AudioInstructionBtn
            label="Spoken Concept Summary"
            text="MediKiosk is an AI clinical intake kiosk designed to digitize medical history and old records before doctor consultation, saving time in crowded hospital OPDs."
          />
        </div>

        {/* Problem vs Solution Split */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Problem Card */}
          <div className="p-6 bg-rose-50/40 rounded-3xl border border-rose-200/70 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-rose-950">The Core Healthcare Bottleneck</h2>
            </div>
            
            <p className="text-xs text-rose-900 leading-relaxed">
              In tertiary and district hospitals across India, out-patient departments face crushing patient loads. Doctors are overburdened by administrative data entry and repetitive questioning.
            </p>

            <div className="space-y-2.5 pt-2">
              {problemPoints.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-slate-800">{p.title}:</strong>{" "}
                    <span className="text-slate-600">{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Card */}
          <div className="p-6 bg-teal-50/40 rounded-3xl border border-teal-200/70 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-teal-950">The MediKiosk Digital Solution</h2>
            </div>
            
            <p className="text-xs text-teal-950 leading-relaxed">
              MediKiosk shifts history-taking to the waiting lobby. While waiting for their token, patients interact with an accessible multilingual kiosk to structure their symptoms and scan their records.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-white rounded-2xl border border-teal-200/80 text-xs text-slate-700">
                <h4 className="font-bold text-teal-900 mb-0.5">1. Pre-Consultation Efficiency</h4>
                <p className="text-slate-600">Saves 3–5 minutes per patient, allowing physicians to double their active treatment and counseling focus.</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-teal-200/80 text-xs text-slate-700">
                <h4 className="font-bold text-teal-900 mb-0.5">2. Complete Clinical Trajectory</h4>
                <p className="text-slate-600">No missed past surgeries, drug allergies, or chronic conditions due to rushed conversations.</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-teal-200/80 text-xs text-slate-700">
                <h4 className="font-bold text-teal-900 mb-0.5">3. Safe Physician-in-the-Loop Design</h4>
                <p className="text-slate-600">MediKiosk never replaces the doctor; it provides an organized pre-brief draft for rapid review and verification.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* DEDICATED SHOWCASE: Why MediKiosk is Different (10 Feature Cards) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            Competitive Innovations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Why MediKiosk is Different
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ten tailored innovations addressing Indian healthcare realities from language accessibility to AYUSH documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.num}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                      {feat.num}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700">
                  <span>Interactive Prototype Ready</span>
                  <Check className="w-3.5 h-3.5 ml-auto text-emerald-600 stroke-[3]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology Concept & Future Scope */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Architecture Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Technology Concept & Future Scope
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered for edge deployment inside OPD lobbies with privacy-preserving localized AI models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2">
            <h4 className="text-sm font-bold text-teal-400">Edge Inference Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quantized clinical language models running on hospital premises ensure patient data never leaves the institutional boundary.
            </p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2">
            <h4 className="text-sm font-bold text-teal-400">FHIR R4 Interoperability</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically serializes summaries into standard Observation, Condition, and MedicationStatement FHIR bundles for ABDM sync.
            </p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2">
            <h4 className="text-sm font-bold text-teal-400">Biometric & IoT Vitals Integration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Future kiosks can connect directly to Bluetooth pulse oximeters, blood pressure cuffs, and non-invasive infrared thermometers.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 text-center">
          <Link
            to="/patient-intake"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-sm"
          >
            <span>Experience The Live Intake Demo Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
