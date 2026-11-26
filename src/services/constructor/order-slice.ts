import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TInitialState = {
  orderId: number | null;
};

const initialState: TInitialState = {
  orderId: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderId: (state, action: PayloadAction<number>) => {
      state.orderId = action.payload;
    },
  },
  selectors: {
    orderId: (state) => state.orderId,
  },
});

export const { setOrderId } = orderSlice.actions;
export const { orderId } = orderSlice.selectors;
