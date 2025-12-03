import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/index';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { getReferralCode } from 'store/referrals/slice';

import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import exp from '/icons/export.svg?url';
import copy from '/icons/copy.svg?url';
import { cn } from 'helpers/ui';
import styles from './index.module.css';

const ReferralProgram = () => {
  const { screenWidth } = useBreakpoint();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user.data);
  const siteUrl = import.meta.env.VITE_WEBSITE_URL;
  useEffect(() => {
    dispatch(getReferralCode());
  }, [dispatch]);

  const onCopy = () => {
    if (data) {
      navigator.clipboard.writeText(
        `${siteUrl}/register?refId=${data.userRefCode}`,
      );
    }
  };

  return data ? (
    <div
      className={cn('bg-gray-800 p-4 rounded-xl', {
        [styles.gradient]: screenWidth >= BREAKPOINTS.xl,
      })}
    >
      <h2 className="text-white font-bold mb-2 text-xl xl:mb-4">
        Referral Program
      </h2>
      <p className="text-gray-200 text-xs mb-5 xl:text-sm">
        Our affiliate program includes a comprehensive retention program that
        keeps referred customers engaged and invested. Through regular
        promotions and bonusing, as well as a competitive VIP program, we ensure
        that referred players continue to play and enjoy their experience at
        OSSINO. This not only benefits the customer, but also generates ongoing
        commissions for our affiliates.
      </p>
      <p className="text-xs text-white mb-2">Your Referral Code</p>
      <div className="flex flex-col xl:flex-row xl:gap-3">
        <div
          className="px-3 h-10 rounded-lg border border-gray-600 mb-3 xl:mb-0 flex justify-between items-center cursor-pointer xl:flex-1 overflow-x-auto"
          onClick={onCopy}
        >
          <span className="text-gray-100 text-sm truncate whitespace-nowrap">{`${siteUrl}/register?refId=${data.userRefCode}`}</span>
          <Icon id="copyIcon" href={copy} className="h-4 w-4 flex-shrink-0" />
        </div>
        <Button
          variant="filled"
          className="w-full flex gap-2 md:px-20 xl:px-12 md:w-fit"
          onClick={() => {
            const shareUrl = `${siteUrl}/register?refId=${data.userRefCode}`;
            if (navigator.share) {
              navigator.share({
                title: 'Join me on OSSINO!',
                text: 'Sign up and play with my referral link:',
                url: shareUrl,
              });
            } else {
              navigator.clipboard.writeText(shareUrl);
            }
          }}
        >
          <Icon id="exportIcon" href={exp} className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  ) : null;
};

export default ReferralProgram;
