import classes from './Aside.module.scss';
import clsx from 'clsx';
import { FC } from 'react';
import { Nav } from '../Nav/Nav';
import { Tab } from '../Tab/Tab';

interface AsideProps {
  className?: string;
}
export const Aside: FC<AsideProps> = (props: AsideProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Nav className={classes.nav} />
      <Tab />
    </div>
  );
};
