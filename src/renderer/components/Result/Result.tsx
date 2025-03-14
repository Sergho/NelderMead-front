import { FC } from 'react';
import styles from './Result.module.scss';

const Result: FC = () => {
  return (
    <div className={styles.result}>
      <input className={styles.input} type="text" value={1234567890} />
    </div>
  );
};

export default Result;
