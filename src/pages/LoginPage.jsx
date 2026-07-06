import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";

export function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Redirect jika sudah login
  if (user) return <Navigate to="/tasks" replace />;

  const onSubmit = async ({ email, password }) => {
    try {
      setError("");
      await login(email, password);
      navigate("/tasks");
    } catch (err) {
      setError(
        err.response?.data?.error?.message || "Login gagal. Coba lagi."
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-400/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 z-10 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 text-white mb-6 shadow-lg shadow-primary-500/30">
              <LogIn size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Selamat Datang Kembali</h2>
            <p className="mt-2 text-sm text-slate-600">
              Masuk ke akun Anda untuk mengelola pekerjaan.
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-white">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-rose-700 font-medium">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Alamat Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm text-slate-900"
                      {...register("email", { required: "Email wajib diisi" })}
                    />
                  </div>
                  {errors.email && <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.email.message}</span>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Kata Sandi
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm text-slate-900"
                      {...register("password", { required: "Password wajib diisi" })}
                    />
                  </div>
                  {errors.password && <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.password.message}</span>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Memproses...
                      </>
                    ) : (
                      "Masuk ke Akun"
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <p className="mt-8 text-center text-sm text-slate-600">
              Belum punya akun?{" "}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Side Image area - hidden on mobile */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-900">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-12">
          {/* Abstract geometric illustration using Tailwind */}
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-emerald-400 rounded-[3rem] rotate-6 opacity-80 blur-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-emerald-500 rounded-[3rem] rotate-3 shadow-2xl flex flex-col justify-between p-12 text-white border border-white/20 backdrop-blur-sm">
              <div>
                <h3 className="text-4xl font-bold tracking-tight mb-4">WAD Task Manager</h3>
                <p className="text-primary-100 text-lg">Platform manajemen tugas yang dirancang untuk meningkatkan produktivitas tim Anda.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-md">
                  <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Real-time Sinkronisasi</h4>
                    <p className="text-sm text-primary-100">Tetap up-to-date tanpa perlu refresh.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}