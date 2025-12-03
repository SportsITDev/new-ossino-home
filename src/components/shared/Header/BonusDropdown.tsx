import { useEffect, useState } from 'react';
import { formatNumber } from 'helpers/numbers';
import { useAppSelector, useAppDispatch } from 'store/index';
import {
  selectBonusSummaryData,
  selectBonusSummaryLoading,
  selectBonusSummaryError,
} from 'store/bonusSummary/selectors';
import { getBonusSummary } from 'store/bonusSummary/slice';
import Select from '../Select';
import Icon from 'components/shared/Icon';
import gift from '/icons/gift.svg?url';
import arrowDown from '/icons/arrowDown.svg?url';
import arrowUp from '/icons/arrowUp.svg?url';

interface BonusSectionProps {
  title: string;
  totalAmount?: number;
  freeBetCount?: number;
  freeSpinCount?: number;
  unlockedBonus?: number;
  lockedBonus?: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const BonusSection = ({
  title,
  totalAmount = 0,
  freeBetCount,
  freeSpinCount,
  unlockedBonus = 0,
  lockedBonus = 0,
  isExpanded,
  onToggle,
}: BonusSectionProps) => {

  return (
    <div className="border-b border-gray-600 last:border-none">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white">{title}</span>
          <Icon
            id={isExpanded ? 'arrowUpIcon' : 'arrowDownIcon'}
            href={isExpanded ? arrowUp : arrowDown}
            className="w-4 h-4"
          />
        </div>
        <span
          className="text-xs font-medium bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(107.42deg, hsl(var(--neon-1)) 0%, hsl(var(--green-1)) 105%)' }}
        >
          {formatNumber(totalAmount, 2)}
        </span>
      </div>

      {isExpanded && (
        <div className="px-[0.8rem] pb-2 space-y-1">
          {freeBetCount !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">Free Bet</span>
              <span className="text-xs text-white">{freeBetCount}</span>
            </div>
          )}

          {freeSpinCount !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">Free Spin</span>
              <span className="text-xs text-white">{freeSpinCount}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300">Unlocked Bonus</span>
            <span
              className="text-xs font-medium bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(107.42deg, hsl(var(--neon-1)) 0%, hsl(var(--green-1)) 105%)' }}
            >
              {formatNumber(unlockedBonus, 2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300">Locked bonus</span>
            <span
              className="text-xs font-medium bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(107.42deg, hsl(var(--neon-1)) 0%, hsl(var(--green-1)) 105%)' }}
            >
              {formatNumber(lockedBonus, 2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const BonusDropdown = () => {
  const dispatch = useAppDispatch();
  const bonusData = useAppSelector(selectBonusSummaryData);
  const loading = useAppSelector(selectBonusSummaryLoading);
  const error = useAppSelector(selectBonusSummaryError);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'casino' | 'sports' | null>(null);

  useEffect(() => {
    if (hasBeenOpened && !bonusData && !loading) {
      dispatch(getBonusSummary());
    }
  }, [hasBeenOpened, bonusData, loading, dispatch]);

  const handleClick = () => {
    if (!hasBeenOpened) {
      setHasBeenOpened(true);
    }
  };

  return (
    <div onClick={handleClick}>
      <Select
        dropDownClassName="min-w-[14.3rem] max-w-[310px] bg-gray-700 right-0 rounded-[10px]"
        className="min-w-15"
        closeOnClick={false}
        list={
          <div className="py-1">
            {loading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neon-1"></div>
              </div>
            )}

            {error && (
              <div className="px-3 py-2 text-xs text-red-400 text-center">
                Failed to load bonus data
              </div>
            )}

            {!loading && hasBeenOpened && (
              <>
                <BonusSection
                  title="Casino Bonus"
                  totalAmount={bonusData?.casinoBonus?.totalAmount || 0}
                  freeSpinCount={bonusData?.casinoBonus?.freeSpinCount}
                  unlockedBonus={bonusData?.casinoBonus?.unlockedBonus || 0}
                  lockedBonus={bonusData?.casinoBonus?.lockedBonus || 0}
                  isExpanded={expandedSection === 'casino'}
                  onToggle={() => setExpandedSection(expandedSection === 'casino' ? null : 'casino')}
                />
                <BonusSection
                  title="Sports Bonus"
                  totalAmount={bonusData?.sportsBonus?.totalAmount || 0}
                  freeBetCount={bonusData?.sportsBonus?.freeBetCount}
                  unlockedBonus={bonusData?.sportsBonus?.unlockedBonus || 0}
                  lockedBonus={bonusData?.sportsBonus?.lockedBonus || 0}
                  isExpanded={expandedSection === 'sports'}
                  onToggle={() => setExpandedSection(expandedSection === 'sports' ? null : 'sports')}
                />
              </>
            )}
          </div>
        }
      >
        <div className="flex items-center justify-between xl:justify-center gap-1 px-1.5">
          <span className="flex items-center">
            <Icon
              id="giftIcon"
              href={gift}
              className="w-5 h-5 fill-current text-white"
            />
          </span>
            <span className="flex items-center font-semibold ">
            <span className="xl:flex hidden text-xs">Bonus</span>
          </span>
        </div>
      </Select>
    </div>
  );
};

export default BonusDropdown;
