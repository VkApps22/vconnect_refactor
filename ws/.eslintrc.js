module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
  ],
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'ctx'],
      },
    ],
    'no-console': ['off'],
    'no-underscore-dangle': ['error', { allow: ['__MONGO_URI__', '_id'] }],
    'sonarjs/no-duplicate-string': ['off'],
    'prefer-object-spread': ['off'],
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
