import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../components/Navbar";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import { taskService } from "../services/task.service";
import { useRealTimeTasks } from "../hooks/useRealTimeTasks";
import { Plus, LayoutGrid, AlertCircle, Loader2 } from "lucide-react";
import { useNotif } from "../contexts/NotifContext";

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const [filter, setFilter] = useState("ALL");
  const [selectedTags, setSelectedTags] = useState([]);

  const { addToast } = useNotif();

  useRealTimeTasks(setTasks);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = filter !== "ALL" ? { status: filter } : {};
      const res = await taskService.getAll(params);
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Gagal memuat task");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (formData) => {
    try {
      const newTask = await taskService.create(formData);
      setTasks((prev) => {
        const exists = prev.some((t) => t.id === newTask.id);
        if (exists) return prev;
        return [newTask, ...prev];
      });
      setShowForm(false);
    } catch (err) {
      addToast({
        type: "ERROR",
        title: "Gagal Membuat Task",
        message: err.response?.data?.error?.message || "Terjadi kesalahan",
      });
    }
  };

  const handleEditClick = (task) => {
    setEditTarget(task);
    setShowForm(true);
  };

  const handleUpdate = async (formData) => {
    try {
      const updated = await taskService.update(editTarget.id, formData);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setShowForm(false);
      setEditTarget(null);
    } catch (err) {
      addToast({
        type: "ERROR",
        title: "Gagal Memperbarui Task",
        message: err.response?.data?.error?.message || "Terjadi kesalahan",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus task ini?")) return;
    try {
      await taskService.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      addToast({
        type: "ERROR",
        title: "Gagal Menghapus Task",
        message: err.response?.data?.error?.message || "Terjadi kesalahan",
      });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditTarget(null);
  };

  const allTags = [...new Set(tasks.flatMap((t) => t.tags || []))].sort();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Gunakan local filtering tambahan untuk memastikan
  const displayTasks = tasks.filter((t) => {
    if (filter === "ALL") return true;
    const s = t.status.toUpperCase().replace("-", "_");
    return filter === "IN_PROGRESS"
      ? s === "IN_PROGRESS"
      : s === filter;
  }).filter((t) => {
    if (selectedTags.length === 0) return true;
    const taskTags = t.tags || [];
    return selectedTags.some((tag) => taskTags.includes(tag));
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Daftar Tugas</h1>
            <p className="text-slate-500 mt-1">Kelola dan pantau semua pekerjaan Anda di satu tempat.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-sm shadow-primary-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={20} />
            Task Baru
          </button>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
            {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {f === "ALL" ? "Semua Task" : f === "TODO" ? "Belum Dimulai" : f === "IN_PROGRESS" ? "Sedang Dikerjakan" : "Selesai"}
              </button>
            ))}
          </div>

          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider shrink-0">Tag</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-indigo-100 text-indigo-700 border-indigo-300 shadow-sm"
                      : "bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs font-medium px-2 py-1.5 text-rose-500 hover:text-rose-700 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 mb-8">
            <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-rose-800">Gagal memuat data</h3>
              <p className="text-rose-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-500 mb-4" size={40} />
            <p className="text-slate-500 font-medium">Memuat tugas...</p>
          </div>
        ) : displayTasks.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 border-dashed rounded-2xl">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-1">Tidak ada task</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Belum ada task yang sesuai dengan kriteria. Buat task baru untuk mulai mengelola pekerjaan Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {showForm && (
          <TaskForm
            initialData={editTarget}
            onSubmit={editTarget ? handleUpdate : handleCreate}
            onCancel={handleCloseForm}
          />
        )}
      </main>
    </div>
  );
}