module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '\\.(jpg|png|svg)$': './fileTransformer.js',
    },
}