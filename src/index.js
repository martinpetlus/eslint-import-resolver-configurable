exports.interfaceVersion = 2;

exports.resolve = function resolve(source, file, config) {
  var alias;

  // eslint-disable-next-line no-restricted-syntax
  for (alias in config) {
    if (source.indexOf(alias) === 0) {
      return {
        found: true,
        path: source.replace(alias, config[alias]),
      };
    }
  }

  return {
    found: false,
  };
};
