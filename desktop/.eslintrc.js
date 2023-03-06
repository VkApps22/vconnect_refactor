const realConfig = {
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/href-no-hash': ['off'],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'sonarjs/no-duplicate-string': ['off'],
    'react/jsx-max-depth': ['error', { max: 4 }],
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'import/prefer-default-export': ['off'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
const nopConfig = {
  ...realConfig,
  ignorePatterns: ['**/*.js', '**/*.jsx', '!setupTests.js'],
};
module.exports = process.env.DISABLE_ESLINT ? nopConfig : realConfig;
