import type { Game } from 'api/content/content.types';
import type { ApiLastWin, LastWinsType } from './types';
import { generateDisplayName } from 'helpers/displayName';

const normalizeString = (str: string): string => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const findMatchingGame = (lastWin: ApiLastWin, allGames: Game[]): Game | null => {
  let matchedGame = allGames.find(
    (game) =>
      game.game_code === lastWin.gameId ||
      game.id === lastWin.gameId,
  );

  if (matchedGame) {
    return matchedGame;
  }

  const normalizedLastWinName = normalizeString(lastWin.gameName);

  matchedGame = allGames.find((game) => {
    const normalizedGameName = normalizeString(
      game.name || game.title || '',
    );
    return normalizedGameName === normalizedLastWinName;
  });

  return matchedGame || null;
};

const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) {
      return 'now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  } catch (error) {
    return timestamp;
  }
};

export const mapApiLastWinsToLastWins = (
  apiLastWins: ApiLastWin[],
  allGames: Game[],
): LastWinsType[] => {
  return apiLastWins.map((lastWin) => {
    const matchedGame = findMatchingGame(lastWin, allGames);
    
    // Generate display name using the new utility function
    const displayName = generateDisplayName(
      lastWin.firstName || '',
      lastWin.lastName || '',
      lastWin.email || ''
    );

    return {
      id: lastWin.betId,
      winnerName: displayName,
      win: lastWin.amount,
      winTime: formatTimestamp(lastWin.timestamp),
      game: {
        src: matchedGame?.image || '/default-game-placeholder.png',
        alt: lastWin.gameName,
      },
      gameId: lastWin.gameId,
      gameName: lastWin.gameName,
      betId: lastWin.betId,
      amount: lastWin.amount,
      currency: lastWin.currency,
      timestamp: lastWin.timestamp,
    };
  });
};

export const handleResponse = (response: any): ApiLastWin[] => {
  const lastWinsData = response?.data?.result?.data?.lastWins || response?.data?.data?.lastWins || [];

  if (!Array.isArray(lastWinsData)) {
    return [];
  }

  return lastWinsData;
};