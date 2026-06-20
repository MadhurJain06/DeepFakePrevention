import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const http = axios.create({ baseURL: BASE, timeout: 660000 })

export const api = {
  async upload(file, onProgress) {
    const form = new FormData()
    form.append('file', file)
    const { data } = await http.post('/api/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100))
      },
    })
    return data
  },

  async process(imageId) {
    const { data } = await http.post(`/api/process/${imageId}`)
    return data
  },

  async downloadInfo(imageId) {
    const { data } = await http.get(`/api/download/${imageId}`)
    return data
  },

  getOriginalUrl(imageId, ext = '.jpg') {
    return `${BASE}/api/original/${imageId}${ext}`
  },

  getProcessedUrl(imageId, ext = '.jpg') {
    return `${BASE}/api/processed/${imageId}${ext}`
  },

  getDownloadUrl(imageId) {
    return `${BASE}/api/download/${imageId}/file`
  },
}
