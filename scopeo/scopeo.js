const cl = (value) => {
  console.log(value);
};

const should = (str) => {
  return `: Should ${str}`;
};

const from = (...args) => {
  return [...args];
};

const title = (str) => {
  const line = '---------------------------------------------';
  cl(`${line}\n# ${str}\n${line}`);
};

const test = (title, from, description, callback) => {
  const currTitle = `\n## ${title}`;
  const currParamsStr =
    typeof from === 'object'
      ? JSON.stringify(from).slice(1, -1)
      : from.toString().slice(1, -1);
  const currParams = `\n: From ${currParamsStr}`;
  const currDescription = `\n${description}`;
  const result = callback(...from);

  cl(`${currTitle}${currParams}${currDescription}\n> ${result}`);
};

const end = () => {
  cl('\n\n\n');
};

export { should, title, test, from, end };
