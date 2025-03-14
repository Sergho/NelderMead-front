import { FC } from 'react';
import styles from './Screen.module.scss';
import Query from '../Query/Query';
import Result from '../Result/Result';
import Clear from '../Clear/Clear';

const Screen: FC = () => {
  return (
    <div className={styles.screen}>
      <Query />
      <Result />
      <Clear />
    </div>
  );
};

export default Screen;
