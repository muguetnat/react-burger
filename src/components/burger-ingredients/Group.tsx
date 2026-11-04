import Typography from '@components/shared/typography';

import type { TIngredient } from '@utils/types';
import type { ReactNode } from 'react';

import styles from './burger-ingredients.module.css';

type TGroupProps = {
  category: string;
  items: TIngredient[];
  children: (ingredient: TIngredient) => ReactNode;
};

export const Group = ({ category, items, children }: TGroupProps): React.JSX.Element => {
  return (
    <div>
      <Typography type="medium" text={category} />
      <div className={styles.ingredient_list}>
        {items.map((ingredient) => children(ingredient))}
      </div>
    </div>
  );
};
