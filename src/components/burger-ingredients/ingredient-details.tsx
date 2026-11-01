import Typography from '@components/shared/typography';

import NutricientsItem from './nutricients-item';

import styles from './burger-ingredients.module.css';

type IngredientDetalsProps = {
  image: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
};

export default function IngredientDetails({
  image,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}: IngredientDetalsProps) {
  return (
    <div className={styles.details_container}>
      <img src={image} className={styles.image} />
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
