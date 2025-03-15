import { BUTTONS } from '../constants';

export const handleKeyDown = (
  handleClick: (char: string, operation: boolean) => void
) => {
  return (e: KeyboardEvent): void => {
    const char = e.key;
    for (const btn of BUTTONS) {
      if (char === btn.char || char === btn.alias) {
        handleClick(btn.char, btn.operation);
        break;
      }
    }
    e.preventDefault();
  };
};
