import clsx from 'clsx';
import classes from './FunctionTab.module.scss';
import { FC } from 'react';
import { Function } from '../../../Function/Function';
import { Log } from '../../../Log/Log';

interface FunctionTabProps {
  className?: string;
}

export const FunctionTab: FC<FunctionTabProps> = (props: FunctionTabProps) => {
  const { className } = props;

  return (
    <div className={clsx(className, classes.wrapper)}>
      <h1 className={classes.title}>Function</h1>
      <Function className={classes.function} />
      <Log />
    </div>
  );
};
