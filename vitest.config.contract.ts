import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["contract/**/*.test.ts"],
    environment: "miniflare",
    environmentOptions: {
      bindings: { TEST: "1" }
    }
  }
});
