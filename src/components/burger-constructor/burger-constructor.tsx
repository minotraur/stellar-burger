import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  cleanAll,
  getBun,
  getBurgerIngredients
} from '../../services/slices/burgerSlice';
import {
  getNewOrder,
  getOrderRequest,
  orderBurger
} from '../../services/slices/ordersSlice';
import { selectUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const user = useSelector(selectUser);

  const bun = useSelector(getBun);
  const burgerIngredients = useSelector(getBurgerIngredients);

  const order = useSelector(getNewOrder);
  const orderRequest = useSelector(getOrderRequest);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const orderModalData = order;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    }

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing: TIngredient) => ing._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(cleanAll());
  };

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
