import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';

import Modal from '@components/modals/modal';
import Typography from '@components/shared/typography';
import { useModal } from '@hooks/useModal';

import OrderDetails from './order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const { isModalOpen, closeModal, openModal } = useModal();

  function createOrder(): void {
    openModal();
  }

  const ingredientsOnly = ingredients.filter((i) => i.type !== 'bun');
  const bun = ingredients[0];

  return (
    <section className={styles.burger_constructor}>
      <ConstructorElement
        type="top"
        price={bun.price}
        text={`${bun.name} (верх)`}
        thumbnail={bun.image}
        isLocked
        extraClass={styles.bun}
      />
      <ul className={`${styles.list} custom-scroll`}>
        {ingredientsOnly.map((i) => (
          <li key={i._id}>
            <DragIcon type="primary" className="margin-right:20px" />
            <ConstructorElement price={i.price} text={i.name} thumbnail={i.image} />
          </li>
        ))}
      </ul>
      <ConstructorElement
        type="bottom"
        price={bun.price}
        text={`${bun.name} (низ)`}
        thumbnail={bun.image}
        isLocked
        extraClass={styles.bun}
      />
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
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
