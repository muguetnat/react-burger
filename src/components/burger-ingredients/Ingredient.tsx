import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import Typography from '@components/shared/typography';

import type { TIngredientProps } from './types';

import styles from './burger-ingredients.module.css';

type IngredientProps = {
  ingredient: TIngredientProps;
  counter?: number;
  showDetails: () => void;
};

export const Ingredient = ({
  ingredient,
  counter,
  showDetails,
}: IngredientProps): React.JSX.Element => {
  const { name, price, image } = ingredient;

  return (
    <div className={styles.ingredient_container} onClick={showDetails}>
      {counter && <Counter count={counter} size="default" />}
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
