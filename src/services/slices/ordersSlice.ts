import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  isLoading: boolean;
  error: SerializedError | null;
  userOrders: TOrder[];
  orderById: TOrder[];
};

const initialState: TOrdersState = {
  isLoading: true,
  error: null,
  userOrders: [],
  orderById: []
};

export const fetchUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async () => (await getOrdersApi()) as TOrder[]
);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getIsLoading: (sliceState) => sliceState.isLoading,
    getUserOrders: (sliceState) => sliceState.userOrders,
    getOrderById: (sliceState) => sliceState.orderById
  },
  extraReducers: (builder) => {
    // Получение личных заказов
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userOrders = action.payload;
    });

    // Заказ бургера
    builder.addCase(orderBurger.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(orderBurger.fulfilled, (state) => {
      state.isLoading = false;
    });

    // Получение заказа по id
    builder.addCase(fetchOrderByNumber.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrderByNumber.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderById = action.payload.orders;
    });
  }
});

export const { getIsLoading, getUserOrders, getOrderById } =
  orderSlice.selectors;

export default orderSlice.reducer;
