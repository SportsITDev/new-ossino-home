import FeaturedGamesBlock from '../../../shared/FeaturedGamesBlock';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { useEffect, useMemo } from 'react';
import { getRecentlyPlayedGames } from '../../../../store/recentlyPlayed/slice';
import type { RoundedGameIconProps } from '../GameIcon/GameRoundedCard';

const normalizeString = (str: string): string => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const mapRecentlyPlayedToGames = (
  recentlyPlayedGames: any[],
  allGames: any[],
): RoundedGameIconProps[] => {
  return recentlyPlayedGames.map((recentGame) => {
    let matchedGame = allGames.find(
      (game) =>
        game.id === recentGame.gameCode ||
        game.game_code === recentGame.gameCode,
    );

    if (!matchedGame) {
      const normalizedRecentName = normalizeString(recentGame.gameName);
      const normalizedRecentProvider = normalizeString(recentGame.providerName);

      matchedGame = allGames.find((game) => {
        const normalizedGameName = normalizeString(
          game.name || game.title || '',
        );
        const normalizedGameProvider = normalizeString(game.provider || '');

        return (
          normalizedGameName === normalizedRecentName &&
          normalizedGameProvider === normalizedRecentProvider
        );
      });
    }

    if (!matchedGame) {
      const normalizedRecentName = normalizeString(recentGame.gameName);
      matchedGame = allGames.find((game) => {
        const normalizedGameName = normalizeString(
          game.name || game.title || '',
        );
        return normalizedGameName === normalizedRecentName;
      });
    }

    return {
      id: recentGame.gameCode,
      title: recentGame.gameName,
      image: matchedGame?.image || '/default-game-placeholder.png',
      name: matchedGame?.name || matchedGame?.title || recentGame.gameName,
      game: matchedGame,
    };
  });
};

const RecentlyPlayedGamesBlock = () => {
  const dispatch = useAppDispatch();
  const recentlyPlayedData = useAppSelector(
    (state) => state.recentlyPlayed.data,
  );
  const loading = useAppSelector((state) => state.recentlyPlayed.loading);
  const allGames = useAppSelector((state) => state.games.games);

  const mappedGames = useMemo(() => {
    if (!recentlyPlayedData || !allGames) return [];
    return mapRecentlyPlayedToGames(recentlyPlayedData, allGames);
  }, [recentlyPlayedData, allGames]);

  useEffect(() => {
    dispatch(getRecentlyPlayedGames());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="py-4">
        <h2 className="text-xl font-bold text-white mb-4">Recently Played</h2>
        <div className="flex justify-center py-8">
          <div className="text-gray-400">Loading recently played games...</div>
        </div>
      </div>
    );
  }

  if (mappedGames.length === 0) {
    return null; // Don't show if no recently played games
  }

  return (
    <div className="py-4">
      <FeaturedGamesBlock games={mappedGames} label="Recently played" />
    </div>
  );
};

export default RecentlyPlayedGamesBlock;