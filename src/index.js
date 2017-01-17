var resolvePkg = require('resolve');
var eslintrcUp = require('eslintrc-up');
var path = require('path');

exports.interfaceVersion = 2;

exports.resolve = function resolve(source, file, config) {
  var alias;
  var src;

  // eslint-disable-next-line no-restricted-syntax
  for (alias in config) {
    if (source.match(new RegExp('^' + alias + '(/|$)'))) {
      src = source.replace(alias, config[alias]);

      try {
        return {
          found: true,
          path: resolvePkg.sync(src, {
            basedir: path.dirname(eslintrcUp.sync({ cwd: __dirname })),
          }),
        };
      } catch (err) {} // eslint-disable-line no-empty
    }
  }

  return {
    found: false,
  };
};
