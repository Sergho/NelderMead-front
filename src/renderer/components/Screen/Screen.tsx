import { ChangeEvent, FC, useState } from 'react';
import styles from './Screen.module.scss';
import Query from '../Query/Query';
import Result from '../Result/Result';

const Screen: FC = () => {
  const [content, setContent] = useState('');

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
  }

  return (
    <div className={styles.screen}>
      <Query />
      <Result />
    </div>
  );
};

export default Screen;
