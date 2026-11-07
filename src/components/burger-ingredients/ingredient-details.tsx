import Typography from '@components/shared/typography';

import NutricientsItem from './nutricients-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type IngredientDetailsProps = {
  ingredient: TIngredient;
};

export default function IngredientDetails({ ingredient }: IngredientDetailsProps) {
  const { image, name, calories, proteins, fat, carbohydrates } = ingredient;
  return (
    <div className={styles.details_container}>
      <img src={image} className={styles.image} alt={`изображение ${name}`} />
      <Typography type="default" extraClass={styles.name} text={name} />
      <div className={styles.nutricients}>
        <NutricientsItem type="calories" amount={calories} />
        <NutricientsItem type="proteins" amount={proteins} />
        <NutricientsItem type="fat" amount={fat} />
        <NutricientsItem type="carbohydrates" amount={carbohydrates} />
      </div>
    </div>
  );
}
