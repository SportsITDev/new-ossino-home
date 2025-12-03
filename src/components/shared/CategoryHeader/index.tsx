import { useMemo } from 'react';

import { formatNumber } from 'helpers/numbers';
import LinkWithArrow from '../ui/LinkWithArrow';
import { Button } from '../ui/Button';
import arrowRight from '/icons/arrowRight.svg?url';
import Icon from '../Icon';

interface CategoryHeaderProps {
  label?: string;
  count?: number;
  showMore?: boolean;
  showMoreComponent?: 'button' | 'link';
  to?: string;
  onClick?: () => void;
}

const CategoryHeader = ({
  label,
  count,
  showMore,
  to = '#',
  showMoreComponent = 'link',
  onClick,
}: CategoryHeaderProps) => {
  const formattedCount = count
    ? formatNumber(count, 0, 'en', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    : '';

  const seeAll = useMemo(() => {
    if (!showMore) {
      return null;
    }

    switch (showMoreComponent) {
    case 'link':
      return <LinkWithArrow to={to}>See all</LinkWithArrow>;
    case 'button':
      return (
        <Button
          onClick={onClick}
          className="text-neon-2 text-sm font-medium flex items-center gap-1 bg-none"
        >
          See all
          <Icon
            id="arrowRightIcon"
            href={arrowRight}
            className="w-4 h-4 fill-current text-neon-2"
          />
        </Button>
      );
    default:
      return null;
    }
  }, [onClick, showMore, showMoreComponent, to]);

  return (
    <div className="flex items-center w-full gap-4">
      <div className="flex items-center gap-1">
        <div className="text-base">{label}</div>
        {count && (
          <span className="flex items-center justify-center w-7 h-5 rounded-full bg-gray-700 text-[10px]">
            {formattedCount}
          </span>
        )}
      </div>
      {seeAll}
    </div>
  );
};

export default CategoryHeader;
