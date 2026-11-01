import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Coins,
  TrendingUp,
  Users,
  Wallet,
  Clock,
  BarChart3,
  ArrowUpRight,
  PlusCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const UserOverviewView = () => {
  const { openInvestModal } = useOutletContext();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentRoi, setRecentRoi] = useState([]);
  const [recentReferral, setRecentReferral] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/dashboard/stats');
        if (res.data.success) {
          setStats(res.data.stats);
          setChartData(res.data.chartData || []);
          setRecentRoi(res.data.recentActivity?.recentRoi || []);
          setRecentReferral(res.data.recentActivity?.recentReferralIncome || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard overview stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 w-full">
      {/* 4 Core Stat Cards in Full Width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {/* Card 1: Total Investments */}
        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-indigo-500 relative transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Investments
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono">
            ${stats?.totalInvestments?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>{stats?.activeInvestmentsCount || 0} Active Packages</span>
            <Link to="/dashboard/investments" className="text-indigo-400 hover:underline flex items-center gap-0.5">
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Daily ROI Earned */}
        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-emerald-400 relative transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Daily ROI Earned
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono text-emerald-400">
            ${stats?.totalRoiEarned?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span className="text-emerald-300 font-mono font-bold">+${stats?.dailyRoiRate?.toFixed(2) || '0.00'}/day</span>
            <Link to="/dashboard/roi" className="text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>Audit</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Total Level Income */}
        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-cyan-400 relative transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Level Income
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono text-cyan-400">
            ${stats?.totalLevelIncomeEarned?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>{stats?.directReferralsCount || 0} Direct Invites</span>
            <Link to="/dashboard/tree" className="text-cyan-400 hover:underline flex items-center gap-0.5">
              <span>Tree</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Current Wallet Balance */}
        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-amber-400 relative transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Wallet Balance
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono">
            ${stats?.walletBalance?.toFixed(2) || '0.00'}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Instant Liquid Funds</span>
            <button onClick={openInvestModal} className="text-amber-400 hover:underline font-semibold flex items-center gap-0.5">
              <span>Invest</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Trajectory Analytics Chart */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/5 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Earnings Trajectory Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              7-Day comparison of automated daily ROI vs multi-level network commissions
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span className="text-slate-300">Daily ROI ($)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-300">Level Commissions ($)</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="refGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#00f0ff" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0f1d',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="roi"
                name="Daily ROI"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#roiGradient)"
              />
              <Area
                type="monotone"
                dataKey="referral"
                name="Level Commission"
                stroke="#00f0ff"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#refGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Columns: Recent ROI & Recent Referral Commissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Recent ROI */}
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Recent ROI Credits</span>
            </h4>
            <Link to="/dashboard/roi" className="text-xs text-indigo-400 hover:underline font-semibold">
              Full Ledger &rarr;
            </Link>
          </div>

          {recentRoi.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No automated ROI credited yet.</p>
          ) : (
            <div className="space-y-2">
              {recentRoi.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">Daily ROI Credited</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    +${item.roiAmount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Referral */}
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Recent Referral Commissions</span>
            </h4>
            <Link to="/dashboard/commissions" className="text-xs text-indigo-400 hover:underline font-semibold">
              Full Ledger &rarr;
            </Link>
          </div>

          {recentReferral.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No referral income recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {recentReferral.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        Tier {item.level}
                      </span>
                      <span className="text-white font-semibold">{item.fromUser?.fullName || 'Downline'}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-cyan-400 text-sm">
                    +${item.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
