import axios from 'axios';

export const dynamicCalculate = async (
  operands: string[],
  operation: string
): Promise<string> => {
  const urls = {
    '+': 'http://localhost:3001/addition',
    '-': 'http://localhost:3001/subtraction',
    x: 'http://localhost:3001/multiplication',
    '/': 'http://localhost:3001/division',
  };
  const result = await axios.get(urls[operation], {
    params: {
      first: +operands[0],
      second: +operands[1],
    },
  });
  return result.data;
};
