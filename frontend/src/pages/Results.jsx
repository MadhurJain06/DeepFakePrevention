import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn } from '../animations/variants'
import ComparisonSlider from '../components/ComparisonSlider'
import ProtectionMetrics from '../components/ProtectionMetrics'
import { api } from '../services/api'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.imageId) {
    navigate('/', { replace: true })
    return null
  }

  const { imageId, originalUrl, processedUrl, metrics, localPreview } = state

  // Resolve full URLs
  const fullOriginal  = originalUrl?.startsWith('http')  ? originalUrl  : `${BASE}${originalUrl}`
  const fullProcessed = processedUrl?.startsWith('http') ? processedUrl : `${BASE}${processedUrl}`

  // For original we use the local blob preview while the server URL may resolve
  const displayOriginal  = localPreview || fullOriginal
  const displayProcessed = fullProcessed

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = api.getDownloadUrl(imageId)
    a.download = `protected_${imageId}.jpg`
    a.click()
  }

  return (
    <div className="min-h-screen bg-canvas-100 grain">
      {/* Back nav */}
      <div className="fixed top-0 inset-x-0 z-50 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-ink-500 hover:text-ink-900 transition-colors text-sm font-body"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <span className="font-display text-xl font-light tracking-widest text-ink-900">Veil</span>
          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 border border-sage/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-sage-dark" />
              <span className="text-xs font-body font-light text-sage-dark tracking-wider">Protection Complete</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-light text-ink-900 mb-4">
              Your image is now shielded
            </h1>
            <p className="font-body text-ink-500 text-base max-w-lg mx-auto">
              Imperceptible adversarial noise has been woven into your portrait.
              Deepfake models will fail to synthesize it faithfully.
            </p>
          </motion.div>

          {/* Comparison slider */}
          <motion.div variants={scaleIn} className="max-w-2xl mx-auto w-full">
            <ComparisonSlider originalSrc={displayOriginal} processedSrc={displayProcessed} />
          </motion.div>

          {/* Metrics */}
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto w-full">
            <ProtectionMetrics metrics={metrics} />
          </motion.div>

          {/* Download CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDownload}
              className="group inline-flex items-center gap-3 bg-ink-900 text-canvas-100 px-10 py-4 rounded-full font-body font-light text-sm tracking-wide hover:bg-ink-700 transition-all duration-300 shadow-soft hover:shadow-hover"
            >
              Download Protected Image
              <span className="w-5 h-5 rounded-full bg-sage flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 2v5M2.5 5l2.5 2.5L7.5 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-ink-500 px-6 py-4 rounded-full font-body font-light text-sm tracking-wide border border-white/[0.12] hover:border-white/[0.25] hover:text-ink-700 transition-all duration-300"
            >
              Protect another image
            </button>
          </motion.div>

          {/* Disclaimer */}
          <motion.p variants={fadeUp} className="text-center text-xs font-body font-light text-ink-300 max-w-md mx-auto leading-relaxed">
            The protected image looks identical to the original. The embedded perturbations
            are optimized to disrupt deepfake synthesis while remaining invisible to human perception.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
