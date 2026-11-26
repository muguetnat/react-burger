import DoneImage from '@assets/images/done.png';
import { useSelector } from 'react-redux';

import Typography from '@components/shared/typography';
import { orderId } from '@services/constructor/order-slice';

import styles from './burger-constructor.module.css';

export default function OrderDetails() {
  const orderID = useSelector(orderId);

  return (
    <div className={styles.order_details_container}>
      <Typography
        type="digits_large"
        extraClass={styles.order_number}
        text={orderID?.toString() ?? ''}
      />
      <Typography type="medium" extraClass={styles.mb60} text="идентификатор заказа" />
      <img className={styles.mb60} src={DoneImage} alt="done_image" />
      <Typography
        type="default"
        extraClass={styles.mb8}
        text="Ваш заказ начали готовить"
      />
      <Typography
        type="inactive_color"
        extraClass={styles.mb80}
        text="Дождитесь готовности орбитальной станции"
      />
    </div>
  );
}
