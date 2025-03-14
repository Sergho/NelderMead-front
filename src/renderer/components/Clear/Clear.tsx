import styles from './Clear.module.scss';
import { FC } from 'react';

const Clear: FC = () => {
  return (
    <div className={styles.clear}>
      <span></span>
      <span></span>
    </div>
  );
};

export default Clear;
