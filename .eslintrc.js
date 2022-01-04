module.exports = {
  extends: [
    "alloy",
    "alloy/typescript",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        // printWidth: 200,
        //   tabWidth: 4,
        //   useTabs: false,
        //   semi: true, // 未尾逗号
        //   vueIndentScriptAndStyle: false,
        //   singleQuote: true, // 单引号
        //   quoteProps: "as-needed",
        //   bracketSpacing: false,
        //   trailingComma: "none", // 未尾分号
        //   jsxBracketSameLine: false,
        //   jsxSingleQuote: false,
        //   arrowParens: "always",
        //   insertPragma: "never",
        //   requirePragma: false,
        //   proseWrap: "never",
        //   htmlWhitespaceSensitivity: "ignore",
        //   endOfLine: "auto",
        endOfLine: "auto",
      },
    ],
    "vue/max-attributes-per-line": ["off"],
    "vue/no-v-model-argument": ["off"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          normal: "never",
          void: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/singleline-html-element-content-newline": ["off"],
    "no-promise-executor-return": "off",
    "no-unreachable-loop": "off",
    "no-unsafe-optional-chaining": "off",
  },
};
