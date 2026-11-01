import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  User,
  Users,
  Shield,
  Calendar,
  CheckCircle,
  AlertCircle,
  GitFork,
} from 'lucide-react';

// Single recursive tree node
const TreeNode = ({ node, isRoot = false }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-0 before:w-px before:bg-white/10 last:before:hidden">
      <div className="flex items-center gap-3 py-2 group">
        {/* Toggle expand/collapse button */}
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <span className="w-6 h-6 rounded-lg bg-slate-800/80 text-slate-500 flex items-center justify-center shrink-0">
            •
          </span>
        )}

        {/* User Node Card */}
        <div
          className={`flex-1 p-3.5 rounded-2xl glass-card border transition-all duration-200 ${
            isRoot
              ? 'border-indigo-500/50 bg-indigo-950/40 shadow-glow'
              : 'border-white/5 hover:border-indigo-500/30'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  isRoot
                    ? 'bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {node.fullName?.slice(0, 2).toUpperCase() || 'US'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{node.fullName}</h4>
                  {isRoot ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Root (You)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Tier {node.level}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-mono">{node.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-mono bg-white/5 px-2.5 py-1 rounded-lg">
                <span className="text-slate-500 text-[10px]">CODE:</span>
                <span className="text-slate-200 font-bold">{node.referralCode}</span>
              </div>

              {hasChildren && (
                <div className="flex items-center gap-1 text-indigo-400 font-medium text-[11px]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{node.children.length} {node.children.length === 1 ? 'Downline' : 'Downlines'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render children recursively if expanded */}
      {hasChildren && expanded && (
        <div className="mt-1 space-y-1">
          {node.children.map((child) => (
            <TreeNode key={child.id || child.email} node={child} isRoot={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export const ReferralTreeViewer = ({ treeData, loading }) => {
  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs">Traversing and compiling downline hierarchy...</p>
      </div>
    );
  }

  if (!treeData) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        No referral hierarchy data available yet. Share your referral link to build your tree!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-indigo-400" />
          <span>Interactive 5-Level Recursive Explorer</span>
        </div>
        <span className="text-[11px] text-slate-500">Click arrow icons to expand / collapse branches</span>
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/60 border border-white/5 overflow-x-auto">
        <TreeNode node={treeData} isRoot={true} />
      </div>
    </div>
  );
};
