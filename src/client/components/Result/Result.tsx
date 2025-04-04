import { FC } from 'react';
import styles from './Result.module.scss';

interface ResultProps {
  content: string;
}

const Result: FC<ResultProps> = (props: ResultProps) => {
  const { content } = props;

  return (
    <div className={styles.result}>
      <p className={styles.input}>{content}</p>
    </div>
  );
};

export default Result;
