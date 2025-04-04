import { IButton } from '../../types/interfaces';

export const operationExists = (query: IButton[]): boolean => {
  for (const item of query) {
    if (item.operation) return true;
  }
  return false;
};
