import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';

import { BadgesApi } from 'api/badges/badges.api';
import { selectUserData } from 'store/user/selectors';

export const getBadges = createAppAsyncThunk(
  'badges/get',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Fetch all available badges
      const availableBadges = await BadgesApi.getAvailableBadges();
      // Fetch player badge progress
      const state: any = getState();
      const userData = selectUserData(state);
      const userId = userData?.id?.toString() || '';
      const brandId = (import.meta.env.VITE_OPERATOR_ID || 'ossino').toString();
      const playerBadges = await BadgesApi.getPlayerBadges(userId, brandId);

      const progressMap = new Map<string, any>();
      if (Array.isArray(playerBadges)) {
        playerBadges.forEach((pb: any) => {
          progressMap.set(String(pb.badgeId), pb);
        });
      }
      const mergedBadges = Array.isArray(availableBadges)
        ? availableBadges.map((badge: any) => {
            const playerBadge = progressMap.get(String(badge.id));
            return {
              id: badge.id,
              name: badge.name,
              description: badge.description,
              badgeType: badge.badgeType,
              iconUrl: badge.iconUrl,
              points: badge.points,
              isActive: badge.isActive,
              resetCondition: badge.resetCondition,
              rules: badge.rules,
              completed: playerBadge ? playerBadge.progressLevel : 0,
              playerDescription: playerBadge ? playerBadge.description : '',
            };
          })
        : [];
      return mergedBadges;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export type Badge = {
  id: number | string;
  name: string;
  description: string;
  badgeType: string;
  iconUrl: string | null;
  points: number;
  isActive: boolean;
  resetCondition: string;
  rules: any[];
  completed: number;
  playerDescription: string;
};

type BadgesState = {
  data: Badge[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: BadgesState = {
  data: null,
  loading: false,
  error: null,
};

const rewardsSlice = createSlice({
  name: 'badges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBadges.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBadges.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      });
  },
});

export default rewardsSlice.reducer;
