import clsx from 'clsx';
import classes from './Graph.module.scss';
import { FC } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector } from '../../app/hooks';
import { Layout, PlotData } from 'plotly.js';
import { PLOT_OPTIONS_2D, PLOT_OPTIONS_3D } from '../../constants';

interface GraphProps {
  className?: string;
}

export const Graph: FC<GraphProps> = (props: GraphProps) => {
  const { className } = props;

  const x = useAppSelector((state) => state.graph.x);
  const y = useAppSelector((state) => state.graph.y);
  const z = useAppSelector((state) => state.graph.z);

  function getData(): Partial<PlotData> {
    if (!x?.length) return {};

    const dimension = z?.length ? 2 : 1;
    if (dimension === 1) return { ...PLOT_OPTIONS_2D.data, x, y };
    else return { ...PLOT_OPTIONS_3D.data, x, y, z };
  }

  function getLayout(): Partial<Layout> {
    if (!x?.length) return {};

    const dimension = z?.length ? 2 : 1;
    if (dimension === 1) return PLOT_OPTIONS_2D.layout;
    else return PLOT_OPTIONS_3D.layout;
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <Plot className={clsx(classes.plot)} data={[getData()]} layout={getLayout()} />
    </div>
  );
};
