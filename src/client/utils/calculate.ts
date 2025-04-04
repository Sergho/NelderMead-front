import { IButton } from '../types/interfaces';
import { dynamicCalculate } from './dynamic-calculate';

export const calculate = async (query: IButton[]): Promise<string> => {
  const operands: string[] = ['', ''];
  let operation = '';
  let operandIndex = 0;
  for (const elem of query) {
    if (elem.operation) {
      operandIndex++;
      operation = elem.char;
      continue;
    }
    operands[operandIndex] += elem.char;
  }

  const result = await dynamicCalculate(operands, operation);
  return result;
};
