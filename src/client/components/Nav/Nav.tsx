import clsx from 'clsx';
import classes from './Nav.module.scss';
import { FC } from 'react';
import { Toggle } from '../Toggle/Toggle';

interface NavProps {
  className?: string;
}

export const Nav: FC<NavProps> = (props: NavProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Toggle className={classes.item} />
    </div>
  );
};
