import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Search, RefreshCw, Shield, CheckCircle2, Ban } from 'lucide-react';

export const AdminUsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      if (res.data.success) {
        setUsers(res.data.users || []);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            <span>Investor & Downline Directory</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Governance of all registered user accounts, sponsors, balances, and permissions
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or code..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={fetchUsers}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors shrink-0"
            title="Refresh Users"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/5 w-full">
        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Loading user records...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No users found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                <tr>
                  <th className="p-3.5">Investor</th>
                  <th className="p-3.5">Referral Code</th>
                  <th className="p-3.5">Sponsor (Parent)</th>
                  <th className="p-3.5">Wallet Balance</th>
                  <th className="p-3.5">Total ROI</th>
                  <th className="p-3.5">Level Income</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Account Status</th>
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
        )}
      </div>
    </div>
  );
};
