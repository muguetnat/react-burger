import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './api.ts';
import { constructorSlice } from './constructor/constructor-slice.ts';
import { orderSlice } from './constructor/order-slice.ts';
import { ingredientsSlice } from './ingredients/slice.ts';

const rootReducer = combineSlices(
  ingredientsApi,
  ingredientsSlice,
  constructorSlice,
  orderSlice
);

export const configureStore = () => {
  return createStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(ingredientsApi.middleware);
    },
    devTools: import.meta.env.DEV,
  });
};
