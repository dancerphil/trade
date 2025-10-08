import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        include: ['app/**/*.test.{ts,tsx}'],
        environment: 'jsdom', // 使用 jsdom 模拟浏览器环境
        globals: true,
        // setupFiles: ['./scripts/test.setup.ts'],
        coverage: {
            provider: 'v8',
            include: ['app/**/*.{ts,tsx}'],
        },
    },
    resolve: {
        alias: {
            '@': '/app',
        },
    },
});
