import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { UserCircle, Mail, Shield, CalendarDays } from "lucide-react";

export function ProfilePage() {
  const { user } = useAuth();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Profil Saya</h1>
          <p className="text-slate-500 mt-1">Kelola informasi akun dan preferensi Anda.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row gap-8 relative z-10">
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-5xl font-bold shadow-md shadow-primary-500/20 ring-4 ring-primary-50">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${user?.role === 'ADMIN' ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700'}`}>
                {user?.role}
              </span>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <UserCircle size={16} />
                    <span className="text-sm font-medium">Nama Lengkap</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">{user?.name}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Mail size={16} />
                    <span className="text-sm font-medium">Alamat Email</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">{user?.email}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <CalendarDays size={16} />
                    <span className="text-sm font-medium">Tanggal Bergabung</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">
                    {user?.createdAt ? formatDate(user.createdAt) : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}