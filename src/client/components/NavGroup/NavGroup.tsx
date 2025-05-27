import { Children, FC, PropsWithChildren } from 'react';
import classes from './NavGroup.module.scss';
import clsx from 'clsx';
import { Toggle } from '../Toggle/Toggle';

export interface NavGroupProps extends PropsWithChildren {
  className?: string;
}

export const NavGroup: FC<NavGroupProps> = (props: NavGroupProps) => {
  const { className, children } = props;

  return (
    <ul className={clsx(className, classes.wrapper)}>
      {Children.map(children, (child, index) => {
        return (
          <li key={index} className={classes.item}>
            <Toggle>{child}</Toggle>
          </li>
        );
      })}
    </ul>
  );
};
