const path = require('path');

module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'arrow-body-style': ['error', 'as-needed'],
    'global-require': 'off',
    'linebreak-style': 'off',
    'no-return-await': 'off',
    'no-unused-vars': 'warn',
    'import/export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        pathGroups: [
          {
            pattern: '{react*,react*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{react*,react*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '[@]hanum/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': ['error', { controlComponents: ['input', 'select'] }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'warn',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
        '@typescript-eslint/no-useless-constructor': 'error',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
      },
      parserOptions: {
        project: ['./tsconfig.base.json', './apps/**/tsconfig.json', './packages/**/tsconfig.json'],
      },
    },
    {
      files: ['apps/auth/**/*.ts?(x)', 'apps/landing/**/*.js?(x)'],
      extends: ['next'],
      rules: {
        '@next/next/no-html-link-for-pages': ['error', 'apps/landing/pages/'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/apps/landing/tsconfig.json`),
          },
        },
        next: {
          rootDir: 'apps/dashboard/',
        },
      },
    },
    {
      files: ['apps/forum/**/*.ts?(x)', 'apps/wargame/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/apps/wargame/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/components/**/*.ts?(x)', 'packages/components/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/components/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/styles/**/*.ts?(x)', 'packages/styles/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/styles/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['packages/assets/**/*.ts?(x)', 'packages/assets/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/packages/assets/tsconfig.json`),
          },
        },
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    browser: true,
  },
};
