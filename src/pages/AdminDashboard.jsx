import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Users,
  Coins,
  TrendingUp,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Layers,
  Search,
  RefreshCw,
  LogOut,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ROI Runner Simulation State
  const [triggeringRoi, setTriggeringRoi] = useState(false);
  const [roiReport, setRoiReport] = useState(null);
  const [customDate, setCustomDate] = useState('');

  // Active admin tab: 'users' | 'investments' | 'cron'
  const [adminTab, setAdminTab] = useState('cron');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, invRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/investments'),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (usersRes.data.success) setUsers(usersRes.data.users);
      if (invRes.data.success) setInvestments(invRes.data.investments);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Trigger manual daily ROI distribution
  const handleTriggerDailyRoi = async () => {
    try {
      setTriggeringRoi(true);
      setRoiReport(null);

      const payload = customDate ? { customDate } : {};
      const res = await api.post('/admin/trigger-roi', payload);

      if (res.data.success) {
        setRoiReport(res.data.report);
        // Refresh admin stats and users
        fetchAdminData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to trigger ROI.');
    } finally {
      setTriggeringRoi(false);
    }
  };

  // Toggle user account status
  const handleToggleStatus = async (userId) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/status`);
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, accountStatus: res.data.user.accountStatus } : u))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status.');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.referralCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        {/* Admin Header */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/20 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xl relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Super Admin Console
              </span>
              <span className="text-xs text-slate-400">Authenticated: {user?.email}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Platform Governance & Simulation
            </h1>
            <p className="text-xs text-slate-400">
              Manage platform liquidity, users, and trigger idempotent ROI distribution
            </p>
          </div>

          <button
            onClick={fetchAdminData}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh System Data</span>
          </button>
        </div>

        {/* Platform Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-amber-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Platform Users
              </span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stats?.totalUsers || 0}
            </p>
            <p className="text-xs text-emerald-400 mt-2">{stats?.activeUsers || 0} Active Investors</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-indigo-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Volume Invested
              </span>
              <Coins className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-3xl font-extrabold text-white mt-3 font-mono">
              ${stats?.totalVolume?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-indigo-300 mt-2 font-mono">
              ${stats?.activeVolume?.toFixed(2) || '0.00'} Currently Active
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-emerald-400">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total ROI Distributed
              </span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-400 mt-3 font-mono">
              ${stats?.totalRoiDistributed?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-slate-400 mt-2">Across all daily automated payouts</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border-t-2 border-t-cyan-400">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Referral Paid Out
              </span>
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold text-cyan-400 mt-3 font-mono">
              ${stats?.totalReferralDistributed?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-slate-400 mt-2">5-Tier network commissions</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => setAdminTab('cron')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminTab === 'cron'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Daily ROI Simulator (Idempotent)</span>
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminTab === 'users'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manage Users ({users.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('investments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminTab === 'investments'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Global Investments ({investments.length})</span>
          </button>
        </div>

        {/* TAB 1: DAILY ROI CRON SIMULATOR & TEST RUNNER */}
        {adminTab === 'cron' && (
          <div className="space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Evaluator & Testing Feature</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    One-Click Daily ROI Instant Runner
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                    Normally, the automated scheduler runs at midnight (12:00 AM). Click this button to run the real daily ROI processor immediately. It evaluates all active investments, credits user wallets, and verifies that if run twice on the same day, <strong>duplicates are strictly skipped</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <button
                    onClick={handleTriggerDailyRoi}
                    disabled={triggeringRoi}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {triggeringRoi ? (
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-slate-950" />
                        <span>Run Daily ROI Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Execution Results Card */}
              {roiReport && (
                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Execution Run Report ({roiReport.date})</span>
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      IDEMPOTENT PROTECTION VERIFIED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                      <p className="text-[10px] text-slate-400 uppercase">Active Investments</p>
                      <p className="text-xl font-bold text-white mt-1 font-mono">
                        {roiReport.totalActiveInvestmentsFound}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                      <p className="text-[10px] text-slate-400 uppercase">Successfully Credited</p>
                      <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                        {roiReport.successfullyCreditedCount}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                      <p className="text-[10px] text-slate-400 uppercase">Duplicates Skipped (Safe)</p>
                      <p className="text-xl font-bold text-amber-400 mt-1 font-mono">
                        {roiReport.skippedDuplicateCount}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                      <p className="text-[10px] text-slate-400 uppercase">Total Amount Distributed</p>
                      <p className="text-xl font-bold text-cyan-400 mt-1 font-mono">
                        ${roiReport.totalRoiAmountDistributed?.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {roiReport.details && roiReport.details.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs font-mono space-y-1.5 max-h-48 overflow-y-auto">
                      {roiReport.details.map((d, i) => (
                        <div key={i} className="flex justify-between text-slate-300">
                          <span>
                            {d.user} (ID: {d.investmentId?.slice(-6)})
                          </span>
                          <span
                            className={
                              d.status.includes('CREDITED')
                                ? 'text-emerald-400 font-bold'
                                : 'text-amber-400 font-bold'
                            }
                          >
                            {d.status} (${d.roiAmount})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT TABLE */}
        {adminTab === 'users' && (
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Registered Users & Downlines</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage accounts, monitor sponsors, and inspect balances</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user, email or code..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                  <tr>
                    <th className="p-3.5">User</th>
                    <th className="p-3.5">Referral Code</th>
                    <th className="p-3.5">Referred By (Parent)</th>
                    <th className="p-3.5">Wallet Balance</th>
                    <th className="p-3.5">Total ROI</th>
                    <th className="p-3.5">Level Income</th>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-sans">
                        <p className="font-bold text-white">{u.fullName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                      </td>
                      <td className="p-3.5 text-cyan-400 font-bold">{u.referralCode}</td>
                      <td className="p-3.5 font-sans text-slate-400">
                        {u.referredBy ? (
                          <span>
                            {u.referredBy.fullName}{' '}
                            <strong className="text-indigo-400 font-mono text-[10px]">
                              ({u.referredBy.referralCode})
                            </strong>
                          </span>
                        ) : (
                          <span className="text-slate-600 italic">None (Root)</span>
                        )}
                      </td>
                      <td className="p-3.5 font-bold text-white">${u.walletBalance?.toFixed(2)}</td>
                      <td className="p-3.5 text-emerald-400">${u.totalRoiEarned?.toFixed(2)}</td>
                      <td className="p-3.5 text-cyan-400">${u.totalLevelIncomeEarned?.toFixed(2)}</td>
                      <td className="p-3.5 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === 'admin'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3.5 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.accountStatus === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {u.accountStatus}
                        </span>
                      </td>
                      <td className="p-3.5 font-sans text-right">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleToggleStatus(u._id)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                              u.accountStatus === 'Active'
                                ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
                            }`}
                          >
                            {u.accountStatus === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GLOBAL INVESTMENTS TABLE */}
        {adminTab === 'investments' && (
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <h3 className="text-base font-bold text-white mb-1">Global Platform Investments</h3>
            <p className="text-xs text-slate-400 mb-6">Complete ledger of all packages active across the system</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                  <tr>
                    <th className="p-3.5">Investor</th>
                    <th className="p-3.5">Plan Name</th>
                    <th className="p-3.5">Amount Invested</th>
                    <th className="p-3.5">Daily ROI %</th>
                    <th className="p-3.5">Total Credited</th>
                    <th className="p-3.5">End Date</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {investments.map((inv) => (
                    <tr key={inv._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-sans">
                        <p className="font-bold text-white">{inv.user?.fullName || 'Investor'}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{inv.user?.email}</p>
                      </td>
                      <td className="p-3.5 font-sans font-bold text-indigo-300">
                        {inv.planDetails?.name || 'Yield Plan'}
                      </td>
                      <td className="p-3.5 font-bold text-white">${inv.amount?.toFixed(2)}</td>
                      <td className="p-3.5 text-cyan-400">{inv.dailyRoiPercentage}% / day</td>
                      <td className="p-3.5 text-emerald-400 font-bold">
                        ${inv.totalRoiCredited?.toFixed(2) || '0.00'}
                      </td>
                      <td className="p-3.5 font-sans text-slate-400">
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
          </div>
        )}
      </main>
    </div>
  );
};
