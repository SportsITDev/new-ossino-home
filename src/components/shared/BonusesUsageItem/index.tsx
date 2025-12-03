import { format } from 'date-fns';
import { type RegisterBonus } from 'api/registerBonuses/registerBonuses.types';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion';
import { Progress } from '../ui/Progress';
import Icon from '../Icon';
import infoIcon from '/icons/info.svg?url';
import USDT from '/icons/USDT.svg?url';

const BonusesUsageItem = ({ bonus }: { bonus: RegisterBonus }) => {
  const progressPercentage = bonus.stakeToBeWagered
    ? Math.min(100, (bonus.stakeWagered / bonus.stakeToBeWagered) * 100)
    : 0;

  const isFreeBet =
    bonus.bonusType === 'FREE_BET' ||
    bonus.bonusType?.toLowerCase().includes('freebet');

  const formatBonusType = (bonusType: string): string => {
    if (bonusType === 'FREE_BET' || bonusType.toLowerCase() === 'free_bet') {
      return 'Freebet';
    }
    return bonusType
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const startDate = bonus.startDate
    ? format(new Date(bonus.startDate), 'dd MMM, HH:mm')
    : '';
  const expiryDate = bonus.bonusExpiry
    ? format(new Date(bonus.bonusExpiry), 'dd MMM, HH:mm')
    : '';

  const isExpired = bonus.bonusExpiry
    ? new Date(bonus.bonusExpiry) < new Date()
    : false;
  const truncateSportsNames = (sportsNames: string, maxLength: number = 50) => {
    if (!sportsNames) return 'All Sports';
    if (sportsNames.length <= maxLength) return sportsNames;

    const sports = sportsNames.split(',');
    let result = '';
    let count = 0;

    for (const sport of sports) {
      const trimmedSport = sport.trim();
      if (result.length + trimmedSport.length + 2 <= maxLength) {
        result += (result ? ', ' : '') + trimmedSport;
        count++;
      } else {
        break;
      }
    }

    const remaining = sports.length - count;
    return remaining > 0 ? `${result} ...` : result;
  };

  return (
    <AccordionItem
      value={`${bonus.userBonusId}`}
      className="bg-gray-800 rounded-lg data-[state=open]:bg-gray-700"
    >
      <AccordionTrigger className="flex flex-row-reverse border-b border-b-gray-700 px-4 gap-2.5">
        <div className="flex justify-between items-center w-full">
          <p className="text-xs text-white font-normal">
            Bonus ID:&nbsp;{bonus.userBonusId}
          </p>
          <p className="text-xs text-white font-normal">{startDate}</p>
        </div>
      </AccordionTrigger>
      <div className="px-4 py-3">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-sm text-green-3 font-medium mb-1">
              {bonus.bonusCode}
            </p>
            <p className="text-xs">
              Applicable to:&nbsp;
              {truncateSportsNames(bonus.applicableType)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white font-medium flex items-center gap-1.5 justify-end mb-1">
              <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
              {bonus.totalBonus.toFixed(2)}
            </p>
            <p className="text-[10px] text-gray-400">
              Remaining: {bonus.bonusRemaining.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">Expiry:&nbsp;{expiryDate}</p>
          {isExpired ? (
            <p className="text-status-error-100 text-xs">Expired</p>
          ) : (
            <p className="text-green-400 text-xs capitalize">{bonus.status}</p>
          )}
        </div>
      </div>
      <AccordionContent className="flex flex-col p-3 pb-4">
        {!isFreeBet && (
          <>
            <div className="flex gap-1.5 items-center mb-2">
              <p className="text-xs">Wagering Progress</p>
              <Icon
                href={infoIcon}
                id="infoIcon"
                className="w-[14px] h-[14px] text-gray-500"
              />
            </div>
            <Progress value={progressPercentage} className="mb-1" />
            <div className="flex justify-between">
              <span className="text-gray-200 text-xs">
                {progressPercentage.toFixed(1)}%
              </span>
              <span className="text-gray-200 text-xs">
                {bonus.stakeWagered.toFixed(2)}/
                {bonus.stakeToBeWagered.toFixed(2)}
              </span>
            </div>
          </>
        )}

        {/* Bonus amounts breakdown */}
        <div
          className={`${isFreeBet ? 'mt-0' : 'mt-3'} pt-3 border-t border-gray-600`}
        >
          {isFreeBet ? (
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Free Bet Amount:</span>
                <span className="text-green-400">
                  {bonus.totalBonus.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-white capitalize">{bonus.status}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Locked:</span>
                <span className="text-white">
                  {bonus.lockedBonus.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Unlocked:</span>
                <span className="text-green-400">
                  {bonus.unlockedBonus.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Used:</span>
                <span className="text-white">{bonus.usedBonus.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Remaining:</span>
                <span className="text-white">
                  {bonus.bonusRemaining.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Additional bonus information */}
        <div className="mt-2 pt-3 border-t border-gray-600">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {!isFreeBet && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">Min Stake:</span>
                  <span className="text-white">{bonus.minStake}</span>
                </div>
                {bonus.applicableType?.toLowerCase() !== 'casino' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Odds:</span>
                      <span className="text-white">{bonus.oddsThreshold}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rollover:</span>
                      <span className="text-white">
                        {bonus.rollOverMultiplier}x
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className="text-white">
                {formatBonusType(bonus.bonusType)}
              </span>
            </div>
            {isFreeBet && (
              <div className="flex justify-between">
                <span className="text-gray-400">Usage:</span>
                <span className="text-white">Single Use</span>
              </div>
            )}
          </div>
        </div>

        {/* Free spins info if applicable */}
        {bonus.isFreeSpinBonus && (
          <div className="mt-2 pt-3 border-t border-gray-600">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Free Spins:</span>
                <span className="text-white">
                  {bonus.totalFreeSpinsRemaining}/
                  {bonus.totalFreeSpinsAllocated}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Used:</span>
                <span className="text-white">{bonus.totalFreeSpinsUsed}</span>
              </div>
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default BonusesUsageItem;
