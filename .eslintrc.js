module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['eslint:recommended', 'plugin:node/recommended'],
    plugins: ['node'],
    rules: {
        'indent': [2, 4, {'SwitchCase': 1}],
        'node/exports-style': [2, 'module.exports'],
        'semi': [2, 'always'],
        'space-before-function-paren': [2, {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'never'
        }],
        'strict': 2
    },
    globals: {
        Config: true,
        Mix: true
    }
};
