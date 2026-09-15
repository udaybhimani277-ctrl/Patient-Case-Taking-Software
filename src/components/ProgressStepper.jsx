import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { Check, User, MessageSquare, ScanLine, FileText, Stethoscope } from 'lucide-react';

export const STEPS = [
  { number: 1, label: "01 Identify", title: "Patient Registration", path: "/patient-intake", icon: User },
  { number: 2, label: "02 Converse", title: "AI Clinical History", path: "/ai-history", icon: MessageSquare },
  { number: 3, label: "03 Scan", title: "Document Digitization", path: "/documents", icon: ScanLine },
  { number: 4, label: "04 Summarize", title: "Clinical Summary", path: "/clinical-summary", icon: FileText },
  { number: 5, label: "05 Consult", title: "Doctor Consultation", path: "/doctor-dashboard", icon: Stethoscope }
];

export const ProgressStepper = ({ currentStepNumber = 1 }) => {
  const navigate = useNavigate();
  const { setActiveStep } = useDemo();

  const handleStepClick = (step) => {
    setActiveStep(step.number);
    navigate(step.path);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
            Core Patient Journey
          </span>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
            End-to-End Clinical Digital Intake
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-800">Step {currentStepNumber} of 5</span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStepNumber / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <nav aria-label="Progress" className="overflow-x-auto pb-1">
        <ol className="flex items-center min-w-[620px] justify-between">
          {STEPS.map((step, idx) => {
            const isCompleted = step.number < currentStepNumber;
            const isCurrent = step.number === currentStepNumber;
            const StepIcon = step.icon;

            return (
              <li key={step.number} className="flex-1 relative">
                <button
                  onClick={() => handleStepClick(step)}
                  className="group flex flex-col items-center text-center w-full focus:outline-none"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <div className="flex items-center justify-center w-full relative">
                    {/* Connecting line to previous */}
                    {idx !== 0 && (
                      <div 
                        className={`absolute left-0 right-1/2 top-4 -translate-y-1/2 h-0.5 -z-0 transition-colors ${
                          step.number <= currentStepNumber ? 'bg-teal-600' : 'bg-slate-200'
                        }`} 
                      />
                    )}
                    {/* Connecting line to next */}
                    {idx !== STEPS.length - 1 && (
                      <div 
                        className={`absolute left-1/2 right-0 top-4 -translate-y-1/2 h-0.5 -z-0 transition-colors ${
                          isCompleted ? 'bg-teal-600' : 'bg-slate-200'
                        }`} 
                      />
                    )}

                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                        isCompleted
                          ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-white border-teal-600 text-teal-700 shadow-md ring-4 ring-teal-100'
                          : 'bg-white border-slate-300 text-slate-400 group-hover:border-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <div className="mt-2 text-center">
                    <span
                      className={`block text-xs font-bold tracking-tight uppercase ${
                        isCurrent
                          ? 'text-teal-800'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span
                      className={`block text-[11px] font-medium leading-tight mt-0.5 ${
                        isCurrent ? 'text-teal-700 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};
