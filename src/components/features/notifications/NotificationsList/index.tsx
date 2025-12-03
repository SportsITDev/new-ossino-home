import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectNotificationsData,
  type NotificationsFilter,
} from 'store/notifications/selectors';
import { getNotifications } from 'store/notifications/slice';
import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useNavigate } from 'react-router-dom';
import NotificationCard from '../NotificationCard';
import NoNotificationsMessage from '../NoNotificationsMessage';

type NotificationsListProps = {
  filter: NotificationsFilter;
};

const NotificationsList = ({ filter }: NotificationsListProps) => {
  const notifications = useAppSelector(selectNotificationsData(filter));
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();
  const navigate = useNavigate();

  const handleClick = (details: string) => {
    openDialog(DIALOG_TYPE.notificationDetails, { details });

    if (screenWidth < BREAKPOINTS.xl) {
      navigate('/notification-details');
    }
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  if (Object.keys(notifications).length === 0) {
    return <NoNotificationsMessage />;
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      {Object.keys(notifications).map((key) => {
        const notificationsList = notifications[key];

        return (
          <div className="flex flex-col gap-3">
            <h4 className="text-sm text-gray-200 font-medium leading-4 capitalize">
              {key}
            </h4>
            {notificationsList.map((notification) => (
              <div
                onClick={() => handleClick(notification.details)}
                className="cursor-pointer"
              >
                <NotificationCard key={notification.id} {...notification} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsList;
