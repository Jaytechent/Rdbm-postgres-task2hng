module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testMatch: [
      '**/__tests__/**/*.auth.spec.js' // Adjust the pattern to match your test files
    ],
    setupFilesAfterEnv: ['./jest.setup.js'], // If you have a setup file
    clearMocks: true, // Automatically clear mock calls between tests
    // Other configurations as needed
  };
  