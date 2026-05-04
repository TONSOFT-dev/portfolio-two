"use client";

import { useEffect } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-20 sm:top-24 right-4 sm:right-6 z-9999 flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-2xl min-w-[280px] sm:min-w-[300px] max-w-[calc(100vw-2rem)] sm:max-w-[500px] animate-slide-in-right ${
        type === "success"
          ? "bg-solis/10 text-solis border border-solis/30 backdrop-blur-md"
          : "bg-blaze/10 text-blaze border border-blaze/30 backdrop-blur-md"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="shrink-0">
        {type === "success" ? (
          <CheckCircle2 className="w-5 h-5 text-solis" />
        ) : (
          <AlertCircle className="w-5 h-5 text-blaze" />
        )}
      </div>
      <p className="flex-1 text-sm sm:text-base font-medium pr-2">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 hover:bg-black/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-solis/50"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
