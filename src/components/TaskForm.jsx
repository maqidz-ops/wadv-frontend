import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";

export function TaskForm({ onSubmit, onCancel, initialData = null }) {
  const isEdit = !!initialData;

  // Pastikan dueDate dari backend (ISO string) dipotong menjadi YYYY-MM-DD untuk <input type="date">
  const processedInitialData = initialData ? {
    ...initialData,
    description: initialData.description || "",
    dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ""
  } : null;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: processedInitialData || {
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (processedInitialData) reset(processedInitialData);
  }, [initialData, reset]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            {isEdit ? "Edit Task" : "Buat Task Baru"}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="task-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul *</label>
              <input
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                placeholder="Apa yang perlu dikerjakan?"
                {...register("title", { required: "Judul wajib diisi" })}
              />
              {errors.title && <span className="text-rose-500 text-xs mt-1.5 block font-medium">{errors.title.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-800 placeholder:text-slate-400 resize-none"
                placeholder="Tambahkan detail lebih lanjut..."
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-800 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[right_12px_center] bg-no-repeat"
                  {...register("status")}
                >
                  <option value="TODO">Belum Dimulai</option>
                  <option value="IN_PROGRESS">Sedang Dikerjakan</option>
                  <option value="DONE">Selesai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Prioritas</label>
                <select
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-800 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[right_12px_center] bg-no-repeat"
                  {...register("priority")}
                >
                  <option value="LOW">Rendah</option>
                  <option value="MEDIUM">Sedang</option>
                  <option value="HIGH">Tinggi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tenggat Waktu</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-800"
                {...register("dueDate")}
              />
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-200/50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            form="task-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-sm shadow-primary-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Menyimpan...
              </>
            ) : isEdit ? (
              "Simpan Perubahan"
            ) : (
              "Buat Task"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}