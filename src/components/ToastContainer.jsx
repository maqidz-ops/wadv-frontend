import { useNotif } from "../contexts/NotifContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const typeConfig = {
  SUCCESS: { color: "bg-emerald-50 border-emerald-500", text: "text-emerald-800", icon: <CheckCircle2 className="text-emerald-500" size={20} /> },
  ERROR: { color: "bg-rose-50 border-rose-500", text: "text-rose-800", icon: <AlertCircle className="text-rose-500" size={20} /> },
  WARNING: { color: "bg-amber-50 border-amber-500", text: "text-amber-800", icon: <AlertTriangle className="text-amber-500" size={20} /> },
  INFO: { color: "bg-blue-50 border-blue-500", text: "text-blue-800", icon: <Info className="text-blue-500" size={20} /> },
};

export function ToastContainer() {
  const { toasts, removeToast } = useNotif();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999] w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const config = typeConfig[toast.type] || typeConfig.INFO;
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl shadow-lg shadow-slate-200/50 border-l-4 bg-white/95 backdrop-blur-sm pointer-events-auto animate-in slide-in-from-right-8 fade-in duration-300 ${config.color}`}
          >
            <div className="shrink-0 mt-0.5">{config.icon}</div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${config.text}`}>
                {toast.title}
              </p>
              <p className="text-sm text-slate-600 mt-1 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100/50"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}