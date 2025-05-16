import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classes from './Range.module.scss';
import { FC } from 'react';
import { setActiveIndex } from '../../features/solution/solution.slice';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface RangeProps {
  className?: string;
}

export const Range: FC<RangeProps> = (props: RangeProps) => {
  const { className } = props;

  const simplexes = useAppSelector((state) => state.solution.simplexes);
  const activeIndex = useAppSelector((state) => state.solution.activeIndex);

  const dispatch = useAppDispatch();

  function changeHandler(value: number) {
    dispatch(setActiveIndex(value - 1));
  }

  return (
    <div
      className={clsx(className, classes.wrapper, {
        [classes.disabled]: !simplexes?.length,
      })}
    >
      <span className={clsx(classes.text)}>{activeIndex + 1}</span>
      <Slider
        className={clsx(classes.slider)}
        vertical
        min={1}
        max={simplexes.length}
        value={activeIndex + 1}
        onChange={changeHandler}
        styles={{
          track: { backgroundColor: '#1890ff' },
          rail: { backgroundColor: '#e8e8e8' },
        }}
      />
    </div>
  );
};
