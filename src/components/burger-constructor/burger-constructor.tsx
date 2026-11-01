import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import Modal from '@components/modals/modal';
import Typography from '@components/shared/typography';

import OrderDetails from './order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  function createOrder(): void {
    setShowModal(true);
  }

  function handleClose(): void {
    setShowModal(!showModal);
  }

  return (
    <section className={styles.burger_constructor}>
      <ul className={`${styles.list} custom-scroll`}>
        {ingredients.map((i, index) => (
          <li key={i._id}>
            <DragIcon type="primary" className="margin-right:20px" />
            <ConstructorElement
              type={
                index == 0
                  ? 'top'
                  : index === ingredients.length - 1
                    ? 'bottom'
                    : undefined
              }
              price={i.price}
              text={i.name}
              thumbnail={i.image}
            />
          </li>
        ))}
      </ul>
      <div className={styles.make_order_container}>
        <Typography type="digits_medium" text="610" />
        <CurrencyIcon className={styles.icon} type="primary" />
        <Button
          onClick={createOrder}
          size="large"
          type="primary"
          htmlType="button"
          extraClass={styles.order_button}
        >
          Оформить заказ
        </Button>
      </div>
      {showModal && (
        <Modal onClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
