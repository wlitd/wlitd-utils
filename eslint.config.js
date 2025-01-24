import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    ignores: ['coverage', 'node_modules', 'dist']
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error'
    }
  },

  // 配置全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off', // 三元表达式
      '@typescript-eslint/no-unsafe-function-type': 'off', // 允许Function类型
      '@typescript-eslint/no-explicit-any': 'off', // 允许any
      '@typescript-eslint/no-wrapper-object-types': 'off', //允许Object
      '@typescript-eslint/no-empty-object-type': 'off' // 允许空对象类型
    }
  },

  // 合并Prettier
  eslintPluginPrettierRecommended
)
