import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sleep } from 'helpers/common';
import { notifications } from './mockData';
import type { Notification } from './types';

export const getNotifications = createAsyncThunk('notifications/get', async () => {
  await sleep(1);
  return notifications;
});

type NotificationsState = {
  data: Record<string, Notification[]> | null;
  loading: boolean;
  error: Error | null;
};

const initialState: NotificationsState = {
  data: null,
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
        state.data = null;
      });
  },
});

export default notificationsSlice.reducer;
