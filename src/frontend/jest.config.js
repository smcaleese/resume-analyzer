module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '\\.(jpg|png|svg)$': './src/tests/utils/fileTransformer.js',
    },
    transformIgnorePatterns: [
        'node_modules/?!(react-flow-renderer)'
    ],
    setupFilesAfterEnv: [
        './src/setupTests.js',
    ]
}