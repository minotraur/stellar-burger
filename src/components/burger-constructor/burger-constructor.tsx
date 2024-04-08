import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  getBun,
  getBurgerIngredients
} from '../../services/slices/burgerSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const bun = useSelector<TIngredient | null>(getBun);
  const burgerIngredients = useSelector<TIngredient[]>(getBurgerIngredients);

  const constructorItems = {
    bun: {
      name: bun?.name || '',
      image: bun?.image || null,
      image_large: bun?.image_large || null,
      image_mobile: bun?.image_mobile || null,
      price: bun?.price || null
    },
    ingredients: burgerIngredients
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price! * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (totalPrice: number, ingredient: TIngredient) =>
        totalPrice + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
