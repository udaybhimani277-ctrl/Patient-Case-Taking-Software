import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

export const HistoryCompleteness = ({ 
  completeness = 82, 
  sections = null, 
  compact = false,
  showChecklist = true 
}) => {
  const defaultSections = [
    { name: "Chief Complaint", status: "completed" },
    { name: "HPI (Present Illness)", status: "completed" },
    { name: "Past Medical History", status: "completed" },
    { name: "Medication History", status: "warning" },
    { name: "Allergy History", status: completeness > 80 ? "completed" : "missing" },
    { name: "Family History", status: completeness > 70 ? "completed" : "pending" },
    { name: "Personal & Lifestyle", status: completeness > 85 ? "completed" : "pending" },
    { name: "Review of Systems (ROS)", status: completeness >= 90 ? "completed" : "pending" },
    { name: "Prior Investigations", status: completeness >= 94 ? "completed" : "pending" }
  ];

  const displaySections = sections || defaultSections;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'missing':
        return <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
      case 'pending':
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  const getProgressColor = (val) => {
    if (val >= 90) return 'bg-emerald-600';
    if (val >= 75) return 'bg-blue-600';
    if (val >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-2xs ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Intake Metric
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            Clinical History Completeness
          </h4>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900">{completeness}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full transition-all duration-500 rounded-full ${getProgressColor(completeness)}`}
          style={{ width: `${Math.min(100, Math.max(0, completeness))}%` }}
        />
      </div>

      {/* Optional Checklist */}
      {showChecklist && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          {displaySections.map((sec, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-50/70">
              <span className="text-slate-700 font-medium truncate mr-2">{sec.name}</span>
              {getStatusIcon(sec.status)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
