import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AsideState {
  opened: boolean;
}

const initialState: AsideState = {
  opened: true,
};

export const AsideSlice = createSlice({
  name: 'aside',
  initialState,
  reducers: {
    setAside: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
  },
});

export const { setAside } = AsideSlice.actions;

export default AsideSlice.reducer;
