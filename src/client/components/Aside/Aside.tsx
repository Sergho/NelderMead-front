import classes from './Aside.module.scss';
import clsx from 'clsx';
import { FC } from 'react';
import { Nav } from '../Nav/Nav';
import { Tab } from '../Tab/Tab';
import { useAppSelector } from '../../app/hooks';

interface AsideProps {
  className?: string;
}
export const Aside: FC<AsideProps> = (props: AsideProps) => {
  const { className } = props;

  const opened = useAppSelector((state) => state.asideOpened.opened);

  return (
    <div
      className={clsx(className, classes.wrapper, {
        [classes.opened]: opened,
      })}
    >
      <Nav className={classes.nav} />
      <Tab />
    </div>
  );
};
