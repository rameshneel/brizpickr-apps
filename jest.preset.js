const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironment: 'jsdom',
  transform: {
    ...nxPreset.transform,
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { presets: ['@babel/preset-env', '@babel/preset-react'] },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  // Remove setupFilesAfterEnv from root preset for project-level control
  moduleNameMapper: {
    '^@brizpickr/(.*)$': '<rootDir>/libs/$1/src/index.js',
    '^@/(.*)$': '<rootDir>/apps/customer-dashboard/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/apps/customer-dashboard/tsconfig.spec.json',
    },
  },
};
