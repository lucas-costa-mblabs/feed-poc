import { defineConfig } from "vitest/config";

export default defineConfig({
  configFile: false,
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
