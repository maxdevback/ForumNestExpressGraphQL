export const env = {
  number: (type: string) => {
    const variable = process.env[type];
    //TODO: Change
    if (!variable) throw 'Error';
    if (!isNaN(+variable)) throw 'Error';
    return +variable;
  },
  string: (type: string) => {
    const variable = process.env[type];
    //TODO: Change
    if (!variable) throw 'Error';
    if (!isNaN(+variable)) throw 'Error';
    return variable;
  },
};
