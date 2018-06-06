'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const semver = require('semver');
const kebabCase = require('just-kebab-case');
const prompts = require('./prompts');
const staticFiles = require('./staticFiles');
const templateFiles = require('./templateFiles');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.packageManager = 'npm';
    this.argument('productName', { type: String, required: false });

    this.option('uikit', {
      desc: 'Add UIKit to the project',
      alias: 'u',
      type: Boolean,
      default: false,
    });

    this.props = {
      productName: opts.productName,
      uikit: opts.uikit,
    };
  }

  initializing() {
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
    return this.prompt(prompts(this)).then(props => {
      this.props = props;
      this.props.name = kebabCase(this.props.productName);
    });
  }

  default() {
    this.destinationRoot(this.props.name);
  }

  writing() {
    this.log(chalk.cyan('Copying files'));

    staticFiles.forEach(file => {
      this.fs.copy(this.templatePath(file.src), this.destinationPath(file.dest));
    });

    templateFiles.forEach(file => {
      this.fs.copyTpl(this.templatePath(file.src), this.destinationPath(file.dest), {
        props: this.props,
      });
    });
  }

  install() {
    if (this.props.install) {
      this.log(
        `\nRunning ${chalk.yellow(
          `${this.packageManager} install`
        )}. This might take a couple minutes.`
      );
      this.npmInstall(null, { loglevel: 'error' });
    }
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
