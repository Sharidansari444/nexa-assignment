import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../services/api';
import { Coins, PlusCircle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const UserInvestmentsView = () => {
  const { openInvestModal } = useOutletContext();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const res = await api.get('/investments');
        if (res.data.success) {
          setInvestments(res.data.investments || []);
        }
      } catch (err) {
        console.error('Failed to load investments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-indigo-400" />
            <span>My Active & Past Investments</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete capital commitment ledger, daily returns rate, and maturity schedules
          </p>
        </div>

        <button
          onClick={openInvestModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Investment Package</span>
        </button>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/5 w-full">
        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Loading investment packages...</p>
          </div>
        ) : investments.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs space-y-3">
            <p>You have not activated any yield investments yet.</p>
            <button
              onClick={openInvestModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors"
            >
              Activate Your First Plan Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                <tr>
                  <th className="p-3.5">Plan Name</th>
                  <th className="p-3.5">Invested Amount</th>
                  <th className="p-3.5">Daily ROI Rate</th>
                  <th className="p-3.5">Total Credited So Far</th>
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
                    <td className="p-3.5 font-bold text-white">${inv.amount?.toFixed(2)}</td>
                    <td className="p-3.5 text-cyan-400 font-bold">{inv.dailyRoiPercentage}% / day</td>
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
