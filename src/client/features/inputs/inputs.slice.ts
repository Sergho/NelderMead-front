import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PARAMS_OPTIONS } from '../../constants';
import { Params } from '../../../common/types/params';

interface InputsState {
  expression: string;
  params: Params;
}

const initialState: InputsState = {
  expression: '',
  params: {
    reflection: PARAMS_OPTIONS?.reflection?.default || null,
    expansion: PARAMS_OPTIONS?.expansion?.default || null,
    contraction: PARAMS_OPTIONS?.contraction?.default || null,
    homothety: PARAMS_OPTIONS?.homothety?.default || null,
    dispersion: PARAMS_OPTIONS?.dispersion?.default || null,
    iterationsLimit: PARAMS_OPTIONS?.iterationsLimit?.default || null,
  },
};

export const InputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setExpression: (state, action: PayloadAction<string>) => {
      state.expression = action.payload;
    },
    setParams: (state, action: PayloadAction<Partial<Params>>) => {
      Object.assign(state.params, action.payload);
    },
  },
});

export const { setExpression, setParams } = InputsSlice.actions;

export default InputsSlice.reducer;
