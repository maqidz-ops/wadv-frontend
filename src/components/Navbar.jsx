import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import { CheckCircle2, User, LogOut, LayoutDashboard, Wifi, WifiOff } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { isConnected, onlineCount } = useSocket();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-xl text-white shadow-md shadow-primary-500/20">
              <CheckCircle2 size={20} className="stroke-[2.5]" />
            </div>
            <Link to="/tasks" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
              WAD Task
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isConnected ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
              <span className="relative flex h-2.5 w-2.5">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              </span>
              <span className="flex items-center gap-1.5">
                {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
                {isConnected ? `${onlineCount} Online` : "Offline"}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Link to="/tasks" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors">
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Tasks</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors">
                <User size={18} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </div>
            
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 hidden md:block">
                Halo, {user?.name.split(' ')[0]}
              </span>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-colors border border-transparent hover:border-rose-200 group"
              >
                <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}