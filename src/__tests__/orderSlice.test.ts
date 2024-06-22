import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import reducer, {
  clearOrderModalData,
  fetchOrderByNumber,
  fetchUserOrders,
  orderBurger,
  initialState
} from '../services/slices/ordersSlice';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(),
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

describe('orderSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const mockUserOrders: TOrder[] = [
      {
        _id: '1',
        status: 'status',
        name: 'test',
        createdAt: '',
        updatedAt: '',
        number: 0,
        ingredients: []
      }
    ];
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockUserOrders
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      userOrders: mockUserOrders
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchUserOrders.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: fetchUserOrders.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle orderBurger.pending', () => {
    const action = { type: orderBurger.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true,
      orderRequest: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle orderBurger.fulfilled', () => {
    const mockOrder = { id: 1, name: 'New Order' };
    const action = {
      type: orderBurger.fulfilled.type,
      payload: { order: mockOrder }
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      order: mockOrder,
      orderRequest: false,
      orderModalData: mockOrder
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle orderBurger.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: orderBurger.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error,
      orderRequest: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true,
      orderRequest: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const mockOrderById: TOrder[] = [
      {
        _id: '1',
        status: 'status',
        name: 'test',
        createdAt: '',
        updatedAt: '',
        number: 0,
        ingredients: []
      }
    ];
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: { orders: mockOrderById, success: true }
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      orderById: mockOrderById,
      orderRequest: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderByNumber.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: fetchOrderByNumber.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error,
      orderRequest: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
