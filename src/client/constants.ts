import { Layout, PlotData } from 'plotly.js';
import { BACKEND_PORT, HOST } from '../constants';

const baseUrl = `${HOST}:${BACKEND_PORT}`;
export const API = {
  create_tree: `${baseUrl}/create-tree`,
  get_graph: `${baseUrl}/get-graph`,
  get_solution: `${baseUrl}/get-solution`,
};

export const PLOT_OPTIONS_2D: {
  data: Partial<PlotData>;
  simplexData: Partial<PlotData>;
  layout: Partial<Layout>;
} = {
  data: {
    type: 'scatter',
    mode: 'lines',
  },
  simplexData: {
    type: 'scatter',
    mode: 'lines+markers',
  },
  layout: {
    dragmode: 'pan',
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
    yaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
  },
};

export const PLOT_OPTIONS_3D: {
  data: Partial<PlotData>;
  simplexData: Partial<PlotData>;
  layout: Partial<Layout>;
} = {
  data: {
    type: 'surface',
    colorbar: {
      xanchor: 'left',
      x: -0.3,
    },
    opacity: 0.6,
  },
  simplexData: {
    type: 'mesh3d',
    mode: 'lines+markers',
  },
  layout: {
    dragmode: 'turntable',
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
    yaxis: { linecolor: 'black', gridcolor: 'rgba(200,200,200,0.5)' },
  },
};

export const PARAMS_OPTIONS: {
  [key: string]: {
    default: number;
    min: number;
    step: number;
    max?: number;
  };
} = {
  reflection: {
    default: 1,
    min: 0.001,
    step: 0.001,
  },
  expansion: {
    default: 2,
    min: 1.001,
    step: 0.001,
  },
  contraction: {
    default: 0.5,
    min: 0.001,
    step: 0.001,
    max: 0.999,
  },
  homothety: {
    default: 0.5,
    min: 0.001,
    step: 0.001,
    max: 0.999,
  },
  dispersion: {
    default: 0.0001,
    min: 0.0001,
    step: 0.0001,
  },
  iterationsLimit: {
    default: 1000,
    min: 1,
    step: 1,
    max: 1000,
  },
};
