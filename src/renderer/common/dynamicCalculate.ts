import axios from 'axios';

export const dynamicCalculate = async (
  operands: string[],
  operation: string
): Promise<string> => {
  const result = await axios.get('http://localhost:3001/sum', {
    params: {
      first: +operands[0],
      second: +operands[1],
    },
  });
  return result.data;
};
