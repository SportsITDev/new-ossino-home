import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import { NOTIFICATIONS_FILTER } from 'store/notifications/constants';
import NotificationsList from '../NotificationsList';

const NotificationsTabs = () => {
  return (
    <Tabs defaultValue={NOTIFICATIONS_FILTER.ALL} className='grow flex flex-col'>
      <TabsList>
        <TabsTrigger
          value={NOTIFICATIONS_FILTER.ALL}
          className="md:w-40 lg:w-32"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value={NOTIFICATIONS_FILTER.UNREAD}
          className="md:w-40 lg:w-32"
        >
          Unread
        </TabsTrigger>
      </TabsList>
      <TabsContent value={NOTIFICATIONS_FILTER.ALL} className='grow'>
        <NotificationsList filter={NOTIFICATIONS_FILTER.ALL} />
      </TabsContent>
      <TabsContent value={NOTIFICATIONS_FILTER.UNREAD} className='grow'>
        <NotificationsList filter={NOTIFICATIONS_FILTER.UNREAD} />
      </TabsContent>
    </Tabs>
  );
};

export default NotificationsTabs;
