import { IButton } from '../../types/interfaces';
import { getLastElem } from './get-last-button';

export const dotAllowed = (query: IButton[]): boolean => {
  const lastElem = getLastElem(query);
  if (lastElem.operation || lastElem.char === '' || lastElem.char === '.') return false;

  for (const elem of [...query].reverse()) {
    if (elem.operation) break;
    if (elem.char === '.') return false;
  }
  return true;
};
