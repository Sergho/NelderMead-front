import clsx from 'clsx';
import classes from './Toggle.module.scss';
import { FC, PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAsideOpened } from '../../features/aside/aside.slice';

interface ToggleProps extends PropsWithChildren {
  className?: string;
}

export const Toggle: FC<ToggleProps> = (props: ToggleProps) => {
  const { className, children } = props;

  const opened = useAppSelector((state) => state.asideOpened.opened);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setAsideOpened(!opened));
  }

  return (
    <div className={clsx(className, classes.wrapper)} onClick={handleClick}>
      {children}
    </div>
  );
};
