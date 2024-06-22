import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';
import reducer, {
  fetchFeeds,
  initialState
} from '../services/slices/feedsSlice';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('feedSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const expectedState = {
      isLoading: true,
      feedInfo: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const mockFeedInfo: TOrdersData = {
      orders: [
        {
          _id: '1',
          status: 'status',
          name: 'test order',
          createdAt: '',
          updatedAt: '',
          number: 0,
          ingredients: []
        }
      ],
      total: 100,
      totalToday: 10
    };
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeedInfo };
    const expectedState = {
      isLoading: false,
      feedInfo: mockFeedInfo
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchFeeds.rejected', () => {
    const action = { type: fetchFeeds.rejected.type };
    const expectedState = {
      isLoading: false,
      feedInfo: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
