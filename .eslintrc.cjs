module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'tailwind.config.js',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    project: './tsconfig.elsint.json',
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
    'arrow-parens': 'error',
    'max-len': [
      'error',
      {
        code: 160,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, minProperties: 4 },
        ObjectPattern: { consistent: true },
        ImportDeclaration: { multiline: true },
        ExportDeclaration: 'always',
      },
    ],
    'quote-props': ['error', 'consistent'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'no-cond-assign': 'off',
    'no-continue': 'off',
    'prefer-regex-literals': 'off',

    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-absolute-path': 'off',

    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    'react/prop-types': 'off',

    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
    ],
  },
};
