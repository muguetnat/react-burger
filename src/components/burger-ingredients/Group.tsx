import Typography from '@components/shared/typography';

import type { TIngredient } from '@utils/types';
import type { ReactNode, RefObject } from 'react';

import styles from './burger-ingredients.module.css';

type TGroupProps = {
  category: string;
  items: TIngredient[];
  children: (ingredient: TIngredient) => ReactNode;
  ref: RefObject<HTMLDivElement | null>;
};

export const Group = ({
  category,
  items,
  children,
  ref,
}: TGroupProps): React.JSX.Element => {
  return (
    <div ref={ref}>
      <Typography type="medium" text={category} />
      <div className={styles.ingredient_list}>
        {items.map((ingredient) => children(ingredient))}
      </div>
    </div>
  );
};
