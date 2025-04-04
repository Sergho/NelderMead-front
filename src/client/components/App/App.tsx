import { FC } from 'react';
import styles from './App.module.scss';
import Calculator from '../Calculator/Calculator';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <Calculator />
    </div>
  );
};

export default App;
