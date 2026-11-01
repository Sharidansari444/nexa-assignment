import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Cpu, GitFork, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#05080f] border-t border-white/5 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">NEXACHAIN AI</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Enterprise-grade automated yield generation, multi-tier referral tree economics, and idempotent financial computing built on the MERN stack.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational & Synced
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">Platform Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/#plans" className="hover:text-indigo-400 transition-colors">Automated Yield Plans</Link></li>
              <li><Link to="/#referrals" className="hover:text-indigo-400 transition-colors">5-Tier Referral Tree</Link></li>
              <li><Link to="/#security" className="hover:text-indigo-400 transition-colors">Idempotent Cron Engine</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Investor Dashboard</Link></li>
            </ul>
          </div>

          {/* Architecture Highlights */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero Hardcoding Standard</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Atomic MongoDB Operations</span>
              </li>
              <li className="flex items-center gap-2">
                <GitFork className="w-3.5 h-3.5 text-purple-400" />
                <span>Recursive Hierarchy Builder</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono text-[10px]">WINSTON</span>
                <span>Structured Log Rotation</span>
              </li>
            </ul>
          </div>

          {/* Admin & Security */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">Access & Portal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/admin/login" className="text-amber-400/90 hover:text-amber-300 font-medium transition-colors">Super Admin Portal &rarr;</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Create Investor Account</Link></li>
              <li><a href="#plans" className="hover:text-indigo-400 transition-colors">ROI Daily Rate Matrix</a></li>
            </ul>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400">
              Assessment Edition developed for <span className="text-white font-semibold">Nexachain AI</span>.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} NexaChain AI. Built with MERN Stack + TailwindCSS + Framer Motion.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
