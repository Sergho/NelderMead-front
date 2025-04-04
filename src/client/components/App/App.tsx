import classes from './App.module.scss';
import { FC } from 'react';
import { Graph } from '../Graph/Graph';

export const App: FC = () => {
  return (
    <div>
      <Graph className={classes.graph} />
    </div>
  );
};
