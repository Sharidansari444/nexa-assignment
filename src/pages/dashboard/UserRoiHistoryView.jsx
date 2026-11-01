import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Clock, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';

export const UserRoiHistoryView = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoiHistory = async () => {
      try {
        setLoading(true);
        const res = await api.get('/roi/history');
        if (res.data.success) {
          setHistory(res.data.history || []);
        }
      } catch (err) {
        console.error('Failed to load ROI history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoiHistory();
  }, []);

  const totalRoiSum = history.reduce((acc, curr) => acc + curr.roiAmount, 0);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <span>Daily ROI Payout Ledger</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Audit history of automated daily yield distributions processed at midnight
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Idempotent Midnight Distribution Verified</span>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/5 w-full">
        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs">Loading ROI audit logs...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No daily ROI payouts recorded yet. Returns are credited automatically at midnight (12:00 AM).
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/5">
                <tr>
                  <th className="p-3.5">Execution Date</th>
                  <th className="p-3.5">Investment Plan</th>
                  <th className="p-3.5">Package Capital</th>
                  <th className="p-3.5">Daily ROI Amount</th>
                  <th className="p-3.5">Idempotency Date String</th>
                  <th className="p-3.5">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {history.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-sans text-slate-300">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-sans font-bold text-white">
                      {item.investment?.planDetails?.name || 'Yield Plan'}
                    </td>
                    <td className="p-3.5 font-bold text-slate-300">
                      ${item.investment?.amount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="p-3.5 text-emerald-400 font-bold text-sm">
                      +${item.roiAmount.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{item.dateString}</td>
                    <td className="p-3.5 font-sans">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
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
    </div>
  );
};
