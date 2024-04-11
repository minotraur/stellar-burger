import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },
    cleanAll: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getBurgerIngredients: (state) => state.ingredients
  }
});

export const { addBun, addIngredient, removeIngredient, cleanAll } =
  burgerSlice.actions;
export const { getBun, getBurgerIngredients } = burgerSlice.selectors;

export default burgerSlice.reducer;
