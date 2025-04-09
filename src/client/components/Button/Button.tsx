import clsx from 'clsx';
import classes from './Button.module.scss';
import { FC, PropsWithChildren } from 'react';
import { Darkness, Size } from '../../types/enums';

interface ButtonProps extends PropsWithChildren {
  className?: string;
  darkness?: Darkness;
  size?: Size;
  rounded?: boolean;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { children, className, darkness, size, rounded } = props;
  return (
    <button
      className={clsx(
        className,
        classes.button,
        {
          [classes.rounded]: rounded,
        },
        {
          [classes.big]: size === Size.Big,
          [classes.small]: !size || size === Size.Small,
        },
        {
          [classes.dark]: darkness === Darkness.Dark,
          [classes.light]: !darkness || darkness === Darkness.Light,
        },
      )}
    >
      {children}
    </button>
  );
};
