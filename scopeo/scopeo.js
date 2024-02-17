import chalk from 'chalk';

const log = console.log;

const should = (str) => {
  return `: Should ${str}`;
};

const from = (...args) => {
  return [...args];
};

const title = (str) => {
  const line = '---------------------------------------------';
  log(chalk.magentaBright(`\n${line}\n# ${chalk.bold(str)}\n${line}`));
};

const test = (title, from, description, callback) => {
  const currTitle = `\n## ${title}`;
  const currParamsStr =
    typeof from === 'object'
      ? JSON.stringify(from).slice(1, -1)
      : from.toString().slice(1, -1);
  const currParams = `\n: From ${currParamsStr}`;
  const currDescription = `\n${description}`;
  const output = callback(...from);

  const result =
    chalk.cyanBright(currTitle + currParams + currDescription + '\n> ') +
    chalk.white(output);

  log(result);
};

const end = () => {
  log(chalk.magentaBright(`\nend of tests --------------------------------\n`));
};

export { should, title, test, from, end };
