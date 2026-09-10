import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    fileParallelism: false, // Desactiva la ejecución en paralelo entre archivos de test
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/**/__test__/**",
        "src/index.ts",
        "src/server.ts",
      ],
    },
  },
});
