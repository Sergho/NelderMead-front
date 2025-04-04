import { BUTTONS, CLOSE_BUTTON } from '../constants';

export const handleKeyDown = (
  handleClick: (char: string, operation: boolean) => void,
  handleClear: () => void
) => {
  return (e: KeyboardEvent): void => {
    const char = e.key;
    if (char === CLOSE_BUTTON) {
      handleClear();
    } else {
      for (const btn of BUTTONS) {
        if (char === btn.char || char === btn.alias) {
          handleClick(btn.char, btn.operation);
          break;
        }
      }
    }
    e.preventDefault();
  };
};
