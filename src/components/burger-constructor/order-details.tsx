import DoneImage from '@assets/images/done.png';

import Typography from '@components/shared/typography';

import styles from './burger-constructor.module.css';

export default function OrderDetails() {
  return (
    <div className={styles.order_details_container}>
      <Typography type="digits_large" extraClass={styles.order_number} text="034536" />
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
