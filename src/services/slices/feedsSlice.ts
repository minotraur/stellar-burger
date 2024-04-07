import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedsState = {
  feeds: TOrdersData[];
  isLoading: boolean;
};

const initialState: TFeedsState = {
  feeds: [],
  isLoading: true
};

export const fetchFeeds = createAsyncThunk('getFeeds', async () => {
  const feeds: any = await getFeedsApi();
  return feeds;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (sliceState) => sliceState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feeds = action.payload;
    });
    builder.addCase(fetchFeeds.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { getFeedSelector } = feedSlice.selectors;

export default feedSlice.reducer;
