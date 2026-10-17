import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { Group } from './Group';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  console.log(ingredients);

  const categories = [
    { id: 'bun', title: 'Булки' },
    { id: 'main', title: 'Начинки' },
    { id: 'sauce', title: 'Соусы' },
  ];

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <ul className={styles.categories}>
        {categories.map((cat) => (
          <Group
            key={cat.id}
            items={ingredients.filter((i) => i.type === cat.id)}
            category={cat.title}
          />
        ))}
      </ul>
    </section>
  );
};
