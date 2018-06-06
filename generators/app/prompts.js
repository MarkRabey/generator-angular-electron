module.exports = ({ props, user }) => {
  return [
    {
      type: 'input',
      name: 'productName',
      when: !props.productName,
      message: 'Project name:',
      default: 'My Project',
    },
    {
      type: 'input',
      name: 'version',
      when: !props.version,
      message: 'Version:',
      default: '0.1.0',
    },
    {
      type: 'input',
      name: 'description',
      when: !props.description,
      message: 'Description:',
    },
    {
      type: 'input',
      name: 'githubAccount',
      when: !props.githubAccount,
      message: 'GitHub Username or Organization:',
      default: user.github.username,
    },
    {
      type: 'input',
      name: 'authorName',
      message: "Author's Name",
      when: !props.authorName,
      default: user.git.name(),
      store: true,
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: "Author's Email",
      when: !props.authorEmail,
      default: user.git.email(),
      store: true,
    },
    {
      type: 'input',
      name: 'authorUrl',
      message: "Author's Homepage",
      when: !props.authorUrl,
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
      when: !props.uikit,
      default: false,
    },
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies when finished?',
      when: !props.install,
      default: true,
    },
  ];
};
