import clsx from 'clsx';
import classes from './Graph.module.scss';
import { FC } from 'react';
import Plot from 'react-plotly.js';
import { PLOT_OPTIONS } from '../../constants';

interface GraphProps {
  className?: string;
}

export const Graph: FC<GraphProps> = (props: GraphProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Plot
        className={clsx(classes.plot)}
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            ...PLOT_OPTIONS.data,
          },
        ]}
        layout={PLOT_OPTIONS.layout}
      />
    </div>
  );
};
