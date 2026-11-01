import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Layers, Award } from 'lucide-react';

export const UserCommissionsView = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        setLoading(true);
        const res = await api.get('/referrals/history');
        if (res.data.success) {
          setCommissions(res.data.history || []);
        }
      } catch (err) {
        console.error('Failed to load commissions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommissions();
  }, []);

  const totalCommissionSum = commissions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Multi-Tier Level Commission History</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time audit log of referral bonuses earned across 5 generation levels
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-mono font-bold">
          Total Commissions: ${totalCommissionSum.toFixed(2)}
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/5 w-full">
        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Loading level commission records...</p>
          </div>
        ) : commissions.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No referral commissions earned yet. Invite members with your referral link to earn up to 5 levels of commission!
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Tier Level</th>
                  <th className="p-3.5">Investor Name / Email</th>
                  <th className="p-3.5">Sponsor Code</th>
                  <th className="p-3.5">Package Invested</th>
                  <th className="p-3.5">Commission Rate</th>
                  <th className="p-3.5">Commission Credited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {commissions.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-sans text-slate-300">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-sans">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        Tier {item.level}
                      </span>
                    </td>
                    <td className="p-3.5 font-sans">
                      <p className="font-bold text-white">{item.fromUser?.fullName || 'Downline Member'}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{item.fromUser?.email}</p>
                    </td>
                    <td className="p-3.5 font-bold text-indigo-400">
                      {item.fromUser?.referralCode || 'N/A'}
                    </td>
                    <td className="p-3.5 font-sans text-slate-300">
                      ${item.investment?.amount?.toFixed(2) || '1,000.00'}
                    </td>
                    <td className="p-3.5 text-indigo-300">{item.commissionPercentage}%</td>
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
    </div>
  );
};
