import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import reducer, {
  fetchIngredients,
  initialState
} from '../services/slices/ingredientsSlice';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const expectedState = {
      ingredients: [],
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      { id: 1, name: 'Ingredient 1' },
      { id: 2, name: 'Ingredient 2' }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const expectedState = {
      ingredients: mockIngredients,
      isLoading: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const expectedState = {
      ingredients: [],
      isLoading: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
