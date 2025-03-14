import { ChangeEvent, FC, useState } from 'react';
import styles from './Query.module.scss';

const Query: FC = () => {
  const [content, setContent] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
  }

  return (
    <div className={styles.query}>
      <input
        className={styles.input}
        type="text"
        onChange={handleChange}
        value={content}
      />
    </div>
  );
};

export default Query;
