import axios from 'axios';
import { API } from '../constants';

export const getGraph = async (expression: string) => {
  try {
    const result = await axios.get(API.get_graph, {
      params: { expression, from: { coords: [-10] }, to: { coords: [10] }, interval: 1 },
    });
    return result.data;
  } catch (err) {
    return { ...err.response.data, status: err.response.status };
  }
};
