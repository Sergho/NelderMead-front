import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Params } from '../../../common/types/params.interface';

interface InputsState {
  expression: string;
  params: Params;
}

const initialState: InputsState = {
  expression: '',
  params: {
    reflection: 1,
    expansion: 2,
    contraction: 0.5,
    homothety: 0.5,
    dispersion: 0.0001,
    iterationsLimit: 1000,
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
