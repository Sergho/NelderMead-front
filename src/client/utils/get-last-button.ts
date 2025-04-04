import { IButton } from '../types/interfaces';

export const getLastElem = (query: IButton[]): IButton => {
  if (query.length === 0)
    return {
      char: '',
      operation: false,
    };
  else return query[query.length - 1];
};
