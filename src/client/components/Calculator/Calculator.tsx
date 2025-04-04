import { FC, useEffect, useState } from 'react';
import styles from './Calculator.module.scss';
import Screen from '../Screen/Screen';
import Keyboard from '../Keyboard/Keyboard';
import { IButton } from '../../types/interfaces';
import { calculate } from '../../utils/calculate';
import { dotAllowed } from '../../utils/dot-allowed';
import { getLastElem } from '../../utils/get-last-button';
import { getQueryString } from '../../utils/get-query-string';
import { handleKeyDown } from '../../utils/handle-key-down';
import { operationExists } from '../../utils/operation-exists';
import { updatedQuery } from '../../utils/updated-query';

const Calculator: FC = () => {
  const [query, setQuery] = useState<IButton[]>([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    const handler = handleKeyDown(handleClick, handleClear);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  function handleClick(char: string, operation: boolean) {
    setQuery((prevQuery) => {
      const lastElem = getLastElem(prevQuery);
      if (lastElem.operation && operation) prevQuery.pop();
      if (operationExists(prevQuery) && operation) return [...prevQuery];
      if (char === '.' && !dotAllowed(prevQuery)) return [...prevQuery];
      if (char === '=') {
        calculate(prevQuery).then((result) => {
          setQuery(updatedQuery(result));
          setResult(result);
        });
        return [...prevQuery];
      }
      return [...prevQuery, { char, operation }];
    });
  }

  function handleClear() {
    setQuery([]);
    setResult('');
  }

  return (
    <div className={styles.calculator}>
      <Screen onClear={handleClear} result={result} query={getQueryString(query)} />
      <Keyboard onClick={handleClick} />
    </div>
  );
};

export default Calculator;
