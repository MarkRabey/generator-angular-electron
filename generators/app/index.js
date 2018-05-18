'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const semver = require('semver');
const kebabCase = require('just-kebab-case');

module.exports = class extends Generator {
  initializing() {
    this.props = {};

    if (semver.lt(process.version, '8.9.0')) {
      this.log(chalk.yellow('Angular CLI v6 needs NodeJS v8.9 or greater.'));
      this.log(
        chalk.yellow(
          `You are using version ${
            process.version
          } which is not supported, please upgrade your version of NodeJS.\n`
        )
      );
      process.exit(-1);
    }
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'productName',
        when: !this.props.name,
        message: 'Project name:',
        default: 'My Project',
      },
      {
        type: 'input',
        name: 'version',
        when: !this.props.version,
        message: 'Version:',
        default: '0.1.0',
      },
      {
        type: 'input',
        name: 'description',
        when: !this.props.description,
        message: 'Description:',
      },
      {
        type: 'input',
        name: 'githubAccount',
        when: !this.props.githubAccount,
        message: 'GitHub Username or Organization:',
        default: this.user.github.username,
      },
      {
        type: 'input',
        name: 'authorName',
        message: "Author's Name",
        when: !this.props.authorName,
        default: this.user.git.name(),
        store: true,
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: "Author's Email",
        when: !this.props.authorEmail,
        default: this.user.git.email(),
        store: true,
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: "Author's Homepage",
        when: !this.props.authorUrl,
        store: true,
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        filter(words) {
          return words.split(/\s*,\s*/g);
        },
      },
      {
        type: 'confirm',
        name: 'uikit',
        message: 'Include UIkit?',
        default: false,
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.name = kebabCase(this.props.productName);
    });
  }

  default() {
    this.destinationRoot(this.props.name);
  }

  writing() {
    this.log(chalk.cyan('Copying files'));

    const nonTemplatedFiles = [
      { src: '_editorconfig', dest: '.editorconfig' },
      { src: '_gitignore', dest: '.gitignore' },
      { src: '_prettierrc', dest: '.prettierrc' },
      { src: '_travis.yml', dest: '.travis.yml' },
      { src: '_karma.conf.js', dest: 'karma.conf.js' },
      { src: '_protractor.conf.js', dest: 'protractor.conf.js' },
      { src: '_tsconfig.json', dest: 'tsconfig.json' },
      { src: '_tslint.json', dest: 'tslint.json' },
    ];

    nonTemplatedFiles.forEach(file => {
      this.fs.copy(this.templatePath(file.src), this.destinationPath(file.dest));
    });

    const templatedFiles = [
      { src: '_README.md', dest: 'README.md' },
      { src: '_LICENSE', dest: 'LICENSE' },
      { src: '_package.json', dest: 'package.json' },
      { src: '_angular.json', dest: 'angular.json' },
      { src: 'e2e/**', dest: 'e2e' },
      { src: 'src/**/*', dest: 'src' },
    ];

    templatedFiles.forEach(file => {
      this.fs.copyTpl(this.templatePath(file.src), this.destinationPath(file.dest), {
        props: this.props,
      });
    });
  }

  install() {
    this.log(
      `\nRunning ${chalk.yellow(
        `${this.packageManager} install`
      )}. This might take a couple minutes.`
    );
    this.npmInstall(null, { loglevel: 'error' });
  }

  end() {
    this.log('\nInstallation complete. Get started with the following commands:');
    this.log(
      `- $ ${chalk.green(
        `${this.packageManager} start`
      )}: start dev server with live reload inside your Eletron app.`
    );
  }
};
