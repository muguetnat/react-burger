import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TInitialState = {
  selectedIngredient: TIngredient;
  ingredients: TIngredient[];
};

const initialState: TInitialState = {
  selectedIngredient: {} as TIngredient,
  ingredients: [],
};

export const ingredientsSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    },
  },
  selectors: {
    selectedIngredient: (state) => state.selectedIngredient,
    ingredients: (state) => state.ingredients,
  },
});

export const { selectIngredient } = ingredientsSlice.actions;
export const { selectedIngredient, ingredients } = ingredientsSlice.selectors;
