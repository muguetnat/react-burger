import { selectedIngredient } from '@/services/ingredients/slice';
import { useSelector } from 'react-redux';

import Typography from '@components/shared/typography';

import NutricientsItem from './nutricients-item';

import styles from './burger-ingredients.module.css';

export default function IngredientDetails() {
  const ingredient = useSelector(selectedIngredient);
  const { image, name, calories, proteins, fat, carbohydrates } = ingredient || {};
  if (!ingredient) return null;

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
