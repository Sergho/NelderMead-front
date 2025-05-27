import clsx from 'clsx';
import { FC } from 'react';
import classes from './ParamsInput.module.scss';
import { Param } from '../../types/enums/param.enum';
import { NumberInput } from '../NumberInput/NumberInput';

export interface ParamsInputProps {
  className?: string;
}

export const ParamsInput: FC<ParamsInputProps> = (props: ParamsInputProps) => {
  const { className } = props;

  function changeHandler(name: Param, value: number) {
    console.log(name, value);
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      {Object.values(Param).map((name) => {
        return (
          <NumberInput name={name} value={0} onChange={changeHandler} className={classes.input} />
        );
      })}
    </div>
  );
};
