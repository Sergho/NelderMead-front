import { FC, useState } from 'react';
import styles from './Calculator.module.scss';
import Screen from '../Screen/Screen';
import Keyboard from '../Keyboard/Keyboard';
import { IButton } from '../../common/interfaces';

const Calculator: FC = () => {
  const [query, setQuery] = useState<IButton[]>([]);

  function handleClick(char: string, operation: boolean) {
    const lastElem = getLastElem();
    if (lastElem.operation && operation) query.pop();
    if (operationExists() && operation) return;
    if (char === '.' && !dotAllowed()) return;
    if (char === '=') return;
    setQuery([...query, { char, operation }]);
  }

  function dotAllowed(): boolean {
    const lastElem = getLastElem();
    if (lastElem.operation || lastElem.char === '' || lastElem.char === '.') return false;

    for (const elem of [...query].reverse()) {
      if (elem.operation) break;
      if (elem.char === '.') return false;
    }
    return true;
  }
  function operationExists(): boolean {
    for (const item of query) {
      if (item.operation) return true;
    }
    return false;
  }
  function getLastElem(): IButton {
    if (query.length === 0)
      return {
        char: '',
        operation: false,
      };
    else return query[query.length - 1];
  }
  function getQueryString(): string {
    return query.map((elem) => elem.char).join('');
  }

  return (
    <div className={styles.calculator}>
      <Screen query={getQueryString()} />
      <Keyboard onClick={handleClick} />
    </div>
  );
};

export default Calculator;
