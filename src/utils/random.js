const random = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomString = (param) => {
  let result = '';
  while (result.length < param) {
    result += random(0, 9).toString();
  }
  return result;
};

export { generateRandomString, random };
