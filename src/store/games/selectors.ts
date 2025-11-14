import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Game } from '../../api/games/games.types';

export const selectGames = (state: RootState) => state.games.games;
export const selectIsLoading = (state: RootState) => state.games.loading;
export const selectError = (state: RootState) => state.games.error;

export const selectGamesByCategories = createSelector(
    [selectGames],
    (games) => {
        if (!games?.length) return null;
        const categoryMap = new Map<string, { games: Game[] }>();
        for (const game of games) {
            for (const category of game.categories || []) {
                if (!categoryMap.has(category)) {
                    categoryMap.set(category, { games: [] });
                }
                categoryMap.get(category)!.games.push(game);
            }
        }
        return Object.fromEntries(categoryMap);
    }
);
