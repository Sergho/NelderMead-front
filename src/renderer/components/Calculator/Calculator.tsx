import { FC } from 'react';
import styles from './Calculator.module.scss';
import Screen from '../Screen/Screen';
import Keyboard from '../Keyboard/Keyboard';

const Calculator: FC = () => {
  return (
    <div className={styles.calculator}>
      <Screen />
      <Keyboard />
    </div>
  );
};

export default Calculator;
