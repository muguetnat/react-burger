import { useOrdersMutation } from '@/services/api';
import {
  ingredients,
  bun,
  addIngredient,
  orderTotal,
} from '@/services/constructor/constructor-slice';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '@components/modals/modal';
import Typography from '@components/shared/typography';
import { useModal } from '@hooks/useModal';
import { setOrderId } from '@services/constructor/order-slice';

import { BurgerConstructorElement } from './burger-constructor-element';
import { EmptyConstructorElement } from './empty-constructor-element';
import OrderDetails from './order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const { isModalOpen, closeModal, openModal } = useModal();
  const dispatch = useDispatch();
  const [sendOrder] = useOrdersMutation();
  const [createOrderError, setCreateOrderError] = useState(false);
  const ingredientsList = useSelector(ingredients);
  const burgerBun = useSelector(bun);
  const ref = useRef<HTMLDivElement>(null);
  const total = useSelector(orderTotal);

  const [, dropRef] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: { ingredient: TIngredient }) => {
      dispatch(addIngredient(item.ingredient));
    },
  }));
  dropRef(ref);

  async function createOrder() {
    if (!burgerBun || ingredientsList?.length === 0) return;
    setCreateOrderError(false);
    try {
      const response = await sendOrder({
        ingredients: [
          burgerBun._id,
          ...ingredientsList.map((ingredient) => ingredient._id),
          burgerBun._id,
        ],
      }).unwrap();
      dispatch(setOrderId(response.order.number));
    } catch {
      setCreateOrderError(() => true);
    } finally {
      openModal();
    }
  }

  return (
    <section className={styles.burger_constructor} ref={ref}>
      {burgerBun ? (
        <ConstructorElement
          type="top"
          price={burgerBun.price}
          text={`${burgerBun.name} (верх)`}
          thumbnail={burgerBun.image}
          isLocked
          extraClass={styles.bun}
        />
      ) : (
        <EmptyConstructorElement type="top" />
      )}
      <ul className={`${styles.list} custom-scroll`}>
        {ingredientsList.map((i) => (
          <BurgerConstructorElement key={i.key} ingredient={i} />
        ))}
        {!ingredientsList.length && <EmptyConstructorElement type="normal" />}
      </ul>
      {burgerBun ? (
        <ConstructorElement
          type="bottom"
          price={burgerBun.price}
          text={`${burgerBun.name} (низ)`}
          thumbnail={burgerBun.image}
          isLocked
          extraClass={styles.bun}
        />
      ) : (
        <EmptyConstructorElement type="bottom" />
      )}
      <div className={styles.make_order_container}>
        <Typography type="digits_medium" text={total.toString()} />
        <CurrencyIcon className={styles.icon} type="primary" />
        <Button
          onClick={() => void createOrder()}
          size="large"
          type="primary"
          htmlType="button"
          extraClass={styles.order_button}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && !createOrderError && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      {isModalOpen && createOrderError && (
        <Modal onClose={closeModal} title={'Произошла ошибка. Заказ не создан.'} />
      )}
    </section>
  );
};
