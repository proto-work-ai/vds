import nx from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import angular from 'angular-eslint';

export default defineConfig([
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.html'],
    // extends разворачивает defineConfig; плагин @angular-eslint/template подключают сами пресеты.
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    languageOptions: {
      parser: angular.templateParser,
    },
    rules: {
      'max-len': [
        'error',
        {
          code: 140,
        },
      ],
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          order: [
            'TEMPLATE_REFERENCE',
            'STRUCTURAL_DIRECTIVE',
            'ATTRIBUTE_BINDING',
            'INPUT_BINDING',
            'TWO_WAY_BINDING',
            'OUTPUT_BINDING',
          ],
        },
      ],
    },
  },
]);
