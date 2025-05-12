import axios from 'axios';
import { API } from '../constants';
import { GetSolutionResponseDto } from '../../common/types/dto/get-solution.dto';

export const getSolution = async (expression: string): Promise<GetSolutionResponseDto> => {
  try {
    const result = await axios.get<GetSolutionResponseDto>(API.get_solution, {
      params: { expression },
    });
    return result.data;
  } catch (err) {
    return { ...err.response.data, status: err.response.status };
  }
};
