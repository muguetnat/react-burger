import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import Typography from '@components/shared/typography';

import Modal from '../modals/modal';
import IngredientDetails from './ingredient-details';

import type { TIngredientProps } from './types';

import styles from './burger-ingredients.module.css';

export const Ingredient = ({
  image,
  counter,
  name,
  price,
  calories,
  proteins,
  fat,
  carbohydrates,
}: TIngredientProps): React.JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  function handleClose() {
    setShowModal(!showModal);
  }

  function openDetails() {
    setShowModal(true);
  }

  const nutricients = { calories, proteins, fat, carbohydrates };
  return (
    <>
      <div className={styles.ingredient_container} onClick={openDetails}>
        {counter && <Counter count={counter} size="default" />}
        <img src={image} />
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
      {showModal && (
        <Modal onClose={handleClose} title="Детали ингредиента">
          <IngredientDetails image={image} name={name} {...nutricients} />
        </Modal>
      )}
    </>
  );
};
