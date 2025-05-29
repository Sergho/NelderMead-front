import clsx from 'clsx';
import { FC } from 'react';
import classes from './SimplexInput.module.scss';
import { NumberInput } from '../NumberInput/NumberInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setStartSimplex } from '../../features/inputs/inputs.slice';

export interface SimplexInputProps {
  className?: string;
}

export const SimplexInput: FC<SimplexInputProps> = (props: SimplexInputProps) => {
  const { className } = props;
  const startSimplex = useAppSelector((state) => state.inputs.startSimplex);
  const dispatch = useAppDispatch();

  function handleChange(name: string, value: string) {
    if (name.slice(0, 6) === 'point-') {
      const currentPoint = [...startSimplex.startPoint];
      const index = +name.slice(6);
      currentPoint[index] = +value;
      dispatch(setStartSimplex({ startPoint: currentPoint }));
    } else {
      dispatch(setStartSimplex({ [name]: +value }));
    }
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <NumberInput name="dimension" value={startSimplex.dimension} onChange={handleChange} />
      <NumberInput
        name="simplexOffset"
        value={startSimplex.simplexOffset}
        onChange={handleChange}
      />
      {Array(Math.max(startSimplex.dimension, 0))
        .fill(0)
        .map((_, index) => {
          return (
            <NumberInput
              key={index}
              name={`point-${index}`}
              value={startSimplex.startPoint[index]}
              onChange={handleChange}
            />
          );
        })}
    </div>
  );
};
