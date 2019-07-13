const path = require("path");
const rootDir = path.join(__dirname, "..", "..");
const aliases = require("../webpack.alias.js");

module.exports = {
  "rootDir": rootDir,
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,mjs}"
  ],
  "setupFiles": [
    "<rootDir>/config/polyfills.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"
  ],
  "testEnvironment": "node",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": path.join(__dirname, "./cssTransform.js"),
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
  ],
  "moduleFileExtensions": [
    "web.js",
    "mjs",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  "moduleNameMapper": aliases.jest
};
