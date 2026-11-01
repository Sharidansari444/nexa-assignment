import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Shield,
  Users,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                NEXACHAIN <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-semibold tracking-wider">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Yield & Referral Platform</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <a href="#plans" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Yield Plans
            </a>
            <a href="#referrals" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Multi-Level Referral
            </a>
            <a href="#security" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Idempotent Engine
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}

                <div className="text-right">
                  <p className="text-xs font-bold text-white">{user?.fullName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">${user?.walletBalance?.toFixed(2) || '0.00'}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-glow hover:shadow-cyanGlow transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white"
          >
            Home
          </Link>
          <a
            href="#plans"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white"
          >
            Yield Plans
          </a>
          <a
            href="#referrals"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white"
          >
            Multi-Level Referral
          </a>
          <a
            href="#security"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white"
          >
            Security & Idempotency
          </a>

          <div className="pt-4 border-t border-white/10 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center font-semibold rounded-xl bg-indigo-600 text-white"
                >
                  {isAdmin ? 'Admin Panel' : 'User Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full py-2.5 text-center font-semibold rounded-xl bg-white/5 text-rose-400 hover:bg-rose-500/10"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center font-semibold rounded-xl bg-white/5 text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-glow"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
