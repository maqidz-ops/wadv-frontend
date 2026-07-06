import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserPlus, AlertCircle, Loader2 } from "lucide-react";

export function RegisterPage() {
  const { register: registerAuth, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  // Redirect jika sudah login
  if (user) return <Navigate to="/tasks" replace />;

  const password = watch("password");

  const onSubmit = async ({ name, email, password }) => {
    try {
      setError("");
      await registerAuth(name, email, password);
      navigate("/login", {
        state: {
          message: "Registrasi berhasil! Silakan login.",
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.error?.message || "Registrasi gagal. Coba lagi."
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-400/20 blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 z-10 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 text-white mb-6 shadow-lg shadow-slate-500/30">
              <UserPlus size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Buat Akun Baru</h2>
            <p className="mt-2 text-sm text-slate-600">
              Mulai kelola tugas Anda dengan lebih efisien hari ini.
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-white">
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-rose-700 font-medium">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Nama Lengkap
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      type="text"
                      className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm text-slate-900"
                      placeholder="John Doe"
                      {...register("name", { required: "Nama wajib diisi" })}
                    />
                  </div>
                  {errors.name && <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.name.message}</span>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Alamat Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm text-slate-900"
                      placeholder="john@example.com"
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
                      className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm text-slate-900"
                      {...register("password", { 
                        required: "Password wajib diisi",
                        minLength: { value: 8, message: "Minimal 8 karakter" }
                      })}
                    />
                  </div>
                  {errors.password && <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.password.message}</span>}
                </div>

                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium text-slate-700">
                    Konfirmasi Kata Sandi
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm"
                      type="password"
                      className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all sm:text-sm text-slate-900"
                      {...register("confirm", { 
                        required: "Konfirmasi password wajib diisi",
                        validate: (v) => v === password || "Password tidak cocok"
                      })}
                    />
                  </div>
                  {errors.confirm && <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.confirm.message}</span>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Memproses...
                      </>
                    ) : (
                      "Daftar Akun"
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <p className="mt-8 text-center text-sm text-slate-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Side Image area - hidden on mobile */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-100">
        <div className="absolute inset-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-12">
            <div className="max-w-xl text-center">
              <h3 className="text-3xl font-bold text-white mb-6">Kolaborasi yang Lebih Baik</h3>
              <p className="text-slate-200 text-lg leading-relaxed">
                Bergabunglah dengan ribuan pengguna lain yang telah menggunakan WAD Task Manager untuk mengatur pekerjaan mereka menjadi lebih rapi dan terstruktur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}