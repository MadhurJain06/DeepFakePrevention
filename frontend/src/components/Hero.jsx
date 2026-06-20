import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations/variants'

export default function Hero({ onScrollToUpload }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden bg-canvas-100">

      {/* Background: emerald glow top-center */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full bg-emerald opacity-[0.07] blur-[120px] pointer-events-none" />
      {/* Background: gold glow bottom-right */}
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-gold opacity-[0.05] blur-[100px] pointer-events-none" />

      {/* Fine dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #F0EBE0 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Main content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl text-center"
      >
        {/* Eyebrow pill */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="text-[10px] font-body font-light tracking-[0.32em] text-ink-500 uppercase">
            Privacy · Protection · AI Defense
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-6xl sm:text-7xl md:text-[84px] font-light leading-[1.04] text-ink-900 mb-8 tracking-tight"
        >
          Protect Your Identity
          <br />
          <em className="italic text-sage">Before AI Copies It.</em>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp}
          className="font-body text-ink-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-12"
        >
          Upload a portrait. Our adversarial model embeds an invisible shield —
          imperceptible to the human eye, impenetrable to deepfake synthesis.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onScrollToUpload}
            className="group inline-flex items-center justify-center gap-3 bg-ink-900 text-canvas-100 px-8 py-4 rounded-full font-body font-light text-sm tracking-wide hover:bg-ink-700 transition-all duration-300 shadow-card"
          >
            Protect an Image
            <span className="w-5 h-5 rounded-full bg-sage group-hover:bg-sage-dark flex items-center justify-center transition-colors duration-300 shadow-sage-glow">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4h5M4 1.5l2.5 2.5L4 6.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 text-ink-500 px-6 py-4 rounded-full font-body font-light text-sm tracking-wide border border-white/[0.12] hover:border-white/[0.25] hover:text-ink-700 transition-all duration-300"
          >
            See how it works
          </a>
        </motion.div>

        {/* Trust micro-line */}
        <motion.p variants={fadeUp} className="mt-8 text-[11px] font-body font-light text-ink-300 tracking-wide">
          No account · No storage · Processed in memory
        </motion.p>
      </motion.div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-20 w-64 h-64 sm:w-72 sm:h-72 mx-auto"
      >
        {/* Slowly rotating outer ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 280 280" fill="none" className="w-full h-full">
            <circle cx="140" cy="140" r="136" stroke="#C9A96E" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 10" />
          </svg>
        </motion.div>

        {/* Counter-rotating middle ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 280 280" fill="none" className="w-full h-full">
            <circle cx="140" cy="140" r="108" stroke="#7FAF78" strokeWidth="0.5" opacity="0.18" strokeDasharray="2 8" />
          </svg>
        </motion.div>

        {/* Pulsing inner glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-32 h-32 rounded-full bg-sage opacity-[0.05] blur-2xl" />
        </motion.div>

        {/* Static core SVG */}
        <svg viewBox="0 0 280 280" fill="none" className="absolute inset-0 w-full h-full">
          {/* Corner accents — gold */}
          <path d="M18 18 L18 36"   stroke="#C9A96E" strokeWidth="1"   opacity="0.4" strokeLinecap="round"/>
          <path d="M18 18 L36 18"   stroke="#C9A96E" strokeWidth="1"   opacity="0.4" strokeLinecap="round"/>
          <path d="M262 18 L262 36" stroke="#C9A96E" strokeWidth="1"   opacity="0.4" strokeLinecap="round"/>
          <path d="M244 18 L262 18" stroke="#C9A96E" strokeWidth="1"   opacity="0.4" strokeLinecap="round"/>
          <path d="M18 262 L18 244" stroke="#C9A96E" strokeWidth="1"   opacity="0.4" strokeLinecap="round"/>
          <path d="M18 262 L36 262" stroke="#C9A96E" strokeWidth="1"   opacity="0.4" strokeLinecap="round"/>
          <path d="M262 262 L262 244" stroke="#C9A96E" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
          <path d="M244 262 L262 262" stroke="#C9A96E" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>

          {/* Shield */}
          <path
            d="M140 44 L205 74 L205 146 C205 192 176 224 140 240 C104 224 75 192 75 146 L75 74 Z"
            stroke="#7FAF78" strokeWidth="1.4" fill="rgba(127,175,120,0.045)" opacity="0.6"
          />

          {/* Face circle */}
          <circle cx="140" cy="136" r="46" stroke="#F0EBE0" strokeWidth="0.5" opacity="0.1" />

          {/* Eyes */}
          <circle cx="123" cy="125" r="5.5" fill="#7FAF78" opacity="0.88" />
          <circle cx="157" cy="125" r="5.5" fill="#7FAF78" opacity="0.88" />
          {/* Eye highlights */}
          <circle cx="125" cy="123" r="1.8" fill="#F0EBE0" opacity="0.55" />
          <circle cx="159" cy="123" r="1.8" fill="#F0EBE0" opacity="0.55" />

          {/* Mouth */}
          <path d="M126 153 Q140 165 154 153" stroke="#7FAF78" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />

          {/* Data lines flanking face */}
          <line x1="80"  y1="114" x2="80"  y2="158" stroke="#7FAF78" strokeWidth="0.5" opacity="0.25" />
          <line x1="75"  y1="124" x2="75"  y2="148" stroke="#7FAF78" strokeWidth="0.4" opacity="0.15" />
          <line x1="200" y1="114" x2="200" y2="158" stroke="#7FAF78" strokeWidth="0.5" opacity="0.25" />
          <line x1="205" y1="124" x2="205" y2="148" stroke="#7FAF78" strokeWidth="0.4" opacity="0.15" />

          {/* Tick marks — gold */}
          <rect x="72" y="122" width="16" height="1.5" rx="0.75" fill="#C9A96E" opacity="0.3" />
          <rect x="72" y="148" width="10" height="1.5" rx="0.75" fill="#C9A96E" opacity="0.2" />
          <rect x="192" y="132" width="14" height="1.5" rx="0.75" fill="#C9A96E" opacity="0.3" />

          {/* Orbital particles — inner */}
          {[...Array(14)].map((_, i) => {
            const a = (i / 14) * Math.PI * 2
            return (
              <circle
                key={`ip${i}`}
                cx={140 + 62 * Math.cos(a)}
                cy={136 + 62 * Math.sin(a)}
                r={i % 5 === 0 ? 2 : 1}
                fill={i % 3 === 0 ? '#C9A96E' : '#7FAF78'}
                opacity={i % 2 === 0 ? 0.55 : 0.28}
              />
            )
          })}

          {/* Orbital particles — outer */}
          {[...Array(22)].map((_, i) => {
            const a = (i / 22) * Math.PI * 2
            return (
              <circle
                key={`op${i}`}
                cx={140 + 106 * Math.cos(a)}
                cy={140 + 106 * Math.sin(a)}
                r={i % 7 === 0 ? 2.5 : 1}
                fill={i % 4 === 0 ? '#C9A96E' : '#7FAF78'}
                opacity={i % 3 === 0 ? 0.38 : 0.18}
              />
            )
          })}

          {/* Perturbation noise field */}
          {[...Array(28)].map((_, i) => {
            const x = 100 + (i * 41 % 82)
            const y =  90 + (i * 29 % 92)
            return (
              <circle
                key={`pf${i}`}
                cx={x} cy={y} r="0.7"
                fill={i % 3 === 0 ? '#C9A96E' : '#7FAF78'}
                opacity={0.12 + (i % 4) * 0.07}
              />
            )
          })}
        </svg>

        {/* Animated scan line */}
        <motion.div
          className="absolute rounded-full"
          style={{ left: '27%', right: '27%', height: '1px', background: 'rgba(201,169,110,0.50)' }}
          animate={{ top: ['36%', '60%', '36%'] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-body font-light tracking-[0.25em] uppercase text-gold/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
