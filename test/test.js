/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

var path = require('path');
var expect = require('chai').expect;

var resolverPlugin = require('../src/index');

var opts = {
  components: './dir/components',
  common: './dir/subdir/common',
};

describe('eslint-import-resolver-configurable', function () {
  it('should resolve when importing from components alias', function () {
    expect(resolverPlugin.resolve('components/comp1', path.resolve(__dirname, 'file1.js'), opts))
      .to.eql({
        found: true,
        path: './dir/components/comp1',
      });
  });

  it('should resolve when importing from common alias', function () {
    expect(resolverPlugin.resolve('common/comp2', path.resolve(__dirname, 'file2.js'), opts))
      .to.eql({
        found: true,
        path: './dir/subdir/common/comp2',
      });
  });

  it('should not resolve when importing from nonexistent alias', function () {
    expect(resolverPlugin.resolve('nonexistent/comp3', path.resolve(__dirname, 'file3.js'), opts))
      .to.eql({
        found: false,
      });
  });

  it('should not resolve when importing without plugin options', function () {
    expect(resolverPlugin.resolve('components/comp4', path.resolve(__dirname, 'file4.js'), {}))
      .to.eql({
        found: false,
      });
  });
});
