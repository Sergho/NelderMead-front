import axios from 'axios';
import { API } from '../constants';
import { GetGraphResponseDto } from '../../common/types/dto/tree/get-graph.dto';

export const getGraph = async (expression: string): Promise<GetGraphResponseDto> => {
  try {
    const result = await axios.get<GetGraphResponseDto>(API.get_graph, {
      params: { expression, from: { coords: [0.1] }, to: { coords: [10] }, interval: 0.1 },
    });
    return result.data;
  } catch (err) {
    return { ...err.response.data, status: err.response.status };
  }
};
