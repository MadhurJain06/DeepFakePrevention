import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn } from '../animations/variants'

const steps = [
  {
    number: '01',
    title: 'Upload Your Image',
    body: 'Drag and drop any portrait. Supports JPEG, PNG, and WebP up to 10 MB. Your image is processed in isolation — never stored permanently.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M14 3v16M7 10l7-7 7 7" stroke="#7FAF78" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 20v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#7FAF78" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Protection Applied',
    body: 'Our adversarial model adds imperceptible perturbations to your face. The result looks identical to you — but breaks deepfake synthesis models.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l8 4v7c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z" stroke="#7FAF78" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14l3 3 5-5" stroke="#7FAF78" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Download Protected',
    body: 'Preview original and protected side by side. Then download your shielded image — ready to share freely without deepfake risk.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M14 5v16M7 15l7 7 7-7" stroke="#7FAF78" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 22h20" stroke="#7FAF78" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-canvas-200 border-y border-white/[0.05]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sage/25 bg-sage/[0.06] mb-6">
            <span className="w-1 h-1 rounded-full bg-sage" />
            <span className="text-[10px] font-body font-light tracking-[0.3em] text-sage uppercase">The Process</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light text-ink-900 leading-tight">
            Three steps to privacy
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 font-body text-ink-500 text-sm max-w-sm mx-auto leading-relaxed">
            From upload to download in minutes. No account, no logs, no compromise.
          </motion.p>
        </motion.div>

        {/* Step cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={scaleIn}
              whileHover={{ y: -6, boxShadow: '0 16px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,169,110,0.18)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-canvas-50 rounded-3xl p-8 border border-white/[0.07] shadow-card cursor-default overflow-hidden"
            >
              {/* Subtle corner gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

              {/* Number + icon row */}
              <div className="flex items-start justify-between mb-7">
                <span className="font-display text-5xl font-light text-gold/55 leading-none group-hover:text-gold/80 transition-colors duration-300">
                  {step.number}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-canvas-300 flex items-center justify-center group-hover:bg-emerald/20 transition-colors duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Text */}
              <h3 className="font-display text-xl font-light text-ink-900 mb-3 group-hover:text-gold/90 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="font-body text-ink-500 text-sm leading-relaxed">
                {step.body}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          ))}
        </motion.div>

        {/* Divider stat strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-20 grid grid-cols-3 divide-x divide-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          {[
            { value: '7-phase', label: 'Protection pipeline' },
            { value: 'PGD + CLIP', label: 'Adversarial method' },
            { value: '< invisible', label: 'Perceptual delta' },
          ].map((stat) => (
            <div key={stat.label} className="py-6 px-8 text-center bg-canvas-50/60">
              <p className="font-display text-xl font-light text-ink-700">{stat.value}</p>
              <p className="mt-1 text-[11px] font-body font-light text-ink-300 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
