import clsx from 'clsx';
import classes from './Tab.module.scss';
import { FC } from 'react';
import { Function } from '../Function/Function';
import { Log } from '../Log/Log';

interface TabProps {
  className?: string;
}

export const Tab: FC<TabProps> = (props: TabProps) => {
  const { className } = props;

  return (
    <div className={clsx(className, classes.wrapper)}>
      <h1 className={classes.title}>Function</h1>
      <Function className={classes.function} />
      <Log />
    </div>
  );
};
