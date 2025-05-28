import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetSolutionResponseDto } from '../../../common/types/dto/get-solution.dto';
import axios from 'axios';
import { API } from '../../constants';
import { ErrorDto } from '../../../common/types/dto/error.dto';
import { Params } from '../../../common/types/params';
import { SimplexParams } from '../../../common/types/simplex-params';

export const fetchSolution = createAsyncThunk<
  GetSolutionResponseDto,
  {
    expression: string;
    params: Params;
    startSimplex: SimplexParams;
  },
  {
    rejectValue: ErrorDto;
  }
>('solution/get', async ({ expression, params, startSimplex }, { rejectWithValue }) => {
  try {
    const result = await axios.get<GetSolutionResponseDto>(API.get_solution, {
      params: { expression, params, startSimplex },
    });
    return result.data;
  } catch (err) {
    if (axios.isAxiosError<ErrorDto>(err)) {
      return rejectWithValue(err.response.data);
    } else {
      throw err;
    }
  }
});
