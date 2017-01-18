/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const expect = require('chai').expect;
const rewire = require('rewire');

const resolverPlugin = rewire('../src/index');

const opts = {
  components: './dir/components',
  common: './dir/subdir/common',
  common2: './dir/subdir2',
};

// eslint-disable-next-line no-underscore-dangle
resolverPlugin.__set__('__dirname', __dirname);

describe('eslint-import-resolver-configurable', function () {
  it('should resolve when importing from components alias', function () {
    expect(resolverPlugin.resolve('components/comp1', path.resolve(__dirname, 'file1.js'), opts))
      .to.eql({
        found: true,
        path: path.resolve(__dirname, 'dir/components/comp1.js'),
      });
  });

  it('should resolve when importing from common alias', function () {
    expect(resolverPlugin.resolve('common/comp2', path.resolve(__dirname, 'file2.js'), opts))
      .to.eql({
        found: true,
        path: path.resolve(__dirname, 'dir/subdir/common/comp2.js'),
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

  it('should resolve when importing from common2 alias', function () {
    expect(resolverPlugin.resolve('common2/comp5', path.resolve(__dirname, 'file5.js'), opts))
      .to.eql({
        found: true,
        path: path.resolve(__dirname, 'dir/subdir2/comp5.js'),
      });
  });

  it('should resolve when importing core node module', function () {
    expect(resolverPlugin.resolve('fs', path.resolve(__dirname, 'file6.js'), opts))
      .to.eql({
        found: true,
        path: null,
      });
  });
});
