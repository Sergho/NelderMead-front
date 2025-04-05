import clsx from 'clsx';
import classes from './Button.module.scss';
import { FC, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  className?: string;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { children, className } = props;
  return <button className={clsx(className, classes.button)}>{children}</button>;
};
