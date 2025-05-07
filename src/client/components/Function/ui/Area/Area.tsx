import clsx from 'clsx';
import classes from './Area.module.scss';
import { FC } from 'react';
import { Input } from '../Input/Input';

interface AreaProps {
  className?: string;
  expression?: string;
}

export const Area: FC<AreaProps> = (props: AreaProps) => {
  const { className, expression } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Input value={expression} />
    </div>
  );
};
