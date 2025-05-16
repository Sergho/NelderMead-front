import axios from 'axios';
import { API } from '../constants';
import { GetGraphResponseDto } from '../../common/types/dto/get-graph.dto';

export const getGraph = async (
  expression: string,
  from: number,
  to: number,
): Promise<GetGraphResponseDto> => {
  try {
    const result = await axios.get<GetGraphResponseDto>(API.get_graph, {
      params: { expression, from, to, interval: 0.05 },
    });
    return result.data;
  } catch (err) {
    return { ...err.response.data, status: err.response.status };
  }
};
