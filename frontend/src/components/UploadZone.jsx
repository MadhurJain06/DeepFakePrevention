import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, scaleIn } from '../animations/variants'
import { useUpload } from '../hooks/useUpload'
import { useNavigate } from 'react-router-dom'

export default function UploadZone() {
  const navigate = useNavigate()
  const { status, uploadProgress, run, reset, error, imageId, processedUrl, metrics, originalUrl } = useUpload()
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)

  const onDrop = useCallback(async (accepted) => {
    const file = accepted[0]
    if (!file) return
    setFileName(file.name)
    const url = URL.createObjectURL(file)
    setPreview(url)
    await run(file)
  }, [run])

  if (status === 'done' && imageId) {
    navigate('/results', {
      state: { imageId, originalUrl, processedUrl, metrics, localPreview: preview },
      replace: false,
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1,
    disabled: status === 'uploading' || status === 'processing',
  })

  const isActive = status === 'uploading' || status === 'processing'

  return (
    <section id="upload" className="py-32 px-6 bg-canvas-100">
      <div className="max-w-2xl mx-auto">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="text-[10px] font-body font-light tracking-[0.3em] text-ink-500 uppercase">Begin Protection</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink-900">
            Upload your portrait
          </h2>
          <p className="mt-4 font-body text-ink-500 text-sm">
            Your image is processed in memory and never retained.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          {/* Drop zone */}
          <div
            {...getRootProps()}
            className={`relative rounded-3xl border border-dashed transition-all duration-300 cursor-pointer overflow-hidden
              ${isDragActive
                ? 'border-sage bg-sage/[0.08] scale-[1.01] shadow-sage-glow'
                : 'border-white/[0.12] bg-canvas-50 hover:border-sage/50 hover:bg-sage/[0.04]'}
              ${isActive ? 'cursor-not-allowed pointer-events-none' : ''}
            `}
            style={{ minHeight: '280px' }}
          >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait">
              {/* Idle state */}
              {status === 'idle' && !preview && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-10"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${isDragActive ? 'bg-sage/20' : 'bg-canvas-300'}`}>
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                      <path d="M14 5v14M7 12l7-7 7 7" stroke={isDragActive ? '#7FAF78' : '#5A5750'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="4" y="20" width="20" height="2" rx="1" fill={isDragActive ? '#7FAF78' : '#5A5750'} opacity="0.5"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-body text-ink-700 text-base mb-1.5">
                      {isDragActive ? 'Drop to protect' : 'Drag & drop your image here'}
                    </p>
                    <p className="font-body text-ink-300 text-sm">
                      or <span className="text-sage hover:text-sage-dark transition-colors">click to browse</span> · JPEG, PNG, WebP up to 10 MB
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Preview + active state */}
              {(preview && status !== 'idle') && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative"
                >
                  <img src={preview} alt="Preview" className="w-full object-cover rounded-3xl" style={{ maxHeight: '360px', objectFit: 'cover' }} />
                  {isActive && (
                    <div className="absolute inset-0 bg-canvas-100/85 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center gap-5">
                      <ProcessingSpinner status={status} />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Upload progress */}
          <AnimatePresence>
            {status === 'uploading' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-6"
              >
                <div className="flex justify-between text-xs font-body font-light text-ink-300 mb-2.5">
                  <span className="text-ink-500 truncate max-w-[70%]">{fileName}</span>
                  <span className="text-gold">{uploadProgress}%</span>
                </div>
                <div className="h-px bg-canvas-300 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sage to-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing status */}
          <AnimatePresence>
            {status === 'processing' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-6 text-center"
              >
                <p className="font-body text-ink-500 text-sm">Applying adversarial protection via Kaggle GPU…</p>
                <p className="font-body text-ink-300 text-xs mt-1">This takes 5 – 10 minutes</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-2xl bg-wine/10 border border-wine/25"
              >
                <p className="font-body text-wine text-sm text-center">{error}</p>
                <button
                  onClick={reset}
                  className="mt-3 w-full text-xs font-body text-ink-500 hover:text-ink-900 transition-colors"
                >
                  Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Privacy note */}
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-8 text-xs font-body font-light text-ink-300 leading-relaxed"
        >
          No account required · Images processed in memory · Zero retention policy
        </motion.p>
      </div>
    </section>
  )
}

function ProcessingSpinner({ status }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-14 h-14">
        <motion.div
          className="absolute inset-0 rounded-full border border-sage/20"
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-1 rounded-full border border-sage/40"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
        />
        <div className="absolute inset-0 rounded-full border border-sage/30 flex items-center justify-center">
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-sage"
            animate={{ scale: [1, 0.65, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>
      </div>
      <div className="text-center">
        <p className="font-body text-ink-700 text-sm">
          {status === 'uploading' ? 'Uploading…' : 'Applying adversarial shield…'}
        </p>
        {status === 'processing' && (
          <p className="font-body font-light text-ink-300 text-xs mt-1">GPU processing in progress</p>
        )}
      </div>
    </div>
  )
}
