import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBun,
  getBurgerIngredients
} from '../../services/slices/burgerSlice';
import { orderBurger } from '../../services/slices/ordersSlice';
import { selectUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const user = useSelector(selectUser); //userDataSelector селектор получения пользователя из store
  const location = useLocation();

  const bun = useSelector<TIngredient | null>(getBun);
  const burgerIngredients = useSelector(getBurgerIngredients);

  const dispatch = useDispatch();

  const constructorItems = {
    bun: {
      _id: bun?._id || '',
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

    if (user.email === '' && user.name === '') {
      return <Navigate replace to='/login' state={{ from: location }} />;
    }

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing: TIngredient) => ing._id),
        constructorItems.bun._id
      ])
    );
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
