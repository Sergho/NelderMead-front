import { FC } from 'react';
import classes from './NumberInput.module.scss';
import clsx from 'clsx';
import { PARAMS_OPTIONS } from '../../constants';

export interface NumberInputProps {
  className?: string;
  name: string;
  value: number | null;
  onChange: (name: string, value: string) => void;
}

export const NumberInput: FC<NumberInputProps> = (props: NumberInputProps) => {
  const { name, value, onChange, className } = props;
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <label className={clsx(className, classes.wrapper)}>
      <p className={clsx(classes.label)}>{label}</p>
      <input
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
        type="number"
        name={name}
        value={value === null ? '' : value}
        className={clsx(classes.input)}
        step={PARAMS_OPTIONS[name]?.step}
      />
    </label>
  );
};
