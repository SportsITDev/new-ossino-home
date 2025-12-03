import Icon from 'components/shared/Icon';
import notificationBing from '/icons/notificationBing.svg?url';

const NoNotificationsMessage = () => {
  return (
    <div className="bg-gray-800 xl:bg-gray-900 rounded-lg h-[552px] md:h-[443px] flex flex-col items-center justify-center text-center gap-4">
      <Icon
        id="notificationBingIcon"
        href={notificationBing}
        className="w-16 h-16 text-gray-400"
      />
      <p className="text-xs text-gray-400 leading-4 max-w-[170px] xl:text-base xl:max-w-[220px] xl:leading-[22px]">
        It seems like you don&apos;t have notifications
      </p>
    </div>
  );
};

export default NoNotificationsMessage;
