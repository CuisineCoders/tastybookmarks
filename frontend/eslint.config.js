// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
          },
        },
      },
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'prefer-template': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/unbound-method': [
        'error',
        {
          'ignoreStatic': true,
        },
      ],
      '@typescript-eslint/array-type': [
        'error',
        {
          'default': 'generic',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'tasty',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'tasty',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/alt-text': 'off',
    },
  },
);
