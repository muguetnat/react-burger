import { ingredientCounter } from '@/services/constructor/constructor-slice';
import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import Typography from '@components/shared/typography';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type IngredientProps = {
  ingredient: TIngredient;
  counter?: number;
  showDetails: () => void;
};

export const Ingredient = ({
  ingredient,
  showDetails,
}: IngredientProps): React.JSX.Element => {
  const { name, price, image } = ingredient;
  const counter = useSelector(ingredientCounter);

  const ref = useRef<HTMLDivElement>(null);
  const [, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: { ingredient },
  }));
  dragRef(ref);

  return (
    <div className={styles.ingredient_container} onClick={showDetails} ref={ref}>
      {counter[ingredient._id] > 0 && (
        <Counter count={counter[ingredient._id]} size="default" />
      )}
      <img src={image} alt={`изображение ${name}`} />
      <div className={styles.price_wrapper}>
        <Typography
          type="digits_default"
          extraClass={styles.price}
          text={price.toString()}
        />
        <CurrencyIcon className={styles.price_icon} type="primary" />
      </div>
      <Typography type="default" text={name} />
    </div>
  );
};
