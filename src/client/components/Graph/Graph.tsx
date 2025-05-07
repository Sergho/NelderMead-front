import clsx from 'clsx';
import classes from './Graph.module.scss';
import { FC } from 'react';
import Plot from 'react-plotly.js';

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
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          dragmode: 'pan',
          autosize: true,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          xaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
          yaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
        }}
      />
    </div>
  );
};
