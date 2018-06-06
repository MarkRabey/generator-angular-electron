'use strict';
const assert = require('yeoman-assert');

describe('generator-angular-electron:app', () => {
  it('creates files', () => {
    assert.file(['package.json']);
  });
});
