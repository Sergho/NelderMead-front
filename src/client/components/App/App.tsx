import classes from './App.module.scss';
import { FC } from 'react';
import { Graph } from '../Graph/Graph';
import { Aside } from '../Aside/Aside';
import { Range } from '../Range/Range';
import clsx from 'clsx';

export const App: FC = () => {
  return (
    <div>
      <Graph className={clsx(classes.graph)} />
      <Range className={clsx(classes.range)} />
      <Aside className={clsx(classes.aside)} />
    </div>
  );
};
