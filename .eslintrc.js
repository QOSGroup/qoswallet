module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "plugins": ["react", "react-native"],
    "globals": {
        "__DEV__": true,
        "fetch": true,
        "require": true
    },
    "parser": "babel-eslint",
    "rules": {
        "max-len": ["error", 120],
        'quotes': [2, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
        }],
        "no-console": 0,
        "react/forbid-prop-types": [0, { "forbid": ["any", "array", "object"] }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types": ["error", { "ignore": ["navigation"] }]
    }
}