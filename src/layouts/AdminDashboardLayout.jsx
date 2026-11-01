import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  LayoutDashboard,
  Zap,
  Users,
  Coins,
  LogOut,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboardLayout = () => {
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Platform Analytics',
      icon: LayoutDashboard,
      badge: 'Live',
      end: true,
    },
    {
      to: '/admin/cron',
      label: 'Daily ROI Simulator',
      icon: Zap,
      badge: 'Test Runner',
      end: false,
    },
    {
      to: '/admin/users',
      label: 'User Governance',
      icon: Users,
      badge: null,
      end: false,
    },
    {
      to: '/admin/investments',
      label: 'Global Investments',
      icon: Coins,
      badge: null,
      end: false,
    },
  ];

  return (
    /* Viewport fixed height container with zero outer scrolling */
    <div className="h-screen w-screen overflow-hidden bg-[#050811] text-slate-100 flex flex-col tech-grid-bg">
      {/* Fixed Top Header (Non-scrollable) */}
      <header className="h-16 w-full border-b border-amber-500/20 bg-[#080d19]/90 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white hidden sm:inline">
              NEXACHAIN <span className="text-[10px] text-amber-400 font-mono">ADMIN</span>
            </span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Super Admin Console
            </span>
            <span className="text-slate-400 text-xs hidden md:inline">{user?.email}</span>
          </div>
        </div>

        {/* Top Header Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Investor View</span>
          </Link>
        </div>
      </header>

      {/* Main Two-Pane Body with STRICT INDEPENDENT SCROLLING */}
      <div className="flex-1 w-full flex overflow-hidden relative">
        {/* LEFT SIDEBAR: Fixed to remaining viewport height, independently scrollable */}
        <aside
          className={`fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] w-72 lg:w-80 bg-[#070c18]/98 backdrop-blur-2xl border-r border-amber-500/10 flex flex-col justify-between z-30 transition-transform duration-300 shrink-0 overflow-y-auto ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Scrollable Upper Section of Sidebar */}
          <div className="p-5 space-y-6 flex-1">
            {/* Quick Admin Simulator Card */}
            <div className="p-4 rounded-2xl glass-card border border-amber-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-amber-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  <span>ROI Simulation</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold font-mono">READY</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Execute idempotent daily ROI distributions manually for instant evaluation.
              </p>
              <NavLink
                to="/admin/cron"
                onClick={() => setMobileSidebarOpen(false)}
                className="w-full mt-3 py-2 px-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Open ROI Simulator</span>
              </NavLink>
            </div>

            {/* Navigation Routes List */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">
                Admin Modules
              </p>
              <nav className="space-y-1.5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 border border-amber-500/40 shadow-lg font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Fixed Bottom Footer of Sidebar */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between shrink-0 bg-[#070c18]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold">
                SA
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Super Admin</span>
                <span className="text-[10px] text-slate-500 truncate max-w-[130px]">{user?.email}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* MAIN PAGE CONTENT: Independently scrollable container */}
        <main className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
