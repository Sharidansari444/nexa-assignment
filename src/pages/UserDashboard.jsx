import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  TrendingUp,
  Wallet,
  Coins,
  Users,
  Copy,
  Check,
  PlusCircle,
  Clock,
  ArrowUpRight,
  GitFork,
  BarChart3,
  Calendar,
  Layers,
  Sparkles,
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
import { ReferralTreeViewer } from '../components/dashboard/ReferralTreeViewer';
import { InvestModal } from '../components/dashboard/InvestModal';
import { Navbar } from '../components/common/Navbar';

export const UserDashboard = () => {
  const { user, refreshProfile } = useAuth();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [roiHistory, setRoiHistory] = useState([]);
  const [referralHistory, setReferralHistory] = useState([]);
  const [treeData, setTreeData] = useState(null);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'investments' | 'tree' | 'roi' | 'referrals'
  const [loading, setLoading] = useState(true);
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch all dashboard data concurrently
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, invRes, roiRes, refRes, treeRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/investments'),
        api.get('/roi/history'),
        api.get('/referrals/history'),
        api.get('/referrals/tree'),
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
        setChartData(statsRes.data.chartData || []);
      }
      if (invRes.data.success) setInvestments(invRes.data.investments || []);
      if (roiRes.data.success) setRoiHistory(roiRes.data.history || []);
      if (refRes.data.success) setReferralHistory(refRes.data.history || []);
      if (treeRes.data.success) setTreeData(treeRes.data.tree || null);

      await refreshProfile();
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const referralLink = `${window.location.origin}/register?ref=${user?.referralCode || ''}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        {/* User Greeting & Referral Share Bar */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Portfolio
              </span>
              <span className="text-xs text-slate-400">Status: Active Investor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-xs text-slate-400">
              Personal Referral Code: <strong className="text-cyan-400 font-mono">{user?.referralCode}</strong>
            </p>
          </div>

          {/* Action Buttons & Share Widget */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto relative z-10">
            {/* Copy Referral Link Box */}
            <div className="flex items-center bg-slate-900/90 border border-slate-700/60 rounded-xl px-3 py-2 text-xs">
              <span className="text-slate-400 mr-2 hidden sm:inline">Invite:</span>
              <span className="text-indigo-300 font-mono truncate max-w-[180px] mr-2">
                {referralLink}
              </span>
              <button
                onClick={copyReferralLink}
                className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors shrink-0 flex items-center gap-1 font-semibold text-[11px]"
                title="Copy Referral Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Invest Button */}
            <button
              onClick={() => setInvestModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:shadow-cyanGlow transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Activate Plan</span>
            </button>
          </div>
        </div>

        {/* 4 Core Stat Cards (Task 4 requirement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Total Investments */}
          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-indigo-500 relative transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Investments
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white mt-3 font-mono">
              ${stats?.totalInvestments?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-indigo-300 mt-2 flex items-center gap-1">
              <span className="font-bold">{stats?.activeInvestmentsCount || 0}</span> Active Packages
            </p>
          </div>

          {/* Card 2: Daily ROI Accumulation */}
          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-emerald-400 relative transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Daily ROI Earned
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white mt-3 font-mono text-emerald-400">
              ${stats?.totalRoiEarned?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-emerald-300 mt-2 flex items-center gap-1">
              <span className="font-bold font-mono">+${stats?.dailyRoiRate?.toFixed(2) || '0.00'}</span> / daily scheduled
            </p>
          </div>

          {/* Card 3: Total Level / Referral Income */}
          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-cyan-400 relative transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Level Income
              </span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white mt-3 font-mono text-cyan-400">
              ${stats?.totalLevelIncomeEarned?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-cyan-300 mt-2 flex items-center gap-1">
              <span className="font-bold">{stats?.directReferralsCount || 0}</span> Direct Referrals
            </p>
          </div>

          {/* Card 4: Current Wallet Balance */}
          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-amber-400 relative transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Wallet Balance
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white mt-3 font-mono">
              ${stats?.walletBalance?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              Available for re-investing
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('investments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'investments'
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>My Investments ({investments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tree')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tree'
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>Referral Tree Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'roi'
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>ROI Credit History ({roiHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'referrals'
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Level Commissions ({referralHistory.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS CHARTS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Visual Earnings Representation (Chart) */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    <span>7-Day Earnings Trajectory (Daily ROI vs Level Commissions)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Visualized timeline of revenue generated across your portfolio
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                    <span className="text-slate-300">Daily ROI</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                    <span className="text-slate-300">Referral Commissions</span>
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
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="roi"
                      name="Daily ROI ($)"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#roiGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="referral"
                      name="Level Commission ($)"
                      stroke="#00f0ff"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#refGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Tables preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent ROI Payouts */}
              <div className="glass-card p-6 rounded-3xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Recent Automated ROI Payouts</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('roi')}
                    className="text-xs text-indigo-400 hover:underline font-semibold"
                  >
                    View All &rarr;
                  </button>
                </div>

                {roiHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No ROI credited yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {roiHistory.slice(0, 4).map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs"
                      >
                        <div>
                          <p className="font-semibold text-white">Daily ROI Distribution</p>
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

              {/* Recent Referral Commissions */}
              <div className="glass-card p-6 rounded-3xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Recent Referral Commissions</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('referrals')}
                    className="text-xs text-indigo-400 hover:underline font-semibold"
                  >
                    View All &rarr;
                  </button>
                </div>

                {referralHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No commissions earned yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {referralHistory.slice(0, 4).map((item) => (
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
        )}

        {/* TAB 2: MY INVESTMENTS TABLE */}
        {activeTab === 'investments' && (
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Active & Completed Investments</h3>
                <p className="text-xs text-slate-400 mt-0.5">Your complete capital portfolio lifecycle</p>
              </div>
              <button
                onClick={() => setInvestModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Investment</span>
              </button>
            </div>

            {investments.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                You have not activated any investments yet.{' '}
                <button
                  onClick={() => setInvestModalOpen(true)}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  Activate your first plan now
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                    <tr>
                      <th className="p-3.5">Plan Name</th>
                      <th className="p-3.5">Invested Amount</th>
                      <th className="p-3.5">Daily ROI Rate</th>
                      <th className="p-3.5">Total Credited</th>
                      <th className="p-3.5">Start Date</th>
                      <th className="p-3.5">End Date</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {investments.map((inv) => (
                      <tr key={inv._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-sans font-bold text-white">
                          {inv.planDetails?.name || 'Yield Plan'}
                        </td>
                        <td className="p-3.5 font-bold text-slate-100">${inv.amount?.toFixed(2)}</td>
                        <td className="p-3.5 text-cyan-400">{inv.dailyRoiPercentage}% / day</td>
                        <td className="p-3.5 text-emerald-400 font-bold">
                          ${inv.totalRoiCredited?.toFixed(2) || '0.00'}
                        </td>
                        <td className="p-3.5 text-slate-400 font-sans">
                          {new Date(inv.startDate).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 text-slate-400 font-sans">
                          {new Date(inv.endDate).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              inv.investmentStatus === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {inv.investmentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REFERRAL TREE EXPLORER */}
        {activeTab === 'tree' && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="mb-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitFork className="w-5 h-5 text-indigo-400" />
                <span>Recursive Downline Referral Tree</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Visual representation of your complete 5-tier referral hierarchy and their network branches
              </p>
            </div>

            <ReferralTreeViewer treeData={treeData} loading={loading} />
          </div>
        )}

        {/* TAB 4: ROI CREDIT HISTORY */}
        {activeTab === 'roi' && (
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <h3 className="text-base font-bold text-white mb-2">Automated Daily ROI Payout History</h3>
            <p className="text-xs text-slate-400 mb-6">
              Audit log of daily returns distributed by the idempotent midnight cron engine
            </p>

            {roiHistory.length === 0 ? (
              <p className="text-center py-12 text-slate-400 text-xs">No ROI history records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                    <tr>
                      <th className="p-3.5">Execution Date</th>
                      <th className="p-3.5">Investment Reference</th>
                      <th className="p-3.5">Daily ROI Amount</th>
                      <th className="p-3.5">Idempotency Date Key</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {roiHistory.map((item) => (
                      <tr key={item._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-sans text-slate-300">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 font-sans font-bold text-white">
                          {item.investment?.planDetails?.name || 'Investment Plan'}
                        </td>
                        <td className="p-3.5 text-emerald-400 font-bold text-sm">
                          +${item.roiAmount.toFixed(2)}
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono text-[11px]">{item.dateString}</td>
                        <td className="p-3.5 font-sans">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: REFERRAL LEVEL COMMISSIONS */}
        {activeTab === 'referrals' && (
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <h3 className="text-base font-bold text-white mb-2">Multi-Tier Level Commission History</h3>
            <p className="text-xs text-slate-400 mb-6">
              Commissions generated across 5 generation levels upon downline package activations
            </p>

            {referralHistory.length === 0 ? (
              <p className="text-center py-12 text-slate-400 text-xs">
                No referral commissions earned yet. Invite partners using your referral link!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Commission Level</th>
                      <th className="p-3.5">Generated From</th>
                      <th className="p-3.5">Rate Applied</th>
                      <th className="p-3.5">Commission Credited</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {referralHistory.map((item) => (
                      <tr key={item._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-sans text-slate-300">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 font-sans">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            Tier {item.level}
                          </span>
                        </td>
                        <td className="p-3.5 font-sans">
                          <p className="font-bold text-white">{item.fromUser?.fullName || 'Downline User'}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{item.fromUser?.email}</p>
                        </td>
                        <td className="p-3.5 text-indigo-400">{item.commissionPercentage}%</td>
                        <td className="p-3.5 text-cyan-400 font-bold text-sm">
                          +${item.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Invest Modal */}
      <InvestModal
        isOpen={investModalOpen}
        onClose={() => setInvestModalOpen(false)}
        onSuccess={loadDashboardData}
      />
    </div>
  );
};
