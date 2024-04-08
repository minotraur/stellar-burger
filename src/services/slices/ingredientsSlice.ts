import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: true
};

export const fetchIngredients = createAsyncThunk('getIngredients', async () => {
  const ingredients: any = await getIngredientsApi();
  return ingredients;
});

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (sliceState) => sliceState.ingredients,
    getIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { getIngredients, getIsLoading } = ingredientSlice.selectors;

export default ingredientSlice.reducer;