import { ChangeEvent, FC, useState } from 'react';
import styles from './Query.module.scss';

interface QueryProps {
  content: string;
}

const Query: FC<QueryProps> = (props: QueryProps) => {
  const { content } = props;

  return (
    <div className={styles.query}>
      <p className={styles.input}>{content}</p>
    </div>
  );
};

export default Query;
