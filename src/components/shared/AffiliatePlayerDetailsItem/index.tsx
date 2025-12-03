import { format } from 'date-fns';
import { type PlayerDetail } from 'api/affiliate/affiliate.types';
import Icon from '../Icon';
import { cn } from 'helpers/ui';
import { formatNumber } from 'helpers/numbers';
import profile2user from '/icons/profile2user.svg?url';

const AffiliatePlayerDetailsItem = ({
  playerDetail,
  className,
}: {
  playerDetail: PlayerDetail;
  className?: string;
}) => {
  return (
    <div className={cn('rounded-xl p-4 bg-gray-800 w-full flex', className)}>
      <div className="rounded-full bg-gray-700 flex items-center justify-center w-10 h-10 mr-2">
        <Icon
          id="profile2userIcon"
          href={profile2user}
          className="w-5 h-5 fill-current text-neon-1"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between gap-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-200 leading-4">
            Referral Registration
          </p>
          <span className="text-sm font-medium leading-4 text-green-1">
            +{formatNumber(playerDetail.totalEarnings, 2, 'en')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-gray-400 leading-4">
            {playerDetail.name}
          </span>
          <span className="text-xs text-gray-400 leading-4">
            {format(new Date(playerDetail.registeredDate), 'dd MMM yyyy')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {playerDetail.gamesPlayed} games played
          </span>
          <span className="text-xs text-gray-500">
            Earnings: {formatNumber(playerDetail.earnings, 2, 'en')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AffiliatePlayerDetailsItem;