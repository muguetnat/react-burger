import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientProps } from './types';

import styles from './burger-ingredients.module.css';

export const Ingredient = ({
  image,
  counter,
  name,
  price,
}: TIngredientProps): React.JSX.Element => {
  return (
    <div className={styles.ingredient_container}>
      {counter && <Counter count={counter} size="default" />}
      <img src={image} />
      <div className="text text_type_digits-default ">
        {price} <CurrencyIcon className={styles.price_icon} type="primary" />
      </div>
      <div className="text text_type_main-default">{name}</div>
    </div>
  );
};
