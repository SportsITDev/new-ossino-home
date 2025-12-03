import { format } from 'date-fns';
import Icon from '../Icon';
import USDT from '/icons/USDT.svg?url';
import { BonusHistoryTransaction } from 'api/registerBonuses/bonusHistory.types';

interface BonusHistoryItemProps {
  transaction: BonusHistoryTransaction;
}

const getTransactionTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    LOCKED_BONUS_APPLIED: 'Bonus',
    UNLOCKED_BONUS_APPLIED: 'Bonus Unlocked',
    UNLOCKED_BONUS: 'Bonus Unlocked',
    BONUS_USED: 'Bonus Used',
    BONUS_EXPIRED: 'Bonus Expired',
    BONUS_CANCELLED: 'Bonus Cancelled',
    BET_PLACED: 'Bet Placed',
    AWARD_FREE_SPINS: 'Free Spins Awarded',
    AWARD_FREEBET: 'Free Bet Awarded',
  };
  return labels[type] || type.replace(/_/g, ' ');
};

const getTransactionTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    LOCKED_BONUS_APPLIED: 'text-green-300',
    UNLOCKED_BONUS_APPLIED: 'text-green-300',
    UNLOCKED_BONUS: 'text-green-300',
    BONUS_USED: 'text-green-300',
    BONUS_EXPIRED: 'text-red-300',
    BONUS_CANCELLED: 'text-red-300',
    BET_PLACED: 'text-green-300',
    AWARD_FREE_SPINS: 'text-green-300',
    AWARD_FREEBET: 'text-green-300',
  };
  return colors[type] || 'text-green-300';
};

const BonusHistoryItem = ({ transaction }: BonusHistoryItemProps) => {
  const { userBonusDetails } = transaction;

  const isFreeAwardTransaction = (transactionType: string): boolean => {
    return (
      transactionType === 'AWARD_FREE_SPINS' ||
      transactionType === 'AWARD_FREEBET'
    );
  };

  if (!userBonusDetails) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs text-white">ID: {transaction.id}</p>
          <p className="text-xs text-white">
            {format(new Date(transaction.releasedDate), 'dd MMM, HH:mm')}
          </p>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p
              className={`text-sm font-medium mb-1 ${getTransactionTypeColor(transaction.transactionType)}`}
            >
              {getTransactionTypeLabel(transaction.transactionType)}
            </p>
            <p className="text-xs text-gray-400">
              Type: <span className="text-white">N/A</span>
            </p>
          </div>
          <div className="text-right">
            {transaction.lockedBonus > 0 && (
              <p className="text-xs text-white font-medium flex items-center justify-end gap-1.5 mb-1">
                <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                <span className="text-white-400">
                  {transaction.lockedBonus}
                </span>
              </p>
            )}
            {transaction.unlockedBonus > 0 && (
              <p className="text-xs text-white font-medium flex items-center justify-end gap-1.5">
                <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                <span className="text-white-400">
                  {transaction.unlockedBonus}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-white">ID: {transaction.id}</p>
        <p className="text-xs text-white">
          {format(new Date(transaction.releasedDate), 'dd MMM, HH:mm')}
        </p>
      </div>

      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p
            className={`text-sm font-medium mb-1 ${getTransactionTypeColor(transaction.transactionType)}`}
          >
            {getTransactionTypeLabel(transaction.transactionType)}
          </p>
          <p className="text-xs text-gray-400">
            Type:{' '}
            <span className="text-white">
              {userBonusDetails?.bonusType || 'N/A'}
            </span>
          </p>
        </div>

        <div className="text-right">
          {isFreeAwardTransaction(transaction.transactionType) ? (
            <p className="text-xs text-white font-medium flex items-center justify-end gap-1.5">
              {transaction.transactionType === 'AWARD_FREE_SPINS' ? (
                <span className="text-white-300">
                  {transaction.transactionAmount} Free Spins
                </span>
              ) : (
                <>
                  <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                  <span className="text-white-300">
                    {transaction.transactionAmount}
                  </span>
                </>
              )}
            </p>
          ) : (
            <>
              {transaction.lockedBonus > 0 && (
                <p className="text-xs text-white font-medium flex items-center justify-end gap-1.5 mb-1">
                  <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                  <span className="text-white-400">
                    {transaction.lockedBonus}
                  </span>
                </p>
              )}
              {transaction.unlockedBonus > 0 && (
                <p className="text-xs text-white font-medium flex items-center justify-end gap-1.5">
                  <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                  <span className="text-white-400">
                    {transaction.unlockedBonus}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-700">
        {isFreeAwardTransaction(transaction.transactionType) ? (
          <>
            {userBonusDetails?.bonusExpiry && (
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-400">Expires:</span>
                <span className="text-white">
                  {format(
                    new Date(userBonusDetails.bonusExpiry),
                    'dd MMM yyyy',
                  )}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Total Locked:</span>
              <span className="text-white">
                {userBonusDetails?.totalLocked || 0}
              </span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">Total Unlocked:</span>
              <span className="text-white">
                {userBonusDetails?.totalUnlocked || 0}
              </span>
            </div>
          </>
        )}
        {userBonusDetails?.rollOverMultiplier &&
        userBonusDetails.rollOverMultiplier > 0 ? (
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-400">Rollover:</span>
            <span className="text-white">
              {userBonusDetails.rollOverMultiplier}x
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default BonusHistoryItem;
