import { defineConfig } from 'vitest/config';
      
export default defineConfig({
  test: {
    globals: true,
    environment: 'miniflare',
    environmentOptions: {
      modules: true,
      bindings: {
        // 仅给必需绑定（可选填充更多）
        OPENAI_API_KEY: 'dummy',
        SCHEMA_VERSION: '2024-10-01',
        BUILD_VERSION: 'test-ci',
        // 关闭真实限流/鉴权/配额
        SECURITY_HEADERS: '0'
      }
    },
    include: ['test/contract/**/*.test.ts']
  }
});
