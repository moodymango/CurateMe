//mock out the static assets like stylesheets and images
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/modules/**/*.{js,jsx,mjs}"],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // An array of file extensions that tells jest which files it can test.
  moduleFileExtensions: ["js", "json", "jsx"],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  // The glob patterns Jest uses to detect test files
  testMatch: ["**/tests/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: "http://localhost",
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  // Indicates whether each individual test should be reported during the run
  verbose: false,
};
