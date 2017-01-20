const resolvePkg = require('resolve');
const eslintrcUp = require('eslintrc-up');
const path = require('path');

export const interfaceVersion = 2;

export function resolve(source, file, config) {
  if (resolvePkg.isCore(source)) {
    return { found: true, path: null };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const alias in config) {
    if (source.match(new RegExp(`^${alias}(/|$)`))) {
      const src = source.replace(alias, config[alias]);

      try {
        return {
          found: true,
          path: resolvePkg.sync(src, {
            basedir: path.dirname(eslintrcUp.sync({
              cwd: path.dirname(file),
            })),
          }),
        };
      } catch (err) {} // eslint-disable-line no-empty
    }
  }

  return {
    found: false,
  };
}
