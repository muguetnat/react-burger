import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import Typography from '@components/shared/typography';
import { useGetIngredientsQuery } from '@services/api';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { data = [], isLoading: loading } = useGetIngredientsQuery();

  if (loading) return <p>Загрузка...</p>;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Typography type="large" extraClass={styles.title} text="Соберите бургер" />
      <DndProvider backend={HTML5Backend}>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
};

export default App;
