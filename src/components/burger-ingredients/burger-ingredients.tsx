import { selectIngredient } from '@/services/ingredients/slice';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useLayoutEffect, useRef, type RefObject } from 'react';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [tabActive, setTabActive] = useState(categories[0].id);
  const mainRef = useRef<HTMLDivElement>(null);
  const categoriesRef: Record<string, RefObject<HTMLDivElement | null>> = {
    bun: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
    sauce: useRef<HTMLDivElement>(null),
  };

  useLayoutEffect(() => {
    const mainRect = mainRef.current;
    if (!mainRect) return;

    const handleIngredientsScroll = () => {
      const mainTop = mainRect.getBoundingClientRect().top;

      let closestTab = tabActive;
      let minDiff = Infinity;

      Object.entries(categoriesRef).forEach(([key, ref]) => {
        if (ref.current) {
          const categoryTop = ref.current.getBoundingClientRect().top;
          const diff = Math.abs(categoryTop - mainTop);

          if (diff < minDiff) {
            minDiff = diff;
            closestTab = key;
          }
        }
      });

      if (closestTab !== tabActive) {
        setTabActive(closestTab);
      }
    };

    mainRect.addEventListener('scroll', handleIngredientsScroll);
    return () => {
      mainRect.removeEventListener('scroll', handleIngredientsScroll);
    };
  }, [tabActive]);

  function handleShowDetails(ingredient: TIngredient) {
    dispatch(selectIngredient(ingredient));
    openModal();
  }

  function handleCloseIngredientDetails() {
    dispatch(selectIngredient({}));
    closeModal();
  }

  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab
              value="bun"
              active={tabActive === 'bun'}
              onClick={() => {
                /* TODO */
              }}
            >
              Булки
            </Tab>
            <Tab
              value="main"
              active={tabActive === 'main'}
              onClick={() => {
                /* TODO */
              }}
            >
              Начинки
            </Tab>
            <Tab
              value="sauce"
              active={tabActive === 'sauce'}
              onClick={() => {
                /* TODO */
              }}
            >
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={`${styles.categories} custom-scroll`} ref={mainRef}>
          {categories.map((cat) => (
            <Group
              ref={categoriesRef[cat.id]}
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
      {isModalOpen && (
        <Modal onClose={handleCloseIngredientDetails} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
