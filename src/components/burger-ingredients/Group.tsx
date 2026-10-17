import { Ingredient } from './Ingredient';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TGroupProps = {
  category: string;
  items: TIngredient[];
};

export const Group = ({ category, items }: TGroupProps): React.JSX.Element => {
  return (
    <li>
      <h1>{category}</h1>
      <div className={styles.ingredient_list}>
        {items.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            name={ingredient.name}
            price={ingredient.price}
            image={ingredient.image}
          />
        ))}
      </div>
    </li>
  );
};
