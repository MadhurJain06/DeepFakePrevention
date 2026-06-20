import { useRef } from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import UploadZone from '../components/UploadZone'

export default function Landing() {
  const uploadRef = useRef(null)

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="grain">
      <Hero onScrollToUpload={scrollToUpload} />
      <HowItWorks />
      <div ref={uploadRef}>
        <UploadZone />
      </div>
      <footer className="py-10 px-6 border-t border-white/[0.07] bg-canvas-100 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
          <span className="font-display text-base font-light tracking-widest text-ink-300">Veil</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <p className="font-body font-light text-ink-300 text-xs tracking-wide">
          © {new Date().getFullYear()} Veil · Deepfake Protection · Your images are never stored.
        </p>
      </footer>
    </div>
  )
}
