import clsx from 'clsx';
import classes from './Area.module.scss';
import { ChangeEventHandler, FC } from 'react';
import { Input } from '../Input/Input';

interface AreaProps {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  expression?: string;
}

export const Area: FC<AreaProps> = (props: AreaProps) => {
  const { className, onChange, expression } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Input value={expression} onChange={onChange} />
    </div>
  );
};
