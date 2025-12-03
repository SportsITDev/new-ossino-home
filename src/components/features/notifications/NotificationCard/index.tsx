/* eslint-disable indent */
/* eslint-disable react/destructuring-assignment */
import GiftIcon from 'assets/icons/GiftIcon';
import Icon from 'components/shared/Icon';
import { truncateString } from 'helpers/strings';
import type { Notification } from 'store/notifications/types';
import buyCrypto2 from '/icons/buyCrypto2.svg?url';
import coinLogo from '/icons/coinLogo.svg?url';
import messageNotif from '/icons/messageNotif.svg?url';
import profile2User from '/icons/profile2user.svg?url';
import ticketDiscount from '/icons/ticketDiscount.svg?url';

const NotificationCard = (notification: Notification) => {
  let icon;
  let title;
  let subTitle;

  switch (notification.type) {
    case 'tip':
      icon = <Icon id="buyCrypto2Icon" href={buyCrypto2} className="w-5 h-5" />;
      title = 'You tiped';
      subTitle = (
        <>
          By{' '}
          <span className="font-medium text-neon-1">@{notification.user}</span>{' '}
          with{' '}
          <span>
            <Icon
              id="coinLogoIcon"
              href={coinLogo}
              className="w-4 h-5 inline-block"
            />{' '}
            {notification.amount}
          </span>
        </>
      );

      break;
    case 'referal':
      icon = (
        <Icon
          id="profile2userIcon"
          href={profile2User}
          className="w-5 h-5 text-neon-1"
        />
      );
      title = 'Friend Signed Up';
      subTitle = (
        <>
          <span className="font-medium text-neon-1">@{notification.user}</span>{' '}
          used your referral link
        </>
      );

      break;
    case 'mention':
      icon = (
        <Icon
          id="messageNotifIcon"
          href={messageNotif}
          className="w-5 h-5 text-neon-1"
        />
      );
      title = 'New mention in a chat';
      subTitle = (
        <>
          <span className="font-medium text-neon-1">@{notification.user}</span>{' '}
          {truncateString(notification.message, 27)}
        </>
      );

      break;
    case 'bonus':
      icon = <GiftIcon className="w-5 h-5 fill-neon-1" />;
      title = 'Your Bonus is ready';
      subTitle = (
        <>
          You can claim it on{' '}
          <span className="font-medium text-neon-1">Coin Page</span>
        </>
      );

      break;
    case 'promotion':
      icon = (
        <Icon
          id="ticketDiscountIcon"
          href={ticketDiscount}
          className="w-5 h-5 text-neon-1"
        />
      );
      title = 'New Promotion for you';
      subTitle = '$10,000 Daily Race';

      break;
    default:
      return null;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div className="grow">
          <p className="font-medium tex-gray-200 text-sm leading-[18px] mb-1">
            {title}
          </p>
          <p className="text-xs text-gray-300 leading-4">{subTitle}</p>
        </div>
        {notification.status === 'unread' ? (
          <div className="w-2 h-2 bg-pink rounded-full" />
        ) : null}
      </div>
    </div>
  );
};

export default NotificationCard;
