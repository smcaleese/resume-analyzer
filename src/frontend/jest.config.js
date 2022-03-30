module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '\\.(jpg|png|svg)$': './fileTransformer.js',
    },
    transformIgnorePatterns: [
        'node_modules/?!(react-flow-renderer)'
    ]
}