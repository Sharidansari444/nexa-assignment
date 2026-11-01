import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { X, Sparkles, AlertCircle, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export const InvestModal = ({ isOpen, onClose, onSuccess }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchPlans = async () => {
        try {
          const res = await api.get('/investments/plans');
          if (res.data.success && res.data.plans.length > 0) {
            setPlans(res.data.plans);
            setSelectedPlanId(res.data.plans[0].planId);
            setAmount(res.data.plans[0].minAmount);
          }
        } catch (err) {
          setError('Failed to load investment plans.');
        }
      };
      fetchPlans();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlan = plans.find((p) => p.planId === selectedPlanId);
  const numAmount = parseFloat(amount) || 0;
  const estimatedDailyRoi = currentPlan
    ? ((numAmount * currentPlan.dailyRoiPercentage) / 100).toFixed(2)
    : '0.00';
  const estimatedTotalRoi = currentPlan
    ? (estimatedDailyRoi * currentPlan.durationDays).toFixed(2)
    : '0.00';

  const handlePlanChange = (planId) => {
    setSelectedPlanId(planId);
    const p = plans.find((item) => item.planId === planId);
    if (p) setAmount(p.minAmount);
  };

  const handleInvest = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await api.post('/investments', {
        planId: selectedPlanId,
        amount: numAmount,
      });

      if (res.data.success) {
        setSuccessMsg(res.data.message || 'Investment activated successfully!');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to activate investment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-glow">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Activate Yield Investment</h3>
            <p className="text-xs text-slate-400">Choose a package to earn automated daily returns</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleInvest} className="space-y-5">
          {/* Plan Selection Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Package Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {plans.map((p) => (
                <button
                  type="button"
                  key={p.planId}
                  onClick={() => handlePlanChange(p.planId)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedPlanId === p.planId
                      ? 'border-indigo-500 bg-indigo-600/20 shadow-glow'
                      : 'border-white/5 bg-slate-900/60 hover:border-white/20'
                  }`}
                >
                  <p className="text-xs font-bold text-white">{p.name.split(' ')[0]}</p>
                  <p className="text-base font-extrabold text-cyan-400 mt-1">{p.dailyRoiPercentage}%</p>
                  <p className="text-[10px] text-slate-400">{p.durationDays} Days</p>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Investment Amount ($)
              </label>
              {currentPlan && (
                <span className="text-[11px] text-slate-400 font-mono">
                  Min: ${currentPlan.minAmount} | Max: ${currentPlan.maxAmount}
                </span>
              )}
            </div>
            <input
              type="number"
              required
              min={currentPlan?.minAmount || 10}
              max={currentPlan?.maxAmount || 50000}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/60 rounded-xl text-base text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Payout Projection Preview */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Daily Automated ROI:</span>
              <strong className="text-emerald-400 font-mono text-sm">+${estimatedDailyRoi} / day</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Duration Term:</span>
              <strong className="text-white">{currentPlan?.durationDays || 0} Days</strong>
            </div>
            <div className="flex justify-between text-slate-300 border-t border-white/10 pt-2 font-semibold">
              <span>Projected Total Yield:</span>
              <strong className="text-cyan-400 font-mono text-sm">+${estimatedTotalRoi}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-indigo-300 bg-indigo-500/10 p-2.5 rounded-xl border border-indigo-500/20">
            <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>Referral commissions (up to 5 tiers) will be awarded to your sponsor network instantly.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-glow hover:shadow-cyanGlow transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Activate Package</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
