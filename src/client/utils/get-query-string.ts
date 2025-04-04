import { IButton } from '../types/interfaces';

export const getQueryString = (query: IButton[]): string => {
  return query.map((elem) => elem.char).join('');
};
