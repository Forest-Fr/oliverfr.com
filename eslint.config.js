// ESLint v9 扁平配置
import js from '@eslint/js'
import ts from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
  
export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked, // 需要 tsconfig.json
  {
    ignores: ['dist', 'coverage', 'node_modules'],
  },
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // 这里放你的自定义规则
    },
  },
  eslintConfigPrettier, // 关闭和 Prettier 冲突的风格规则
)
