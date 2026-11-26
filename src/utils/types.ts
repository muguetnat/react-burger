export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
  counter?: number;
};

export type IngredientDetailsProps = {
  ingredient: TIngredient;
};

export type TConstructorIngredient = TIngredient & {
  key: string;
};
