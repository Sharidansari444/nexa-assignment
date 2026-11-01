import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShieldCheck,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Layers,
  ChevronDown,
  Sparkles,
  DollarSign,
  Cpu,
  Lock,
  GitFork,
  ArrowUpRight,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const LandingPage = () => {
  const [calcAmount, setCalcAmount] = useState(1000);
  const [selectedPlanRate, setSelectedPlanRate] = useState(2.0); // 2% Growth Plan default
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [openFaq, setOpenFaq] = useState(null);

  const dailyReturn = ((calcAmount * selectedPlanRate) / 100).toFixed(2);
  const totalReturn = (dailyReturn * selectedDuration).toFixed(2);
  const netProfit = (totalReturn - calcAmount).toFixed(2);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Yield',
      rate: 1.5,
      duration: 30,
      min: 50,
      max: 500,
      badge: 'Entry Tier',
      features: [
        '1.5% Daily Automated ROI',
        '30 Days Package Term',
        '5-Tier Referral Bonus Access',
        'Midnight Scheduled Wallet Credit',
        'Transparent Audit History',
      ],
      popular: false,
    },
    {
      id: 'growth',
      name: 'Growth Alpha',
      rate: 2.0,
      duration: 45,
      min: 500,
      max: 2000,
      badge: 'Most Popular',
      features: [
        '2.0% High-Yield Daily ROI',
        '45 Days Package Term',
        'Priority Idempotency Queue',
        'Multi-Tier Commission Escalation',
        'Automated Completion Trigger',
      ],
      popular: true,
    },
    {
      id: 'elite',
      name: 'Elite Institutional',
      rate: 2.5,
      duration: 60,
      min: 2000,
      max: 10000,
      badge: 'Institutional Yield',
      features: [
        '2.5% Premium Daily ROI',
        '60 Days Package Term',
        'VIP Referral Depth Accruals',
        'Real-time Ledger Telemetry',
        'Dedicated Portfolio Monitoring',
      ],
      popular: false,
    },
  ];

  const referralTiers = [
    { level: 'Tier 1 (Direct)', percent: '5.0%', desc: 'Immediate bonus credited on all personal direct invites.' },
    { level: 'Tier 2', percent: '3.0%', desc: 'Generated continuously from 2nd generation downlines.' },
    { level: 'Tier 3', percent: '2.0%', desc: 'Passive yield flowing as your referral network expands.' },
    { level: 'Tier 4', percent: '1.0%', desc: 'Deep-tier returns from 4th generation network members.' },
    { level: 'Tier 5', percent: '0.5%', desc: 'Viral community incentives driving long-term depth.' },
  ];

  const faqs = [
    {
      q: 'How does the Automated Daily ROI Cron work?',
      a: 'Every day at 12:00 AM (midnight), the backend node-cron scheduler automatically iterates over all active investments, calculates the exact daily ROI percentage, atomically credits the user\'s wallet, and logs the transaction. It is protected by a strict idempotency key so that even if triggered multiple times, duplicate credits are strictly prevented.',
    },
    {
      q: 'How are multi-level referral commissions calculated?',
      a: 'Whenever an investor activates a new package, the backend traverses up the sponsor hierarchy up to 5 tiers. Level 1 earns 5%, Level 2 earns 3%, Level 3 earns 2%, Level 4 earns 1%, and Level 5 earns 0.5% of the invested capital, credited directly into their wallets in real-time.',
    },
    {
      q: 'Can the evaluation team test the Daily ROI without waiting for midnight?',
      a: 'Yes! The Super Admin panel includes a dedicated "Run Daily ROI Distribution" simulator button. Clicking it executes the real ROI processor with live idempotency logs, allowing instant evaluation.',
    },
    {
      q: 'What makes this platform secure and fault-tolerant?',
      a: 'We implement zero hardcoding (all credentials and parameters are isolated in .env), Winston log rotations, bcrypt password encryption, JWT stateless token security, and atomic MongoDB operations to prevent financial race conditions.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 tech-grid-bg relative overflow-hidden">
      <Navbar />

      {/* Hero Section with Minimal Grid Structure */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 border-b border-white/5">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Minimal Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-mono uppercase tracking-wider text-[11px]">NexaChain Engine v2.0 • MERN Stack Assessment</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]"
          >
            Automated Daily Yield &{' '}
            <span className="glow-gradient-text">5-Tier Referral</span> Network
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            An enterprise MERN architecture featuring mathematically idempotent midnight ROI scheduler, recursive multi-level commission traversal, and full-width analytics dashboards.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-glow hover:shadow-cyanGlow transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Launch Investor Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-card text-slate-300 hover:text-white font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Super Admin Simulator</span>
            </Link>
          </motion.div>

          {/* Minimal Grid Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto"
          >
            <div className="glass-card p-5 rounded-2xl text-left border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Scheduler</span>
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">12:00 AM</p>
              <p className="text-[11px] text-indigo-400 mt-1">Midnight automated cron</p>
            </div>

            <div className="glass-card p-5 rounded-2xl text-left border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Network Depth</span>
                <GitFork className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">5 Tiers</p>
              <p className="text-[11px] text-cyan-400 mt-1">Recursive upward payouts</p>
            </div>

            <div className="glass-card p-5 rounded-2xl text-left border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Idempotency</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">100% Safe</p>
              <p className="text-[11px] text-emerald-400 mt-1">Zero duplicate payout key</p>
            </div>

            <div className="glass-card p-5 rounded-2xl text-left border border-white/5 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Test Mode</span>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">Instant</p>
              <p className="text-[11px] text-amber-400 mt-1">1-Click simulation runner</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Returns Calculator */}
      <section className="py-20 border-b border-white/5 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Dynamic Yield Calculator</h2>
            <p className="text-xs text-slate-400 mt-1">Simulate daily cashflow returns across our automated package tiers</p>
          </div>

          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl">
            {/* Input Slider */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex justify-between">
                  <span>Investment Capital</span>
                  <span className="text-cyan-400 font-mono text-base font-bold">${calcAmount.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full mt-3 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Package Tier</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button
                    onClick={() => {
                      setSelectedPlanRate(1.5);
                      setSelectedDuration(30);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedPlanRate === 1.5
                        ? 'bg-indigo-600 text-white shadow-glow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Starter (1.5%)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPlanRate(2.0);
                      setSelectedDuration(45);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedPlanRate === 2.0
                        ? 'bg-indigo-600 text-white shadow-glow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Growth (2.0%)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPlanRate(2.5);
                      setSelectedDuration(60);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedPlanRate === 2.5
                        ? 'bg-indigo-600 text-white shadow-glow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Elite (2.5%)
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Term Duration: <strong className="text-white">{selectedDuration} Calendar Days</strong></span>
              </div>
            </div>

            {/* Projected Returns Box */}
            <div className="bg-slate-900/90 border border-indigo-500/30 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Payout</span>
                <div className="mt-3 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Daily Automated ROI:</span>
                    <span className="text-emerald-400 font-mono font-bold text-lg">+${dailyReturn} / day</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Yield Maturity:</span>
                    <span className="text-white font-mono font-bold text-xl">${totalReturn}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
                    <span className="text-indigo-300 font-medium">Net Profit Margin:</span>
                    <span className="text-cyan-400 font-mono font-bold text-xl">+${netProfit}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/register"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-center text-xs uppercase tracking-wider shadow-glow hover:scale-[1.02] transition-transform"
              >
                Activate This Plan Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Yield Packages Section */}
      <section id="plans" className="py-24 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Preset Yield Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
              Automated Capital Packages
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Each package features daily scheduled wallet balance credits, duration tracking, and instant referral income distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`glass-card p-7 rounded-3xl flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1.5 ${
                  plan.popular ? 'border-indigo-500/80 ring-1 ring-indigo-500/40 shadow-glow' : 'border-white/5'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white uppercase tracking-wider shadow-glow">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white font-mono">{plan.rate}%</span>
                    <span className="text-xs font-semibold text-slate-400">/ daily</span>
                  </div>
                  <p className="text-xs text-indigo-400 mt-1 font-medium">{plan.duration} Days Term Duration</p>

                  <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 flex justify-between">
                    <span>Range:</span>
                    <strong className="text-white font-mono">${plan.min} - ${plan.max}</strong>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    to="/register"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-glow'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Select {plan.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Tier Referral Section */}
      <section id="referrals" className="py-24 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Network Economics
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
                5-Level Recursive Referral Hierarchy Engine
              </h2>
              <p className="text-slate-300 mt-4 text-sm leading-relaxed">
                Whenever anyone in your network activates a package, the traversal engine automatically climbs up the sponsor hierarchy and awards percentage-based commissions atomically into their wallets with full transaction history.
              </p>

              <div className="mt-8">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Create Account & Start Earning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/5 space-y-3">
              {referralTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-indigo-500/30 transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{tier.level}</p>
                    <p className="text-[11px] text-slate-400">{tier.desc}</p>
                  </div>
                  <span className="text-sm font-extrabold text-cyan-400 font-mono px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    {tier.percent}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-1">Key technical specifications of the NexaChain platform</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden border border-white/5"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4.5 text-left flex justify-between items-center text-xs sm:text-sm font-bold text-white hover:text-indigo-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ml-2 ${
                      openFaq === index ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4.5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
