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
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getBurgerIngredients: (state) => state.ingredients
  }
});

export const { addBun, addIngredient } = burgerSlice.actions;
export const { getBun, getBurgerIngredients } = burgerSlice.selectors;

export default burgerSlice.reducer;
