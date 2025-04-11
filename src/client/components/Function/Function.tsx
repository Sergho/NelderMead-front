import clsx from 'clsx';
import classes from './Function.module.scss';
import { ChangeEventHandler, FC } from 'react';
import { Area } from './ui/Area/Area';
import { Button } from '../Button/Button';

interface FunctionProps {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  expression?: string;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className, onChange, expression } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Area expression={expression} onChange={onChange} className={classes.area} />
      <Button className={classes.button} rounded>
        Launch
      </Button>
    </div>
  );
};
