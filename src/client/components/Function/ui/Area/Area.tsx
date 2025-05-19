import clsx from 'clsx';
import classes from './Area.module.scss';
import { FC } from 'react';
import { Input } from '../Input/Input';

interface AreaProps {
  className?: string;
}

export const Area: FC<AreaProps> = (props: AreaProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Input />
    </div>
  );
};
