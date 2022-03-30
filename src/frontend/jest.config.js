module.exports = {
    testEnvironment: 'jsdom',
    // preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '\\.(jpg|png|svg)$': './fileTransformer.js',
    },
    transformIgnorePatterns: [
        'node_modules/?!(react-flow-renderer)'
    ]
}