import { defineConfig } from 'vite'

export default defineConfig(config => {
  return {
    base: config.mode === 'development' ? '/' : '/earlybird-icons'
  }
})
