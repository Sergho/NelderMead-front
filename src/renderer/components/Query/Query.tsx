import { ChangeEvent, FC, useState } from 'react';
import styles from './Query.module.scss';

interface QueryProps {
  content: string;
}

const Query: FC<QueryProps> = (props: QueryProps) => {
  const { content } = props;

  return (
    <div className={styles.query}>
      <input className={styles.input} type="text" value={content} />
    </div>
  );
};

export default Query;
