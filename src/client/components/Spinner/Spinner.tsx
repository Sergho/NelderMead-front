import { FC } from 'react';
import classes from './Spinner.module.scss';
import clsx from 'clsx';

export const Spinner: FC = () => {
  return <div className={clsx(classes.spinner)}></div>;
};
