module.exports = {
  preset: '@shelf/jest-mongodb',
  testTimeout: 60000,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
  ],
};
