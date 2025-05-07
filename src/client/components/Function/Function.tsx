import clsx from 'clsx';
import classes from './Function.module.scss';
import { FC, MouseEventHandler } from 'react';
import { Area } from './ui/Area/Area';
import { Button } from '../Button/Button';

interface FunctionProps {
  className?: string;
  expression?: string;
  onSubmit?: MouseEventHandler<HTMLButtonElement>;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className, expression, onSubmit } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Area expression={expression} className={classes.area} />
      <Button className={classes.button} onClick={onSubmit} rounded>
        Launch
      </Button>
    </div>
  );
};
