import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { useModal } from '@hooks/useModal';

import Modal from '../modals/modal';
import { Group } from './Group';
import { Ingredient } from './Ingredient';
import IngredientDetails from './ingredient-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

const categories = [
  { id: 'bun', title: 'Булки' },
  { id: 'main', title: 'Начинки' },
  { id: 'sauce', title: 'Соусы' },
];

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const { isModalOpen, closeModal, openModal } = useModal();
  const [modalData, setModalData] = useState<TIngredient>();

  function handleShowDetails(ingredient: TIngredient) {
    setModalData(ingredient);
    openModal();
  }

  return (
    <>
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
        <div className={`${styles.categories} custom-scroll`}>
          {categories.map((cat) => (
            <Group
              key={cat.id}
              items={ingredients.filter((i) => i.type === cat.id)}
              category={cat.title}
            >
              {(ingredient) => (
                <Ingredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  showDetails={() => handleShowDetails(ingredient)}
                />
              )}
            </Group>
          ))}
        </div>
      </section>
      {isModalOpen && modalData && (
        <Modal onClose={closeModal} title="Детали ингредиента">
          <IngredientDetails ingredient={modalData} />
        </Modal>
      )}
    </>
  );
};
