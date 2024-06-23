import { defineConfig } from 'eslint-define-config';

export default defineConfig({
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                semi: true,
                singleQuote: true,
                bracketSpacing: true,
                printWidth: 80,
                tabWidth: 2,
                useTabs: false,
                trailingComma: 'none',
                arrowParens: 'avoid'
            }
        ],
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }]
    }
});
