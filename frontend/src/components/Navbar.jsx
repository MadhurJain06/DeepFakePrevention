import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-8 py-4 bg-canvas-100/85 backdrop-blur-xl border-b border-white/[0.05]"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-full bg-sage flex items-center justify-center shadow-sage-glow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" stroke="#fff" strokeWidth="1.2" fill="none"/>
              <path d="M4.5 7c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5S4.5 8.381 4.5 7z" fill="#fff"/>
            </svg>
          </span>
          <span className="font-display text-xl font-light tracking-widest text-ink-900 group-hover:text-gold transition-colors duration-300">
            Veil
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-ink-500 text-sm font-body tracking-wide">
          <a href="#how-it-works" className="hover:text-ink-900 transition-colors duration-200 relative group">
            How it works
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sage group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#upload"
            className="inline-flex items-center gap-2 text-ink-700 border border-white/15 px-4 py-1.5 rounded-full hover:border-sage/50 hover:text-sage transition-all duration-300 text-xs tracking-wide"
          >
            Try it free
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
