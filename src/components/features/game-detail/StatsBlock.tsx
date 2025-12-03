import { useEffect, useState } from 'react';
import {
  PlayerStatsApi,
  PlayerStatsResponse,
} from 'api/player/playerStats.api';
import { formatNumber } from 'helpers/numbers';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';

const STAT_FIELDS = [
  { key: 'totalBetsCount', label: 'Total Bets Count', isCurrency: false },
  { key: 'totalBetAmount', label: 'Total Bets Amount', isCurrency: true },
  { key: 'highestBetPlaced', label: 'Highest Bet Placed', isCurrency: true },
  { key: 'biggestWin', label: 'Biggest Win', isCurrency: true },
  {
    key: 'numberOfGamesPlayed',
    label: 'No. Of Games Played',
    isCurrency: false,
  },
  { key: 'mostPlayedGame', label: 'Most Played Game', isCurrency: false },
];

const getCurrencySymbol = (currency: string) => {
  if (currency?.toUpperCase().includes('BTC')) return '₿';
  if (currency?.toUpperCase().includes('ETH')) return 'Ξ';
  if (currency?.toUpperCase().includes('USDT')) return '₮';
  return '$';
};

const StatsBlock = () => {
  const [statsList, setStatsList] = useState<PlayerStatsResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const operatorId = import.meta.env.VITE_OPERATOR_ID || 'ossino';
    const playerIdRaw = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
    const playerId =
      typeof playerIdRaw === 'string'
        ? Number(playerIdRaw)
        : typeof playerIdRaw === 'number'
          ? playerIdRaw
          : 0;
    const productType = 'Casino';
    const today = new Date();
    const createdDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 14,
    )
      .toISOString()
      .slice(0, 10);
    const updatedDate = today.toISOString().slice(0, 10);
    PlayerStatsApi.getPlayerStats({
      operatorId,
      playerId,
      productType,
      createdDate,
      updatedDate,
    })
      .then((res) => {
        console.log('API Response:', res);
        if (
          res.code === '1000' &&
          Array.isArray(res.result) &&
          res.result.length > 0
        ) {
          const sorted = [...res.result].sort((a, b) => {
            const order = (cur: string) =>
              cur.toUpperCase().includes('BTC')
                ? 0
                : cur.toUpperCase().includes('USDT')
                  ? 1
                  : 2;
            return order(a.currency) - order(b.currency);
          });
          console.log('Sorted stats:', sorted);
          setStatsList(sorted);
        } else {
          setStatsList([]);
        }
      })
      .catch(() => {
        setStatsList([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getValue = (
    field: (typeof STAT_FIELDS)[number],
    stats: PlayerStatsResponse,
  ) => {
    if (!stats) {
      if (field.key === 'mostPlayedGame')
        return <span className="text-neon-1">-</span>;
      return (
        <span className="text-neon-1">{field.isCurrency ? `$0.00` : '0'}</span>
      );
    }
    const value = stats[field.key as keyof PlayerStatsResponse];
    console.log(`Field ${field.key}:`, value, 'from stats:', stats);
    const currencySymbol = getCurrencySymbol(stats.currency);

    if (field.key === 'mostPlayedGame') {
      return <span className="text-neon-1">{value ? String(value) : '-'}</span>;
    }
    if (field.isCurrency) {
      const numValue =
        typeof value === 'number' ? value : parseFloat(String(value)) || 0;
      return (
        <span className="text-neon-1">{`${currencySymbol}${formatNumber(numValue, 2)}`}</span>
      );
    }
    const numValue =
      typeof value === 'number' ? value : parseInt(String(value)) || 0;
    return <span className="text-neon-1">{formatNumber(numValue, 0)}</span>;
  };

  return (
    <div className="px-2 py-3 bg-[#242424] rounded-xl mt-4 xl:mt-0 xl:bg-transparent xl:border md:bg-gray-850 xl:border-gray-700 flex flex-col gap-3">
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <svg className="animate-spin h-5 w-5 text-neon-1" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      ) : (
        <>
          {statsList.length === 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {STAT_FIELDS.map((field) => (
                <div
                  key={field.key}
                  className="flex flex-col justify-center items-center border border-gray-600 rounded p-2 min-h-[50px]"
                >
                  <span className="text-[10px] capitalize mb-1 text-gray-400 text-center leading-tight">
                    {field.label}
                  </span>
                  <span className="text-sm font-bold text-neon-1">
                    {getValue(field, null as any)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {statsList.map((stats) => {
                const isBTC = stats.currency.toUpperCase().includes('BTC');
                const isUSDT = stats.currency.toUpperCase().includes('USDT');
                const currencySymbol = getCurrencySymbol(stats.currency);

                return (
                  <AccordionItem
                    key={stats.currency}
                    value={stats.currency}
                    className={`
                      border rounded-lg mb-2
                      ${
                        isBTC
                          ? 'border-orange-500/30 bg-orange-500/5'
                          : isUSDT
                            ? 'border-green-500/30 bg-green-500/5'
                            : 'border-gray-600 bg-gray-800/20'
                      }
                    `}
                  >
                    <AccordionTrigger
                      className={`
                        px-3 py-2 hover:no-underline
                        ${
                          isBTC
                            ? 'text-orange-400 hover:text-orange-300'
                            : isUSDT
                              ? 'text-green-400 hover:text-green-300'
                              : 'text-neon-1 hover:text-neon-1/80'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="text-lg">{currencySymbol}</span>
                        <span>{stats.currency}</span>
                        <span className="text-xs text-gray-400">
                          ({stats.totalBetsCount} bets)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {STAT_FIELDS.map((field) => (
                          <div
                            key={field.key}
                            className={`
                              flex flex-col justify-center items-center rounded p-2 min-h-[45px] border
                              ${
                                isBTC
                                  ? 'border-orange-500/20 bg-orange-500/10'
                                  : isUSDT
                                    ? 'border-green-500/20 bg-green-500/10'
                                    : 'border-gray-600 bg-gray-800/30'
                              }
                            `}
                          >
                            <span className="text-[10px] capitalize mb-1 text-gray-400 text-center leading-tight">
                              {field.label}
                            </span>
                            <span
                              className={`
                              text-sm font-bold text-center
                              ${
                                isBTC
                                  ? 'text-orange-400'
                                  : isUSDT
                                    ? 'text-green-400'
                                    : 'text-neon-1'
                              }
                            `}
                            >
                              {getValue(field, stats)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </>
      )}
    </div>
  );
};

export default StatsBlock;
