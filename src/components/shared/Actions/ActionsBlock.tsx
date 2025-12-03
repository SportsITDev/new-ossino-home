import { ROUTES } from 'constants/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import { toggleChat } from 'store/chat/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { cn } from 'helpers/ui';
import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import chatWhiteIcon from '/icons/messages3.svg?url';
import notification from '/icons/notification.svg?url';
import searchNormal from '/icons/searchNormal2.svg?url';

type ActionsProps = {
  toggleSideBar?: (value: boolean) => void; // used only on desktop
};

const ActionsBlock = ({ toggleSideBar }: ActionsProps) => {
  const dispatch = useAppDispatch();
  const { screenWidth } = useBreakpoint();
  const { openDialog } = useDialog();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isChatOpened = useAppSelector((state) => state.chat.isChatOpen);
  const isAuth = useAppSelector(selectIsLoggedIn);
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.notifications));

  const handleNotificationClick = () => {
    if (isAuth) {
      openDialog(DIALOG_TYPE.notifications);

      if (screenWidth < BREAKPOINTS.xl) {
        navigate('/notifications');
      }
    }

    if (toggleSideBar) {
      toggleSideBar(false);
    }
  };

  return (
    <div className="flex gap-2 ">
      <Button
        className={cn('bg-gray-700 w-8 h-8 xl:w-10 xl:h-10 p-0', { 'bg-neon-1': pathname === ROUTES.search })}
        onClick={() => {
          if (toggleSideBar) {
            toggleSideBar(false);
          }
          navigate(ROUTES.search);
        }}>
        <Icon
          id="searchNormal2Icon"
          href={searchNormal}
          className={cn('stroke-white w-4 h-4', { 'stroke-black': pathname === ROUTES.search })} />
      </Button>
      <Button
        className={cn('bg-gray-700 w-8 h-8 xl:w-10 xl:h-10 p-0', { 'bg-neon-1': isChatOpened })}
        onClick={() => {
          if (isAuth) {
            dispatch(toggleChat());
          }
          if (toggleSideBar) {
            toggleSideBar(true);
          }
        }}
      >
        <Icon
          id="messages3Icon" href={chatWhiteIcon}
          className={cn('w-4 h-4 fill-black ', { 'fill-black text-black': isChatOpened })} />
      </Button>
      <Button
        className={cn('bg-gray-700 w-8 h-8 xl:w-10 xl:h-10 p-0', { 'bg-neon-1': open })}
        onClick={handleNotificationClick}>
        <Icon
          id="notificationIcon"
          href={notification}
          className={cn('fill-white w-4 h-4', { 'text-black': open })}
        />
      </Button>
    </div>
  );
};

export default ActionsBlock;
