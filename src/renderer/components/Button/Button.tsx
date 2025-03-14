import { FC } from 'react';
import styles from './Button.module.scss';
import { Type } from '../../common/enums';
import clsx from 'clsx';

interface ButtonProps {
  value: string;
  type: Type;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { value, type } = props;

  return (
    <h1
      className={clsx(styles.button, {
        [styles.dark]: type === Type.Dark,
        [styles.light]: type === Type.Light,
      })}
    >
      {value}
    </h1>
  );
};

export default Button;
