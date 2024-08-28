import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// --------------------------------- deploy on github action
// https://github.com/ErickKS/vite-deploy
// https://github.com/sitek94/vite-deploy-demo

const repo = 'threejs_journey_r3f'

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${repo}/`,
  plugins: [react(), glsl()],
})
