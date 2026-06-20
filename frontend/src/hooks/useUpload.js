import { useState, useCallback } from 'react'
import { api } from '../services/api'

export function useUpload() {
  const [state, setState] = useState({
    status: 'idle',   // idle | uploading | processing | done | error
    uploadProgress: 0,
    imageId: null,
    originalUrl: null,
    processedUrl: null,
    metrics: null,
    error: null,
  })

  const reset = useCallback(() => {
    setState({
      status: 'idle', uploadProgress: 0,
      imageId: null, originalUrl: null, processedUrl: null,
      metrics: null, error: null,
    })
  }, [])

  const run = useCallback(async (file) => {
    setState(s => ({ ...s, status: 'uploading', error: null, uploadProgress: 0 }))
    try {
      const uploaded = await api.upload(file, (pct) =>
        setState(s => ({ ...s, uploadProgress: pct }))
      )
      setState(s => ({
        ...s,
        status: 'processing',
        imageId: uploaded.image_id,
        originalUrl: uploaded.original_url,
      }))

      const result = await api.process(uploaded.image_id)
      setState(s => ({
        ...s,
        status: 'done',
        processedUrl: result.processed_url,
        metrics: {
          protection_strength: result.protection_strength,
          processing_time_ms:  result.processing_time_ms,
          noise_level:         result.noise_level,
          perturbation_type:   result.perturbation_type,
          psnr_db:             result.psnr_db,
          semantic_loss:       result.semantic_loss,
          golden_timestep:     result.golden_timestep,
          attacks_blocked:     result.attacks_blocked,
          total_attacks:       result.total_attacks,
          attack_results:      result.attack_results,
        },
      }))
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Something went wrong.'
      setState(s => ({ ...s, status: 'error', error: msg }))
    }
  }, [])

  return { ...state, run, reset }
}
