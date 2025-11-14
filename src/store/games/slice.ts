import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { gamesApi } from '../../api/games/games.api';
import type { Game } from '../../api/games/games.types';

interface GamesState {
    games: Game[];
    loading: boolean;
    error: string | null;
}

const initialState: GamesState = {
    games: [],
    loading: false,
    error: null,
};

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {
        try {
            // gamesApi.fetchGames returns Game[] directly
            const games = await gamesApi.fetchGames();
            return games;
        } catch (error) {
            console.error('Failed to fetch games:', error);
            throw error;
        }
    }
);

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
                state.loading = false;
                state.games = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch games';
            });
    },
});

export default gamesSlice.reducer;