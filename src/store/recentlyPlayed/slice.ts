import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface RecentlyPlayedState {
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: RecentlyPlayedState = {
    data: [],
    loading: false,
    error: null,
};

export const getRecentlyPlayedGames = createAsyncThunk(
    'recentlyPlayed/getRecentlyPlayedGames',
    async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return [];
    }
);

const recentlyPlayedSlice = createSlice({
    name: 'recentlyPlayed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecentlyPlayedGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecentlyPlayedGames.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getRecentlyPlayedGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch recently played games';
            });
    },
});

export default recentlyPlayedSlice.reducer;