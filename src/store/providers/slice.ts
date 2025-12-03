// Simple approach - update types to match API
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { ContentApi } from 'api/content/content.api';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';

// Use the API structure directly
export type Provider = {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
};

export const fetchProviders = createAsyncThunk(
  'providers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ContentApi.getProviders();
      
      // Handle the API response structure
      if (response.data && typeof response.data === 'object' && 'providers' in response.data) {
        return (response.data as { providers: Provider[] }).providers;
      }
      
      // If the response is already an array (fallback)
      if (Array.isArray(response.data)) {
        return response.data as Provider[];
      }
      
      throw new Error('Invalid API response format');
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type StateType = {
  loading: boolean;
  error: ErrorState | null;
  data: Provider[] | null;
};

const initialState: StateType = {
  data: null,
  loading: false,
  error: null,
};

const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        fetchProviders.fulfilled,
        (state, action: PayloadAction<Provider[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchProviders.rejected, (state, action) => {
        state.error = action.payload as ErrorState;
        state.loading = false;
      });
  },
});

export default providersSlice.reducer;