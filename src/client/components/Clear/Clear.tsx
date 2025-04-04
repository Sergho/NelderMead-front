import styles from './Clear.module.scss';
import { FC } from 'react';

interface ClearProps {
  onClick: () => void;
}

const Clear: FC<ClearProps> = (props: ClearProps) => {
  const { onClick } = props;

  return (
    <div className={styles.clear} onClick={onClick}>
      <span></span>
      <span></span>
    </div>
  );
};

export default Clear;
