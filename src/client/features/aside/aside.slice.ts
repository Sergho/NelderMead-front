import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AsideOpenedState {
  opened: boolean;
}

const initialState: AsideOpenedState = {
  opened: true,
};

export const AsideOpenedSlice = createSlice({
  name: 'asideOpened',
  initialState,
  reducers: {
    setAsideOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
  },
});

export const { setAsideOpened } = AsideOpenedSlice.actions;

export default AsideOpenedSlice.reducer;
