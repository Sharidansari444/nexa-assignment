import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Users, Coins, TrendingUp, Layers, Zap, ArrowUpRight, RefreshCw } from 'lucide-react';

export const AdminOverviewView = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            <span>Platform Overview & Liquidity Metrics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time aggregate data across all registered investors, active packages, and total payouts
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 4 Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Users
            </span>
            <Users className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono">
            {stats?.totalUsers || 0}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-emerald-400">
            <span>{stats?.activeUsers || 0} Active Investors</span>
            <Link to="/admin/users" className="text-amber-400 hover:underline flex items-center gap-0.5">
              <span>Manage</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-indigo-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Volume Invested
            </span>
            <Coins className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono">
            ${stats?.totalVolume?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-indigo-300 font-mono">
            <span>${stats?.activeVolume?.toFixed(2) || '0.00'} Active</span>
            <Link to="/admin/investments" className="text-indigo-400 hover:underline flex items-center gap-0.5">
              <span>Ledger</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-emerald-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total ROI Distributed
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">
            ${stats?.totalRoiDistributed?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Automated Daily Payouts</span>
            <Link to="/admin/cron" className="text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>Runner</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-cyan-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Level Commissions Paid
            </span>
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-cyan-400 mt-2 font-mono">
            ${stats?.totalReferralDistributed?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 text-xs text-slate-400">
            5-Tier Network Distributions
          </div>
        </div>
      </div>

      {/* Simulator Shortcut Banner */}
      <div className="p-6 rounded-3xl glass-card border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Automated Cron Scheduler Simulation
          </span>
          <h3 className="text-base font-bold text-white mt-2">
            Evaluate Idempotent Daily ROI Engine Right Now
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Simulate the midnight scheduler manually with a single click to inspect active package distribution and duplicate prevention.
          </p>
        </div>

        <Link
          to="/admin/cron"
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2 shrink-0"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Launch Simulator</span>
        </Link>
      </div>
    </div>
  );
};
