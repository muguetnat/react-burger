import Typography from '@components/shared/typography';

import styles from './burger-ingredients.module.css';

type NutricientsItemProps = {
  type: string;
  amount: number;
};

const NUTRICIENTS_TITLES: Record<string, string> = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
};

export default function NutricientsItem({ type, amount }: NutricientsItemProps) {
  return (
    <div className={styles.item}>
      <Typography type="inactive_color" text={NUTRICIENTS_TITLES[type]} />
      <Typography type="inactive_color" text={amount.toString()} />
    </div>
  );
}
