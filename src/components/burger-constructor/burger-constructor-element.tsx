import {
  sortIngredients,
  removeIngredient,
} from '@/services/constructor/constructor-slice';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import type { TConstructorIngredient } from '@/utils/types';

type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
};

export function BurgerConstructorElement({ ingredient }: BurgerConstructorElementProps) {
  const dispatch = useDispatch();
  const { price, name, image } = ingredient;
  const ref = useRef<HTMLLIElement>(null);

  const [, drag] = useDrag(() => ({
    type: 'sort',
    item: { ...ingredient },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'sort',
    hover: (item: TConstructorIngredient) => {
      if (!ref.current) return;
      const hoverIndex = ingredient.key;
      const dragIndex = item.key;
      if (hoverIndex == dragIndex) return;
      dispatch(
        sortIngredients({ dragElement: { ...item }, dropElementKey: hoverIndex })
      );
    },
  }));

  drag(drop(ref));

  function handleRemoveIngredient() {
    dispatch(removeIngredient(ingredient.key));
  }

  return (
    <li ref={ref}>
      <DragIcon type="primary" className="margin-right:20px" />
      <ConstructorElement
        price={price}
        text={name}
        thumbnail={image}
        handleClose={handleRemoveIngredient}
      />
    </li>
  );
}
