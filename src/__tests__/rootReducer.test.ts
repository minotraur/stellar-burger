import { configureStore } from '@reduxjs/toolkit';
import ingredientSliceReducer from '../services/slices/ingredientsSlice';
import feedSliceReducer from '../services/slices/feedsSlice';
import userSliceReducer from '../services/slices/userSlice';
import burgerSliceReducer from '../services/slices/burgerSlice';
import orderSliceReducer from '../services/slices/ordersSlice';

const rootReducer = {
  ingredient: ingredientSliceReducer,
  feed: feedSliceReducer,
  user: userSliceReducer,
  burger: burgerSliceReducer,
  order: orderSliceReducer
};

describe('rootReducer', () => {
  it('should return the initial state when an unknown action is passed', () => {
    const store = configureStore({
      reducer: rootReducer,
      devTools: false
    });

    // Получаем начальное состояние хранилища
    const initialState = store.getState();

    // Вызываем rootReducer с undefined состоянием и несуществующим экшеном
    const state = store.dispatch({ type: 'UNKNOWN_ACTION' });

    // Проверяем, что состояние осталось таким же, как и начальное
    expect(store.getState()).toEqual(initialState);
  });
});
