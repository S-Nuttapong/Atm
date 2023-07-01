import react from '@vitejs/plugin-react-swc'
import path from "path"
import { defineConfig } from "vite"

const sourcePath = `${__dirname}/src/`

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(sourcePath, "shared/"),
      "@shared/libs": path.resolve(sourcePath, "shared/libs/"),
      "@entities": path.resolve(sourcePath, "entities/"),
      "@features": path.resolve(sourcePath, "features/")
    },
  },
})