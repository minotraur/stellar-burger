import { TIngredient, TConstructorIngredient } from '@utils-types';
import {
  addIngredient,
  initialState,
  removeIngredient
} from '../services/slices/burgerSlice';
import burgerSliceReducer from '../services/slices/burgerSlice';

// Mocking uuidv4 to ensure consistent id generation for testing
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

describe('burgerReducer', () => {
  const ingredient: TIngredient = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    price: 50,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  };

  const constructorIngredient: TConstructorIngredient = {
    ...ingredient,
    id: 'test-uuid'
  };

  it('should handle addIngredient', () => {
    const action = addIngredient(ingredient);
    const newState = burgerSliceReducer(initialState, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual(constructorIngredient);
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [constructorIngredient]
    };

    const action = removeIngredient(constructorIngredient);
    const newState = burgerSliceReducer(stateWithIngredient, action);

    expect(newState.ingredients).toHaveLength(0);
  });
});
