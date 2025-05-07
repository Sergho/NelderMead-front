import clsx from 'clsx';
import classes from './Button.module.scss';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { Darkness, Size } from '../../types/enums';

interface ButtonProps extends PropsWithChildren {
  className?: string;
  darkness?: Darkness;
  size?: Size;
  rounded?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { children, className, darkness, size, rounded, onClick } = props;
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
      onClick={onClick}
    >
      {children}
    </button>
  );
};
