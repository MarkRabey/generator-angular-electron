'use strict';
// Cconst path = require('path');
const assert = require('yeoman-assert');
// Cconst helpers = require('yeoman-test');

describe('generator-angular-electron:app', () => {
  // Comment
  // beforeAll(() => {
  //   return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
  //     productName: 'My Project',
  //     version: '0.1.0',
  //     githubAccount: 'MarkRabey',
  //     authorName: 'Mark Rabey',
  //     authorEmail: 'mark@markrabey.com',
  //     authorUrl: 'https://markrabey.com',
  //     uikit: true,
  //   });
  // });

  it('creates files', () => {
    assert.file(['package.json']);
  });
});
