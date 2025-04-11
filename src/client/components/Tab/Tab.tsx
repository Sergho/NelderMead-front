import clsx from 'clsx';
import classes from './Tab.module.scss';
import { ChangeEvent, FC, useState } from 'react';
import { Function } from '../Function/Function';
import { Log } from '../Log/Log';

interface TabProps {
  className?: string;
}

export const Tab: FC<TabProps> = (props: TabProps) => {
  const { className } = props;

  const [expression, setExpression] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setExpression(e.target.value);
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <h1 className={classes.title}>Function</h1>
      <Function onChange={handleChange} expression={expression} className={classes.function} />
      <Log />
    </div>
  );
};
