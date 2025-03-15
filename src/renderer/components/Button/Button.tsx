import { FC, MouseEvent } from 'react';
import styles from './Button.module.scss';
import { Type } from '../../types/enums';
import clsx from 'clsx';

export interface ButtonProps {
  value: string;
  type: Type;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { value, type, onClick } = props;

  return (
    <button
      className={clsx(styles.button, {
        [styles.dark]: type === Type.Dark,
        [styles.light]: type === Type.Light,
      })}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
