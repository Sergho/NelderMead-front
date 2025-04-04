import classes from './Aside.module.scss';
import clsx from 'clsx';
import { FC } from 'react';

export interface AsideProps {
  className: string;
}
export const Aside: FC<AsideProps> = (props: AsideProps) => {
  const { className } = props;
  return <div className={clsx(className, classes.wrapper)}></div>;
};
