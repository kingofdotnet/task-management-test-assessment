module.exports = {
  rootDir: './',
  testMatch: ['**/test/**/*.spec.ts'], // ✅ Ensure Jest runs tests in the "test" folder
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'], // ✅ Allows imports from "src"
  clearMocks: true,
  coverageDirectory: 'coverage',
  // globalSetup: './tests/globalSetup.js',
  // globalTeardown: './tests/globalTeardown.js',
  // setupFilesAfterEnv: ['./tests/setup.js']
};
