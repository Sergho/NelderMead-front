import clsx from 'clsx';
import classes from './Function.module.scss';
import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import { Area } from './ui/Area/Area';
import { Button } from '../Button/Button';

interface FunctionProps {
  className?: string;
  expression?: string;
  onInput?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: MouseEventHandler<HTMLButtonElement>;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className, expression, onInput, onSubmit } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Area expression={expression} onChange={onInput} className={classes.area} />
      <Button className={classes.button} onClick={onSubmit} rounded>
        Launch
      </Button>
    </div>
  );
};
