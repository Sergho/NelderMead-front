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

  const simplexes = useAppSelector((state) => state.simplex.simplexes);
  const activeIndex = useAppSelector((state) => state.simplex.activeIndex);

  const x = useAppSelector((state) => state.graph.x);
  const y = useAppSelector((state) => state.graph.y);
  const z = useAppSelector((state) => state.graph.z);

  function getData(): Partial<PlotData> {
    if (!x?.length) return {};

    const dimension = z?.length ? 2 : 1;
    if (dimension === 1) return { ...PLOT_OPTIONS_2D.data, x, y };
    else return { ...PLOT_OPTIONS_3D.data, x, y, z };
  }

  function getSimplexData(): Partial<PlotData> {
    if (!simplexes?.length) return {};
    const dimension = simplexes[activeIndex]?.length > 2 ? 2 : 1;

    if (dimension === 1)
      return {
        ...PLOT_OPTIONS_2D.simplexData,
        x: simplexes[activeIndex].map((point) => point[0]),
        y: simplexes[activeIndex].map((point) => point[1]),
      };
    else
      return {
        ...PLOT_OPTIONS_3D.simplexData,
        x: simplexes[activeIndex].map((point) => point[0]),
        y: simplexes[activeIndex].map((point) => point[1]),
        z: simplexes[activeIndex].map((point) => point[2]),
      };
  }

  function getLayout(): Partial<Layout> {
    if (!x?.length) return {};

    const dimension = z?.length ? 2 : 1;
    if (dimension === 1) return PLOT_OPTIONS_2D.layout;
    else return PLOT_OPTIONS_3D.layout;
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <Plot
        className={clsx(classes.plot, {
          [classes.disabled]: !x?.length,
        })}
        data={[getData(), getSimplexData()]}
        layout={getLayout()}
      />
    </div>
  );
};
