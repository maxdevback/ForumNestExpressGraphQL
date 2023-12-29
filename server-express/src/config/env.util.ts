export const env = {
  number: (name: string) => {
    const variable = process.env[name];
    if (!variable) throw `${variable} doesn't found`;
    if (!isNaN(+variable)) throw `${variable} can't be number`;
    return +variable;
  },
  string: (type: string) => {
    const variable = process.env[type];
    if (!variable) throw `${variable} doesn't found`;
    return variable;
  },
};
