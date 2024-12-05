import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        Feature: 'readonly',
        Before: 'readonly',
        After: 'readonly',
        Scenario: 'readonly',
        locate: 'readonly',
        within: 'readonly',
        session: 'readonly',
        DataTable: 'readonly',
        xScenario: 'readonly',
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
        webpack: true,
      },
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  daStyle,
  {
    rules: {
      'space-infix-ops': ['error'],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error', 'always'],
      'linebreak-style': 0,
    },
  },
];
