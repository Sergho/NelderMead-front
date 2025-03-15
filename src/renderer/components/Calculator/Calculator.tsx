import { FC, useEffect, useState } from 'react';
import styles from './Calculator.module.scss';
import Screen from '../Screen/Screen';
import Keyboard from '../Keyboard/Keyboard';
import { IButton } from '../../common/interfaces';
import { BUTTONS } from '../../common/constants';

const Calculator: FC = () => {
  const [query, setQuery] = useState<IButton[]>([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const char = e.key;
      for (const btn of BUTTONS) {
        if (char === btn.char || char === btn.alias) {
          handleClick(btn.char, btn.operation);
          break;
        }
      }
      e.preventDefault();
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
      if (char === '=') {
        calculate(prevQuery);
        return [...prevQuery];
      }
      return [...prevQuery, { char, operation }];
    });
  }
  function handleClear() {
    setQuery([]);
    setResult('');
  }

  function calculate(query: IButton[]) {
    setResult((prevResult) => {
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

      let result: string;
      switch (operation) {
        case '+':
          result = String(+operands[0] + +operands[1]);
          break;
        case '-':
          result = String(+operands[0] - +operands[1]);
          break;
        case 'x':
          result = String(+operands[0] * +operands[1]);
          break;
        case '/':
          result = String(+operands[0] / +operands[1]);
          break;
        default:
          result = operands[0];
          break;
      }
      updateQuery(result);
      return result;
    });
  }

  function updateQuery(result: string) {
    setQuery((prevQuery) => {
      if (result === 'Error!') return [];
      const res = result.split('').map((char) => {
        return { char, operation: false };
      });
      return res;
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
      <Screen onClear={handleClear} result={result} query={getQueryString(query)} />
      <Keyboard onClick={handleClick} />
    </div>
  );
};

export default Calculator;
