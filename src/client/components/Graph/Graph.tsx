import clsx from 'clsx';
import classes from './Graph.module.scss';
import { FC } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector } from '../../app/hooks';
import { Layout, PlotData } from 'plotly.js';
import { PLOT_OPTIONS_2D, PLOT_OPTIONS_3D } from '../../constants';
import { Dimension } from '../../types/enums/dimension.enum';
import { Status } from '../../types/enums/status.enum';

interface GraphProps {
  className?: string;
}

export const Graph: FC<GraphProps> = (props: GraphProps) => {
  const { className } = props;

  const simplexes = useAppSelector((state) => state.solution.simplexes);
  const activeIndex = useAppSelector((state) => state.solution.activeIndex);

  const status = useAppSelector((state) => state.graph.status);
  const points = useAppSelector((state) => state.graph.points);
  const dimension = useAppSelector((state) => state.graph.dimension);

  function getData(): Partial<PlotData> {
    switch (dimension) {
      case Dimension.TwoD:
        return { ...PLOT_OPTIONS_2D.data, x: points.x, y: points.y };
      case Dimension.ThreeD:
        return { ...PLOT_OPTIONS_3D.data, x: points.x, y: points.y, z: points.z };
      default:
        return null;
    }
  }

  function getSimplexData(): Partial<PlotData> {
    switch (dimension) {
      case Dimension.TwoD:
        return {
          ...PLOT_OPTIONS_2D.simplexData,
          x: simplexes[activeIndex].coords[0],
          y: simplexes[activeIndex].values,
        };
      case Dimension.ThreeD:
        return {
          ...PLOT_OPTIONS_3D.simplexData,
          x: simplexes[activeIndex].coords[0],
          y: simplexes[activeIndex].coords[1],
          z: simplexes[activeIndex].values,
        };
      default:
        return null;
    }
  }

  function getLayout(): Partial<Layout> {
    switch (dimension) {
      case Dimension.TwoD:
        return PLOT_OPTIONS_2D.layout;
      case Dimension.ThreeD:
        return PLOT_OPTIONS_3D.layout;
      default:
        return null;
    }
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      {status === Status.Loading && <p>Loading...</p>}
      {status === Status.Success && (
        <>
          {dimension === Dimension.Unsupported ? (
            <p>Unable to build graph</p>
          ) : (
            <Plot
              className={clsx(classes.plot)}
              data={[getData(), getSimplexData()]}
              layout={getLayout()}
            />
          )}
        </>
      )}
    </div>
  );
};
