import { clsx } from 'clsx';

import Typography from '../shared/typography';

import styles from './burger-constructor.module.css';

type EmptyConstructorElementProps = {
  type: 'top' | 'bottom' | 'normal';
};

export function EmptyConstructorElement({ type }: EmptyConstructorElementProps) {
  return (
    <div
      className={clsx(styles.constructor_element, {
        [styles.constructor_element_pos_top]: type === 'top',
        [styles.burger_constructor_element_normal]: type == 'normal',
        [styles.constructor_element_pos_bottom]: type === 'bottom',
      })}
    >
      <Typography
        type="default"
        extraClass={styles.constructor_element__row}
        text={type === 'normal' ? 'Выберите начинку' : 'Выберите булки'}
      />
    </div>
  );
}
