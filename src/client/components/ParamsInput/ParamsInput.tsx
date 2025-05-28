import clsx from 'clsx';
import { FC } from 'react';
import classes from './ParamsInput.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NumberInput } from '../NumberInput/NumberInput';
import { setParams } from '../../features/inputs/inputs.slice';

export interface ParamsInputProps {
  className?: string;
}

export const ParamsInput: FC<ParamsInputProps> = (props: ParamsInputProps) => {
  const { className } = props;
  const params = useAppSelector((state) => state.inputs.params);
  const dispatch = useAppDispatch();

  function handleChange(name: string, value: string) {
    dispatch(setParams({ [name]: value }));
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      {Object.keys(params).map((name, index) => {
        return <NumberInput key={index} name={name} value={params[name]} onChange={handleChange} />;
      })}
    </div>
  );
};
