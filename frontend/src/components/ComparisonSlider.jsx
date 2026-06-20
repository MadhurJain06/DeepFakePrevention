import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ComparisonSlider({ originalSrc, processedSrc }) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const onMouseDown = (e) => { setDragging(true); updatePosition(e.clientX) }
  const onMouseMove = useCallback((e) => { if (dragging) updatePosition(e.clientX) }, [dragging, updatePosition])
  const onMouseUp = useCallback(() => setDragging(false), [])
  const onTouchMove = useCallback((e) => { updatePosition(e.touches[0].clientX) }, [updatePosition])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp) }
  }, [onMouseMove, onMouseUp])

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs font-body font-light text-ink-300 px-1">
        <span>Original</span>
        <span>Protected</span>
      </div>

      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden shadow-card select-none cursor-ew-resize"
        style={{ aspectRatio: '4/3' }}
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      >
        {/* Original (full width behind) */}
        <img
          src={originalSrc}
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Protected (clipped left side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={processedSrc}
            alt="Protected"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/80"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-hover flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 8H2M11 8h3M5 5l-3 3 3 3M11 5l3 3-3 3" stroke="#3A3A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-body font-light text-ink-700">
          Original
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-ink-900/80 backdrop-blur-sm text-xs font-body font-light text-canvas-100">
          Protected
        </div>
      </div>

      <p className="text-center text-xs font-body text-ink-300">
        Drag to compare — the difference is imperceptible to human eyes
      </p>
    </div>
  )
}
