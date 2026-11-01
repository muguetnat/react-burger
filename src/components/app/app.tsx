import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import Typography from '@components/shared/typography';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';
const API_URL = 'https://new-stellarburgers.education-services.ru/api/ingredients';
type TResponse = {
  success: boolean;
  data: TIngredient[];
};

export const App = (): React.JSX.Element => {
  const [data, setData] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response: TResponse) => {
        if (response.success) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(`error ${JSON.stringify(error)}`);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Typography type="large" extraClass={styles.title} text="Соберите бургер" />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </main>
    </div>
  );
};

export default App;
