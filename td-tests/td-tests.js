const cl = (value) => {
  console.log(value);
};

export const should = (str) => {
  return `Should ${str}`;
};

export const title = (str) => {
  const line = '---------------------------------------------';
  cl(`${line}\n# ${str}\n${line}`);
};

export const test = (titleStr, descriptionStr, callback) => {
  const title = `\n## ${titleStr}`;
  const description = `\n${descriptionStr}`;
  const result = callback();

  cl(`${title}${description}\n> ${result}`);
};
