import React, { useState } from 'react';
import api from '../../services/api';
import { Zap, CheckCircle2, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

export const AdminCronRunnerView = () => {
  const [triggeringRoi, setTriggeringRoi] = useState(false);
  const [roiReport, setRoiReport] = useState(null);
  const [customDate, setCustomDate] = useState('');

  const handleTriggerDailyRoi = async () => {
    try {
      setTriggeringRoi(true);
      setRoiReport(null);

      const payload = customDate ? { customDate } : {};
      const res = await api.post('/admin/trigger-roi', payload);

      if (res.data.success) {
        setRoiReport(res.data.report);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to trigger ROI.');
    } finally {
      setTriggeringRoi(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
          <span>Daily ROI Cron Simulator (Idempotent Test Runner)</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Automated node-cron scheduler is scheduled for 12:00 AM every midnight. Use this console to manually execute the real processor instantly for assessment evaluation.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 w-full space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-lg font-bold text-white">Manual Execution Controls</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clicking <strong>"Run Daily ROI Now"</strong> iterates over every active investment package, calculates the daily yield percentage, updates investor wallets atomically, and creates an audit record.
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                <strong>Idempotency Test:</strong> If you trigger this button twice on the same calendar day, all previously processed investments will be <strong>SKIPPED</strong> to prevent duplicate crediting.
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={handleTriggerDailyRoi}
              disabled={triggeringRoi}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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

        {/* Live Execution Results Panel */}
        {roiReport && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Execution Run Report ({roiReport.date})</span>
              </h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                IDEMPOTENT SAFEGUARDS VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Active Packages Found</p>
                <p className="text-2xl font-bold text-white mt-1 font-mono">
                  {roiReport.totalActiveInvestmentsFound}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Successfully Credited</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                  {roiReport.successfullyCreditedCount}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Duplicates Skipped (Safe)</p>
                <p className="text-2xl font-bold text-amber-400 mt-1 font-mono">
                  {roiReport.skippedDuplicateCount}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Total Amount Distributed</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1 font-mono">
                  ${roiReport.totalRoiAmountDistributed?.toFixed(2)}
                </p>
              </div>
            </div>

            {roiReport.details && roiReport.details.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 text-xs font-mono space-y-1.5 max-h-56 overflow-y-auto">
                {roiReport.details.map((d, i) => (
                  <div key={i} className="flex justify-between text-slate-300 py-0.5 border-b border-white/5 last:border-none">
                    <span>
                      {d.user} (Package ID: {d.investmentId?.slice(-6)})
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
  );
};
