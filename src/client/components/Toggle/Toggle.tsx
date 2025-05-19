import clsx from 'clsx';
import classes from './Toggle.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAsideOpened } from '../../features/aside/aside.slice';

interface ToggleProps {
  className?: string;
}

export const Toggle: FC<ToggleProps> = (props: ToggleProps) => {
  const { className } = props;

  const opened = useAppSelector((state) => state.asideOpened.opened);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setAsideOpened(!opened));
  }

  return (
    <div
      className={clsx(className, classes.wrapper, {
        [classes.opened]: opened,
      })}
      onClick={handleClick}
    >
      <span className={classes.stick}></span>
      <span className={classes.stick}></span>
    </div>
  );
};
