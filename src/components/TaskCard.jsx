import { Edit, Trash2, Calendar } from "lucide-react";

export function TaskCard({ task, onEdit, onDelete }) {
  const statusConfig = {
    TODO: { label: "Belum Dimulai", color: "bg-slate-100 text-slate-600 border-slate-200" },
    IN_PROGRESS: { label: "Sedang Dikerjakan", color: "bg-blue-50 text-blue-600 border-blue-200" },
    DONE: { label: "Selesai", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  };

  const priorityConfig = {
    LOW: { label: "Rendah", color: "text-slate-500 bg-slate-50 border-slate-200" },
    MEDIUM: { label: "Sedang", color: "text-amber-600 bg-amber-50 border-amber-200" },
    HIGH: { label: "Tinggi", color: "text-rose-600 bg-rose-50 border-rose-200" },
  };

  const s = statusConfig[task.status] || statusConfig.TODO;
  const p = priorityConfig[task.priority] || priorityConfig.MEDIUM;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      {/* Decorative top border based on priority */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${task.priority === 'HIGH' ? 'bg-rose-500' : task.priority === 'MEDIUM' ? 'bg-amber-400' : 'bg-slate-300'}`}></div>
      
      <div className="flex justify-between items-start mb-3 pt-1">
        <h3 className="font-semibold text-slate-800 text-lg leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">{task.title}</h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Ubah">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex-grow">
        {task.description && (
          <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">{task.description}</p>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${s.color}`}>
          {s.label}
        </span>
        
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${p.color}`}>
          {p.label}
        </span>

        {task.dueDate && (
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 ml-auto bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            <Calendar size={12} />
            {new Date(task.dueDate).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </span>
        )}
      </div>
    </div>
  );
}