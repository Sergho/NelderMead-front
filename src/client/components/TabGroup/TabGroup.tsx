import { Children, FC, PropsWithChildren } from 'react';
import classes from './TabGroup.module.scss';
import clsx from 'clsx';
import { useAppSelector } from '../../app/hooks';

export interface TabGroupProps extends PropsWithChildren {
  className?: string;
}

export const TabGroup: FC<TabGroupProps> = (props: TabGroupProps) => {
  const { className, children } = props;

  const activeIndex = useAppSelector((state) => state.aside.activeIndex);

  return (
    <div className={clsx(className, classes.wrapper)}>
      {Children.toArray(children)[activeIndex]}
    </div>
  );
};
