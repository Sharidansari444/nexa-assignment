import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  TrendingUp,
  LayoutDashboard,
  Coins,
  GitFork,
  Clock,
  Users,
  Copy,
  Check,
  PlusCircle,
  LogOut,
  Wallet,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { InvestModal } from '../components/dashboard/InvestModal';

export const UserDashboardLayout = () => {
  const { user, logout, refreshProfile } = useAuth();
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const referralLink = `${window.location.origin}/register?ref=${user?.referralCode || ''}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    {
      to: '/dashboard',
      label: 'Overview & Analytics',
      icon: LayoutDashboard,
      badge: 'Live',
      end: true,
    },
    {
      to: '/dashboard/investments',
      label: 'My Investments',
      icon: Coins,
      badge: null,
      end: false,
    },
    {
      to: '/dashboard/tree',
      label: 'Referral Tree Explorer',
      icon: GitFork,
      badge: '5 Tiers',
      end: false,
    },
    {
      to: '/dashboard/roi',
      label: 'Daily ROI Payouts',
      icon: Clock,
      badge: null,
      end: false,
    },
    {
      to: '/dashboard/commissions',
      label: 'Level Commissions',
      icon: Users,
      badge: null,
      end: false,
    },
  ];

  return (
    /* Viewport fixed height container with zero outer scrolling */
    <div className="h-screen w-screen overflow-hidden bg-[#050811] text-slate-100 flex flex-col tech-grid-bg">
      {/* Fixed Top Header (Non-scrollable) */}
      <header className="h-16 w-full border-b border-white/5 bg-[#080d19]/90 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white hidden sm:inline">
              NEXACHAIN <span className="text-[10px] text-cyan-400 font-mono">AI</span>
            </span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden md:inline text-slate-500">Investor Workspace &bull;</span>
            <span className="text-white font-medium">{user?.fullName}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>
        </div>

        {/* Top Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setInvestModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Activate Plan</span>
          </button>
        </div>
      </header>

      {/* Main Two-Pane Body with STRICT INDEPENDENT SCROLLING */}
      <div className="flex-1 w-full flex overflow-hidden relative">
        {/* LEFT SIDEBAR: Fixed to remaining viewport height, independently scrollable */}
        <aside
          className={`fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] w-72 lg:w-80 bg-[#070c18]/98 backdrop-blur-2xl border-r border-white/5 flex flex-col justify-between z-30 transition-transform duration-300 shrink-0 overflow-y-auto ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Scrollable Upper Section of Sidebar */}
          <div className="p-5 space-y-6 flex-1">
            {/* Live Wallet Card */}
            <div className="p-4 rounded-2xl glass-card border border-indigo-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Wallet Balance</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold font-mono">LIVE SYNC</span>
              </div>
              <p className="text-2xl font-extrabold text-white mt-2 font-mono">
                ${user?.walletBalance?.toFixed(2) || '0.00'}
              </p>

              <button
                onClick={() => setInvestModalOpen(true)}
                className="w-full mt-3 py-2 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Quick Deposit & Invest</span>
              </button>
            </div>

            {/* Navigation Routes List */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">
                Navigation & Routes
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
                          ? 'bg-gradient-to-r from-indigo-600/30 to-indigo-600/10 text-white border border-indigo-500/40 shadow-glow font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Referral Code Quick Copy Widget */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400 font-medium">Your Sponsor Code</span>
                <span className="text-cyan-400 font-mono font-bold">{user?.referralCode}</span>
              </div>

              <button
                onClick={copyReferralLink}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Link Copied!' : 'Copy Invite Link'}</span>
              </button>
            </div>
          </div>

          {/* Fixed Bottom Footer of Sidebar */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between shrink-0 bg-[#070c18]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-xs font-bold">
                {user?.fullName?.slice(0, 2).toUpperCase() || 'US'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white truncate max-w-[120px]">{user?.fullName}</span>
                <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{user?.email}</span>
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
          <Outlet context={{ openInvestModal: () => setInvestModalOpen(true) }} />
        </main>
      </div>

      {/* Reusable Invest Modal */}
      <InvestModal
        isOpen={investModalOpen}
        onClose={() => setInvestModalOpen(false)}
        onSuccess={() => {
          refreshProfile();
          window.location.reload();
        }}
      />
    </div>
  );
};
