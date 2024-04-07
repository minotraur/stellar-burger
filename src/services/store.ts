import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientSliceReducer from './slices/ingredientsSlice';
import feedSliceReducer from './slices/feedsSlice';
import userSliceReducer from './slices/userSlice';

const rootReducer = {
  ingredient: ingredientSliceReducer,
  feed: feedSliceReducer,
  user: userSliceReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
