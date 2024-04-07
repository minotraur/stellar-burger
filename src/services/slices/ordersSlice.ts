// import { getOrdersApi } from '@api';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { TOrder } from '@utils-types';

// type TOrdersState = {
//   orders: TOrder[];
//   isLoading: boolean;
// };

// const initialState: TOrdersState = {
//   orders: [],
//   isLoading: true
// };

// export const fetchOrders = createAsyncThunk('getOrders', async () => {
//   const ingredients: any = await getOrdersApi();
//   return ingredients;
// });

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {},
//   selectors: {
//     getOrders: (sliceState) => sliceState.orders,
//     getIsLoading: (sliceState) => sliceState.isLoading
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchOrders.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchOrders.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.orders = action.payload;
//     });
//     builder.addCase(fetchOrders.rejected, (state) => {
//       state.isLoading = false;
//     });
//   }
// });

// export const { getOrders, getIsLoading } = orderSlice.selectors;

// export default orderSlice.reducer;
