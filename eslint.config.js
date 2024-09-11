import aruiPresetsLint from 'arui-presets-lint/eslint';

export default {
  plugins: ['prettier'],
  extends: [aruiPresetsLint, 'plugin:react/jsx-runtime', 'plugin:cypress/recommended'],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  overrides: [
    {
      files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['src/redux/modules/*.ts'],
      rules: {
        'no-param-reassign': 'off',
        'no-return-assign': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.{ts,tsx,js,jsx}', '**/setup-tests.ts'],
      },
    ],
    'prettier/prettier': 'error',
    'react/jsx-indent': 'off',
    'import/no-default-export': 'error',
    indent: 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
  ignorePatterns: ['coverage', '*.config.[j,t]s', 'mocks/**', 'build'],
};
