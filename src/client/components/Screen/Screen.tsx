import { FC } from 'react';
import styles from './Screen.module.scss';
import Query from '../Query/Query';
import Result from '../Result/Result';
import Clear from '../Clear/Clear';

interface ScreenProps {
  query: string;
  result: string;
  onClear: () => void;
}

const Screen: FC<ScreenProps> = (props: ScreenProps) => {
  const { query, result, onClear } = props;

  return (
    <div className={styles.screen}>
      <Query content={query} />
      <Result content={result} />
      <Clear onClick={onClear} />
    </div>
  );
};

export default Screen;
