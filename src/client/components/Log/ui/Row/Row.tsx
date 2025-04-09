import clsx from 'clsx';
import classes from './Row.module.scss';
import { FC, PropsWithChildren } from 'react';

interface RowProps extends PropsWithChildren {
  className?: string;
  index: number;
  text?: string;
}

export const Row: FC<RowProps> = (props: RowProps) => {
  const { className, index, children } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <span className={classes.index}>{index}</span>
      <p className={classes.content}>{children}</p>
    </div>
  );
};
