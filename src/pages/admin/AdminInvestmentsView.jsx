import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Coins, RefreshCw } from 'lucide-react';

export const AdminInvestmentsView = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/investments');
      if (res.data.success) {
        setInvestments(res.data.investments || []);
      }
    } catch (err) {
      console.error('Failed to load all investments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const totalVolume = investments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-amber-400" />
            <span>Global Investments Ledger</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete database of all active and completed capital packages across the platform
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-mono font-bold">
            Total Capital: ${totalVolume.toFixed(2)}
          </div>
          <button
            onClick={fetchInvestments}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors shrink-0"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/5 w-full">
        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Loading global investment records...</p>
          </div>
        ) : investments.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No investments active in the platform yet.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                <tr>
                  <th className="p-3.5">Investor</th>
                  <th className="p-3.5">Plan Name</th>
                  <th className="p-3.5">Amount Invested</th>
                  <th className="p-3.5">Daily ROI %</th>
                  <th className="p-3.5">Total Credited</th>
                  <th className="p-3.5">Start Date</th>
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
                      {new Date(inv.startDate).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-sans text-slate-400">
                      {new Date(inv.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-sans">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
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
    </div>
  );
};
