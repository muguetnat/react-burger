import Typography from '@components/shared/typography';

import { Ingredient } from './ingredient';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TGroupProps = {
  category: string;
  items: TIngredient[];
};

export const Group = ({ category, items }: TGroupProps): React.JSX.Element => {
  return (
    <div>
      <Typography type="medium" text={category} />
      <div className={styles.ingredient_list}>
        {items.map((ingredient) => (
          <Ingredient key={ingredient._id} {...ingredient} />
        ))}
      </div>
    </div>
  );
};
