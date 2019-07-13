const path = require('path');
const rootDir = path.join(__dirname, '..');

const aliases = {
  'aurae-config/tabsMenuConfig': '<rootDir>/src/config/tabsMenuConfig.js',
  'aurae-components/navigation/TabsMenu': '<rootDir>/src/components/navigation/TabsMenu/index.js',
  'aurae-reducers': '<rootDir>/src/store/reducers',
  'aurae-store': '<rootDir>/src/store',
  'aurae-store/actions': '<rootDir>/src/store/actions/index.js',
  'aurae-config': '<rootDir>/src/config',
  'aurae-utils': '<rootDir>/src/utils',
  'aurae-components': '<rootDir>/src/components',
  'aurae-pages': '<rootDir>/src/components/pages',
  'aurae-common-shapes': '<rootDir>/src/components/commonShapes',
  'aurae-config/resourceClasses': '<rootDir>/src/config/resourceClasses.js',
  'aurae-routes': '<rootDir>/src/routes.js'
};

// TODO: This is a VERY frustrating amount of configuration. Investigated
// 3P modules for translating webpack aliases into Jest format, but I
// encountered a series of issues as of 4/28. Ideally, I'd like to remove
// all this code and replace it with a third-party solution.
const webpack = Object.keys(aliases).reduce((map, alias) => {
  let path = aliases[alias];
  // Local files (not third-party modules)
  if (path.includes('<rootDir>')) {
    path = path.replace('<rootDir>', rootDir);
  }
  map[alias] = path;
  return map;
}, {});

const jest = Object.keys(aliases).reduce((map, alias) => {
  let path = aliases[alias];
  if (path.includes('<rootDir>')) {
    alias = `^${alias}/?(.+)`;

    if (!path.includes('.')) {
      path += '/$1';
    }
  }
  map[alias] = path;
  return map;
}, {});

module.exports = { webpack, jest };
