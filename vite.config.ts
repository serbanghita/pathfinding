import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      provider: "istanbul", // or 'v8'
      exclude: ["./src/assets", "./src/demo2.ts"],
      reportsDirectory: ".coverage",
    },
  },
});
