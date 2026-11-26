import {
  createSlice,
  nanoid,
  type PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';

import type { TIngredient, TConstructorIngredient } from '@/utils/types';

type TInitialState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
};

const initialState: TInitialState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        return {
          payload: { ...ingredient, key: nanoid() },
        };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.bun = action.payload;
        else state.ingredients = [...state.ingredients, action.payload];
      },
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== action.payload
      );
    },
    sortIngredients: (
      state,
      action: PayloadAction<{
        dragElement: TConstructorIngredient;
        dropElementKey: string;
      }>
    ) => {
      const { dragElement, dropElementKey } = action.payload;
      const list = [...state.ingredients];
      const dragIndex = list.findIndex((i) => i.key === dragElement.key);
      const dropIndex = list.findIndex((i) => i.key === dropElementKey);
      if (dropIndex !== undefined) {
        list.splice(dragIndex, 1);
        list.splice(dropIndex, 0, dragElement);

        state.ingredients = list;
      }
    },
  },
  selectors: {
    ingredients: (state) => state.ingredients,
    bun: (state) => state.bun,
    ingredientCounter: createSelector(
      [(state: TInitialState) => state.bun, (state: TInitialState) => state.ingredients],
      (bun, ingredients): Record<string, number> => {
        const counter: Record<string, number> = {};

        if (bun) counter[bun._id] = 2;
        ingredients.forEach((item) => {
          counter[item._id] = (counter[item._id] || 0) + 1;
        });

        return counter;
      }
    ),
    orderTotal: createSelector(
      [(state: TInitialState) => state.bun, (state: TInitialState) => state.ingredients],
      (bun, ingredients): number => {
        let total = 0;
        if (bun) total += bun.price * 2;
        ingredients.forEach((i) => (total += i.price));

        return total;
      }
    ),
  },
});

export const { addIngredient, removeIngredient, sortIngredients } =
  constructorSlice.actions;
export const { ingredients, bun, ingredientCounter, orderTotal } =
  constructorSlice.selectors;
