import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../animations/variants'

export default function ProtectionMetrics({ metrics }) {
  if (!metrics) return null

  const strengthPct = Math.round(metrics.protection_strength * 100)

  const baseStats = [
    { label: 'Processing Time', value: `${metrics.processing_time_ms} ms` },
    { label: 'Noise Level',     value: metrics.noise_level },
    { label: 'Method',          value: metrics.perturbation_type?.replace('adversarial-', '') ?? '—' },
    metrics.psnr_db         != null && { label: 'PSNR',             value: `${metrics.psnr_db} dB` },
    metrics.golden_timestep != null && { label: 'Golden Timestep',  value: `t* = ${metrics.golden_timestep}` },
    metrics.semantic_loss   != null && { label: 'Semantic Loss',     value: metrics.semantic_loss.toFixed(4) },
  ].filter(Boolean)

  const hasRedTeam = metrics.attacks_blocked != null && metrics.total_attacks != null
  const attackPct  = hasRedTeam
    ? Math.round((metrics.attacks_blocked / metrics.total_attacks) * 100)
    : null

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* DRS strength meter */}
      <motion.div
        variants={fadeUp}
        className="bg-canvas-50 rounded-3xl p-6 border border-white/[0.08] shadow-soft"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-body text-ink-500 text-sm tracking-wide">
              Defence Robustness Score
            </p>
            <p className="font-body text-xs text-ink-300 mt-0.5">
              60% attack resistance · 20% PSNR · 20% CLIP semantics
            </p>
          </div>
          <span className="font-display text-3xl font-light text-ink-900">
            {strengthPct}%
          </span>
        </div>
        <div className="h-1.5 bg-canvas-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sage to-sage-dark"
            initial={{ width: 0 }}
            animate={{ width: `${strengthPct}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>
        <p className="mt-2 text-xs font-body text-ink-300">
          {strengthPct >= 90
            ? 'Excellent — highly resistant to synthesis attacks.'
            : strengthPct >= 75
            ? 'Good — substantial protection applied.'
            : 'Moderate — consider re-processing for higher strength.'}
        </p>
      </motion.div>

      {/* Red-team summary (only shown when RUN_RED_TEAM=true) */}
      {hasRedTeam && (
        <motion.div
          variants={fadeUp}
          className="bg-canvas-50 rounded-3xl p-6 border border-white/[0.08] shadow-soft"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-ink-500 text-sm tracking-wide">
              Red-Team Evaluation
            </p>
            <span className="font-display text-2xl font-light text-ink-900">
              {metrics.attacks_blocked}/{metrics.total_attacks}
            </span>
          </div>
          <div className="h-1.5 bg-canvas-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-sage"
              initial={{ width: 0 }}
              animate={{ width: `${attackPct}%` }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            />
          </div>
          <p className="mt-2 text-xs font-body text-ink-300">
            Attacks blocked (ControlNet · Img2Img · DDIM · JPEG · Blur)
          </p>

          {/* Per-attack breakdown */}
          {metrics.attack_results?.length > 0 && (
            <div className="mt-4 space-y-1.5">
              {metrics.attack_results.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-body">
                  <span className="text-ink-500 truncate max-w-[55%]">{r.name}</span>
                  <span className={r.protection_held ? 'text-sage-dark' : 'text-clay'}>
                    {r.protection_held ? 'Held ✓' : 'Bypassed ✗'}
                    {r.arcface_distance != null && ` · d=${r.arcface_distance}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Stat grid */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {baseStats.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            className="bg-canvas-50 rounded-2xl p-4 border border-white/[0.08] shadow-soft text-center"
          >
            <p className="font-display text-base font-light text-ink-900 capitalize leading-snug">
              {item.value}
            </p>
            <p className="mt-1 text-[11px] font-body font-light text-ink-300 tracking-wide">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
