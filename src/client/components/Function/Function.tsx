import clsx from 'clsx';
import classes from './Function.module.scss';
import { FC } from 'react';
import { Input } from './ui/Input/Input';

interface FunctionProps {
  className?: string;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Input initialValue="x+1-" />
    </div>
  );
};
