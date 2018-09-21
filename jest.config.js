module.exports = {
    verbose: false,
    testPathIgnorePatterns: [
      '/test',
      '/node_modules/',
      '/resources/js/helpers/',
      '/resources/js/__tests__'
    ],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupTestFrameworkScriptFile: './resources/js/__test__/setupTests.js',
    // setupFiles: ['jest-localstorage-mock'],
    testURL: 'http://localhost',
};
