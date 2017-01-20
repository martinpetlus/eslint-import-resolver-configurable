# **eslint-import-resolver-configurable**

---

Imagine you have the following configuration in `webpack.conf.js`:

```javascript
// webpack.conf.js
module.exports = {
  // ...
  resolve: {
    alias: {
      common: './src/subdir/common-components'
    }
  },
  // ...
};
```

And also imagine that you can't use `webpack` resolver from `eslint-plugin-import` (or you alias things in some other bundler) when linting your imports.

This package allows you to resolve such aliases. Configuration in your `.eslintrc.js` to resolve such alias for proper linting would be same as your alias config:

```javascript
// .eslintrc.js
module.exports = {
  // ...
  settings: {
    'import/resolver': {
      configurable: {
        common: './src/subdir/common-components',
        // Or absolute paths
        components: '/path/to/some/dir'
      }
    }
  },
  // ...
};
```

Paths are resolved relative to `.eslintrc.js` location.
