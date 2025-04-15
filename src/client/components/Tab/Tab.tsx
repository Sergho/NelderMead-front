import clsx from 'clsx';
import classes from './Tab.module.scss';
import { ChangeEvent, FC, useState } from 'react';
import { Function } from '../Function/Function';
import { Log } from '../Log/Log';
import { createTree } from '../../axios/create-tree';

interface TabProps {
  className?: string;
}

export const Tab: FC<TabProps> = (props: TabProps) => {
  const { className } = props;

  const [expression, setExpression] = useState('');

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setExpression(value);
  }

  async function handleSubmit() {
    console.log(await createTree(expression));
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <h1 className={classes.title}>Function</h1>
      <Function
        onInput={handleChange}
        onSubmit={handleSubmit}
        expression={expression}
        className={classes.function}
      />
      <Log />
    </div>
  );
};
