import clsx from 'clsx';
import classes from './Toggle.module.scss';
import { FC, PropsWithChildren } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { setAsideActiveIndex } from '../../../../features/aside/aside.slice';

interface ToggleProps extends PropsWithChildren {
  index: number;
  className?: string;
}

export const Toggle: FC<ToggleProps> = (props: ToggleProps) => {
  const { className, index, children } = props;

  const activeIndex = useAppSelector((state) => state.aside.activeIndex);
  const dispatch = useAppDispatch();

  function handleClick() {
    if (index === activeIndex) dispatch(setAsideActiveIndex(null));
    else dispatch(setAsideActiveIndex(index));
  }

  return (
    <div
      className={clsx(className, classes.wrapper, {
        [classes.opened]: activeIndex === index,
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
