import React from 'react';

export const StatusBadge = ({ status, type = "status", size = "sm" }) => {
  let styleClasses = "bg-slate-100 text-slate-700 border-slate-200";

  if (type === "priority") {
    switch (status?.toLowerCase()) {
      case "high":
        styleClasses = "bg-red-50 text-red-700 border-red-200 ring-1 ring-red-300/60";
        break;
      case "medium":
        styleClasses = "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-300/50";
        break;
      case "normal":
      default:
        styleClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
        break;
    }
  } else if (type === "status") {
    switch (status?.toLowerCase()) {
      case "review required":
      case "abnormal":
      case "high":
      case "low":
        styleClasses = "bg-amber-50 text-amber-700 border-amber-200";
        break;
      case "completed":
      case "ready":
      case "normal":
      case "active":
        styleClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
        break;
      case "extracted":
        styleClasses = "bg-cyan-50 text-cyan-700 border-cyan-200";
        break;
      case "irregular":
      case "pending":
        styleClasses = "bg-purple-50 text-purple-700 border-purple-200";
        break;
      default:
        styleClasses = "bg-slate-100 text-slate-700 border-slate-200";
        break;
    }
  }

  const sizeClasses = size === "xs" 
    ? "px-2 py-0.5 text-xs" 
    : size === "md" 
    ? "px-3 py-1 text-sm font-medium" 
    : "px-2.5 py-0.5 text-xs font-medium";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${styleClasses} ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};
