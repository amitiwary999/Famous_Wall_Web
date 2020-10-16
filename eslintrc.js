module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react'],
  settings: {
    react: {
      version: '16.13.1'
    }
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        proseWrap: 'preserve',
        endOfLine: 'auto'
      }
    ],
    'react/display-name': 1,
    'no-console': 'off',
    'max-len': [
      1,
      100,
      2,
      {
        ignoreComments: true,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$'
      }
    ],
    'react/prop-types': 1,
    'no-unused-vars': 1,
    'react/no-direct-mutation-state': 1,
    'react/jsx-key': 1,
    'react/no-string-refs': 1,
    'react/no-unescaped-entities': 0,
    'no-useless-escape': 1,
    'no-empty': 1,
    'no-case-declarations': 1,
    'no-const-assign': 1,
    'no-mixed-spaces-and-tabs': 1,
    'no-constant-condition': 1,
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1
      }
    ],
    'linebreak-style': 0,
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'eol-last': 'warn',
    'keyword-spacing': [
      'warn',
      {
        after: true,
        before: true
      }
    ],
    'array-bracket-spacing': ['warn', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    curly: ['warn', 'all']
  }
};

