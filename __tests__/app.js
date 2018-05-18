'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-angular-electron:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      productName: 'My Project',
      version: '0.1.0',
      githubAccount: 'MarkRabey',
      authorName: 'Mark Rabey',
      authorEmail: 'mark@markrabey.com',
      authorUrl: 'https://markrabey.com',
      uikit: true,
    });
  });

  it('creates files', () => {
    assert.file(['package.json']);
  });
});
