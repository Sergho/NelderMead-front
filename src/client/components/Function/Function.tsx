import clsx from 'clsx';
import classes from './Function.module.scss';
import { FC } from 'react';
import { Area } from './ui/Area/Area';
import { Button } from '../Button/Button';

interface FunctionProps {
  className?: string;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Area className={classes.area} />
      <Button className={classes.button} rounded>
        Launch
      </Button>
    </div>
  );
};
