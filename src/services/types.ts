import type { TIngredient } from '@/utils/types';

export type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export type TOrderRequest = {
  ingredients: string[];
};

export type TOrderResponse = {
  name: string;
  order: { number: number };
  success: boolean;
};
