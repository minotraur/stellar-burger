import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface INewOrder {
  order: TOrder;
  name: string;
}

type TOrdersState = {
  isLoading: boolean;
  orders: TOrder[];
  error: SerializedError | null;
  newOrder: INewOrder | null;
  order: TOrder[];
};

const initialState: TOrdersState = {
  isLoading: true,
  error: null,
  orders: [],
  newOrder: null,
  order: []
};

export const fetchOrders = createAsyncThunk(
  'order/getOrders',
  async () => (await getOrdersApi()) as TOrder[]
);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => {
    return await orderBurgerApi(data);
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/orderByNumber',
  async (number: number) => {
    return await getOrderByNumberApi(number);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getIsLoading: (sliceState) => sliceState.isLoading,
    getOrders: (sliceState) => sliceState.orders,
    getOrder: (sliceState) => sliceState.order,
    getNewOrder: (sliceState) => sliceState.order
  },
  extraReducers: (builder) => {
    // Получение личных заказов
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });

    // Заказ бургера
    builder.addCase(orderBurger.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newOrder = action.payload;
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
      state.order = action.payload.orders;
    });
  }
});

export const { getOrders, getIsLoading, getNewOrder, getOrder } =
  orderSlice.selectors;

export default orderSlice.reducer;
