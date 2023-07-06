/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    '@modules/(.*)$': ['<rootDir>/src/modules/$1'],
    '@config/(.*)$': ['<rootDir>/src/config/$1'],
    '@common': ['<rootDir>/src/common'],
    '@types': ['<rootDir>/src/types'],
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.(t|j)s',
    '!<rootDir>/src/modules/**/(index|*.module).ts',
    '!<rootDir>/src/modules/index.ts',
  ],
  coverageReporters: ['text', 'json-summary', 'html'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  globalTeardown: '<rootDir>/teardown.js',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
};

module.exports = config;
