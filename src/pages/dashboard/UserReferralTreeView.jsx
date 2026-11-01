import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { GitFork, Users, Sparkles, Copy, Check } from 'lucide-react';
import { ReferralTreeViewer } from '../../components/dashboard/ReferralTreeViewer';
import { useAuth } from '../../context/AuthContext';

export const UserReferralTreeView = () => {
  const { user } = useAuth();
  const [treeData, setTreeData] = useState(null);
  const [directCount, setDirectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}/register?ref=${user?.referralCode || ''}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchTree = async () => {
      try {
        setLoading(true);
        const [treeRes, directRes] = await Promise.all([
          api.get('/referrals/tree?depth=5'),
          api.get('/referrals/direct'),
        ]);

        if (treeRes.data.success) setTreeData(treeRes.data.tree || null);
        if (directRes.data.success) setDirectCount(directRes.data.count || 0);
      } catch (err) {
        console.error('Failed to load referral tree:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <GitFork className="w-6 h-6 text-indigo-400" />
            <span>Recursive Downline Referral Tree</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visual hierarchy of your direct invites and up to 5 generation levels of downlines
          </p>
        </div>

        {/* Sponsor Code Quick Share */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/60 text-xs text-slate-300 font-mono">
            Code: <strong className="text-cyan-400">{user?.referralCode}</strong>
          </div>
          <button
            onClick={copyReferralLink}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Invite'}</span>
          </button>
        </div>
      </div>

      {/* Network Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="glass-card p-4 rounded-2xl border border-white/5">
          <p className="text-slate-400 text-xs">Direct Referrals (Level 1)</p>
          <p className="text-2xl font-extrabold text-white mt-1 font-mono">{directCount}</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/5">
          <p className="text-slate-400 text-xs">Commission Slabs</p>
          <p className="text-xs text-cyan-400 mt-1 font-bold">5% &rarr; 3% &rarr; 2% &rarr; 1% &rarr; 0.5%</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/5">
          <p className="text-slate-400 text-xs">Accumulated Level Income</p>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
            ${user?.totalLevelIncomeEarned?.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      {/* Tree Visualization Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 w-full">
        <ReferralTreeViewer treeData={treeData} loading={loading} />
      </div>
    </div>
  );
};
