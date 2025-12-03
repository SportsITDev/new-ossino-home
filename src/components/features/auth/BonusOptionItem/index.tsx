import type { BonusOption } from 'api/bonuses/bonuses.types';
import { cn } from 'helpers/ui';

export type BonusOptionItemProps = BonusOption & {
  isSelected: boolean;
  onClick: () => void;
};

const BonusOptionItem = ({
  icon,
  title,
  description,
  isSelected,
  onClick,
}: BonusOptionItemProps) => {
  return (
    <div
      className={cn('px-4 py-3.5 rounded-xl border cursor-pointer', {
        'border-neon-1': isSelected,
        'border-gray-300': !isSelected,
      })}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className="bg-[#FFFFFF33] w-8 h-8 rounded-full flex items-center justify-center">
          <img src={icon} alt={title} width={16} height={16} />
        </div>
        <div className="grow">
          <h3 className="font-bold text-sm leading-4 mb-[2px] text-white">{title}</h3>
          <p className="text-xs leading-4 text-gray-200">{description}</p>
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

export default BonusOptionItem;