module.exports = {
  moduleNameMapper: { "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js" },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: 'jsdom',
};