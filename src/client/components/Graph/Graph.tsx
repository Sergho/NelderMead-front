import clsx from 'clsx';
import classes from './Graph.module.scss';
import { FC } from 'react';
import Plot from 'react-plotly.js';
import { PLOT_OPTIONS } from '../../constants';
import { useAppSelector } from '../../app/hooks';

interface GraphProps {
  className?: string;
}

export const Graph: FC<GraphProps> = (props: GraphProps) => {
  const { className } = props;

  const points = useAppSelector((state) => state.graphPoints.points);

  return (
    <div className={clsx(className, classes.wrapper)}>
      <Plot
        className={clsx(classes.plot)}
        data={[
          {
            x: points.map((point) => point.coords[0]),
            y: points.map((point) => point.value),
            ...PLOT_OPTIONS.data,
          },
        ]}
        layout={PLOT_OPTIONS.layout}
      />
    </div>
  );
};
