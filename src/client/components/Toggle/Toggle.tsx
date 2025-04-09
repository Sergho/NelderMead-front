import clsx from 'clsx';
import classes from './Toggle.module.scss';
import { FC } from 'react';

interface ToggleProps {
  className?: string;
}

export const Toggle: FC<ToggleProps> = (props: ToggleProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <span className={classes.stick}></span>
      <span className={classes.stick}></span>
    </div>
  );
};
