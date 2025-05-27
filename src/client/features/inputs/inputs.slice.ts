import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PARAMS_OPTIONS } from '../../constants';

interface InputsParamsState {
  reflection: number | null;
  expansion: number | null;
  contraction: number | null;
  homothety: number | null;
  dispersion: number | null;
  iterationsLimit: number | null;
}

interface InputsState {
  expression: string;
  params: InputsParamsState;
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
    setParams: (state, action: PayloadAction<Partial<InputsParamsState>>) => {
      for (const param in action.payload) {
        const value = action.payload[param];
        console.log(value);
        if (!(param in state.params)) return;

        if (param === null) {
          state.params[param] = null;
          return;
        }
        if (value < PARAMS_OPTIONS[param]?.min) {
          state.params[param] = PARAMS_OPTIONS[param]?.min;
          return;
        }
        if (value > PARAMS_OPTIONS[param]?.max) {
          state.params[param] = PARAMS_OPTIONS[param]?.max;
          return;
        }
        if (param in state.params) state.params[param] = value;
      }
    },
  },
});

export const { setExpression, setParams } = InputsSlice.actions;

export default InputsSlice.reducer;
