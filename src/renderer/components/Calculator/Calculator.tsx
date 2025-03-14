import { FC, useEffect, useState } from 'react';
import styles from './Calculator.module.scss';
import Screen from '../Screen/Screen';
import Keyboard from '../Keyboard/Keyboard';
import { IButton } from '../../common/interfaces';
import { BUTTONS } from '../../common/constants';

const Calculator: FC = () => {
  const [query, setQuery] = useState<IButton[]>([]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const char = e.key;
      for (const btn of BUTTONS) {
        if (char === btn.char || char === btn.alias) {
          handleClick(btn.char, btn.operation);
          break;
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleClick(char: string, operation: boolean) {
    setQuery((prevQuery) => {
      const lastElem = getLastElem(prevQuery);
      if (lastElem.operation && operation) prevQuery.pop();
      if (operationExists(prevQuery) && operation) return [...prevQuery];
      if (char === '.' && !dotAllowed(prevQuery)) return [...prevQuery];
      if (char === '=') return [...prevQuery];
      return [...prevQuery, { char, operation }];
    });
  }

  function dotAllowed(query: IButton[]): boolean {
    const lastElem = getLastElem(query);
    if (lastElem.operation || lastElem.char === '' || lastElem.char === '.') return false;

    for (const elem of [...query].reverse()) {
      if (elem.operation) break;
      if (elem.char === '.') return false;
    }
    return true;
  }
  function operationExists(query: IButton[]): boolean {
    for (const item of query) {
      if (item.operation) return true;
    }
    return false;
  }
  function getLastElem(query: IButton[]): IButton {
    if (query.length === 0)
      return {
        char: '',
        operation: false,
      };
    else return query[query.length - 1];
  }
  function getQueryString(query: IButton[]): string {
    return query.map((elem) => elem.char).join('');
  }

  return (
    <div className={styles.calculator}>
      <Screen query={getQueryString(query)} />
      <Keyboard onClick={handleClick} />
    </div>
  );
};

export default Calculator;
