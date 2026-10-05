"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
  };

  const borderMap = {
    success: "border-l-green-500",
    error: "border-l-red-500",
    info: "border-l-blue-500",
    warning: "border-l-amber-500",
  };

  return (
    <div className="fixed top-4 right-4 z-[150] space-y-2.5 w-[calc(100vw-2rem)] max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto bg-white rounded-2xl shadow-2xl border-l-4 ${borderMap[toast.type]} p-3.5 flex items-start gap-3 border border-ink/10 pop-in`}
        >
          {iconMap[toast.type]}
          <div className="flex-1 text-sm font-bold leading-snug text-ink">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-ink/30 hover:text-ink transition shrink-0 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
