import type { RegisterBonus } from 'api/registerBonuses/registerBonuses.types';
import { cn } from 'helpers/ui';

export type BonusItemProps = RegisterBonus & {
  image: string;
  bonusPercentage?: number; // Make optional for backward compatibility
  maxBonus?: number; // Make optional for backward compatibility
  isSelected: boolean;
  onClick: () => void;
};

const BonusItem = ({
  image,
  bonusCode,
  bonusPercentage,
  maxBonus,
  isSelected,
  onClick,
}: BonusItemProps) => {
  // Fallback values for missing props
  const displayPercentage = bonusPercentage ?? 0;
  const displayMaxBonus = maxBonus ?? 0;

  return (
    <div
      className={cn('px-4 py-3.5 rounded-xl border', {
        'border-neon-1': isSelected,
        'border-gray-300 cursor-pointer': !isSelected,
      })}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className="bg-[#FFFFFF33] w-8 h-8 rounded-full flex items-center justify-center">
          <img src={image} alt={bonusCode} width={16} height={16} />
        </div>
        <div className="grow">
          <h3 className="font-bold text-sm leading-4 mb-[2px]">{`${bonusCode} Bonus +${displayPercentage}%`}</h3>
          <p className="text-xs leading-4">{`up to ${displayMaxBonus}`}</p>
        </div>
        <div
          className={cn(
            'w-4 h-4 rounded-full flex items-center justify-center',
            isSelected ? 'border-none bg-neon-1' : 'border border-gray-300',
          )}
        >
          {isSelected && (
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BonusItem;
