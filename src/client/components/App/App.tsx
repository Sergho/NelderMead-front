import classes from './App.module.scss';
import { FC } from 'react';
import { Graph } from '../Graph/Graph';
import { Aside } from '../Aside/Aside';

export const App: FC = () => {
  return (
    <div>
      <Graph className={classes.graph} />
      <Aside className={classes.aside} />
    </div>
  );
};
