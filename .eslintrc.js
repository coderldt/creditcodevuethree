module.exports = {
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/prettier",
  ],
  "parserOptions": { 
    "parser": "babel-eslint"
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "lf",
      },
    ],
    // "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
    // "quotes": ["error", "double"],
    // "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
    // "arrow-spacing": ["error", { "before": true, "after": true }]
  },
  "globals": {
    "node": "readonly"
  }
} 