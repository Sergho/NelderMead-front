import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetGraphResponseDto } from '../../../common/types/dto/get-graph.dto';
import { ErrorDto } from '../../../common/types/dto/error.dto';
import axios from 'axios';
import { API } from '../../constants';

export const fetchGraph = createAsyncThunk<
  GetGraphResponseDto,
  {
    expression: string;
    limits: {
      from: number;
      to: number;
    };
  },
  {
    rejectValue: ErrorDto;
  }
>('graph/get', async ({ expression, limits }, { rejectWithValue }) => {
  try {
    const result = await axios.get<GetGraphResponseDto>(API.get_graph, {
      params: { expression, from: limits.from - 0.5, to: limits.to + 0.5, interval: 0.1 },
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
