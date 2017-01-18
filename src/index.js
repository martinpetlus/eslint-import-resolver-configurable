const resolve = require('resolve');
const eslintrcUp = require('eslintrc-up');
const path = require('path');

exports.interfaceVersion = 2;

exports.resolve = (source, file, config) => {
  if (resolve.isCore(source)) {
    return { found: true, path: null };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const alias in config) {
    if (source.match(new RegExp(`^${alias}(/|$)`))) {
      const src = source.replace(alias, config[alias]);

      try {
        return {
          found: true,
          path: resolve.sync(src, {
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
