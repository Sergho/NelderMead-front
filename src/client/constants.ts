import { Data, Layout } from 'plotly.js';
import { BACKEND_PORT, HOST } from '../constants';

const baseUrl = `${HOST}:${BACKEND_PORT}`;
export const API = {
  create_tree: `${baseUrl}/create-tree`,
  get_graph: `${baseUrl}/get-graph`,
};

export const PLOT_OPTIONS: {
  data: Partial<Data[]>;
  layout: Partial<Layout>;
} = {
  data: [
    {
      type: 'scatter',
      mode: 'lines+markers',
    },
  ],
  layout: {
    dragmode: 'pan',
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
    yaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
  },
};
