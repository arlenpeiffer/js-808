import { defineConfig, transformerVariantGroup } from 'unocss'

export default defineConfig({
  theme: {
    fontFamily: {
      display: 'PBIO, sans-serif'
    }
  },
  transformers: [transformerVariantGroup()]
})
