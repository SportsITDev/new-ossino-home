import { CLIENT_TYPE } from 'constants/clientType';
import { useAppSelector, useAppDispatch } from 'store/index';
import {
  selectMenuItemsLoading,
  selectTopMenuItems,
} from 'store/sidebar/selectors';
import { setSelectedGameType } from 'store/sidebar/slice';
import { selectIsLoggedIn, selectIsVipUser } from 'store/user/selectors';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useNavigate } from 'react-router-dom';
import MenuList from '../MenuItem/MenuList';
import MenuListLoader from './MenuListLoader';

interface TopMenuListProps {
  isOpen: boolean;
  onClick: (itemId: number | string) => void;
}

const TopMenuList = ({ isOpen, onClick }: TopMenuListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuItems = useAppSelector(selectTopMenuItems(CLIENT_TYPE));
  const menuItemsLoading = useAppSelector(selectMenuItemsLoading);
  const isAuth = useAppSelector(selectIsLoggedIn);
  const isVipUser = useAppSelector(selectIsVipUser);
  const { openDialog } = useDialog();

  const protectedItems = ['Loyalty', 'Favourites', 'Referral'];

  // Filter out Referral menu item for VIP users
  const filteredMenuItems = menuItems?.filter((item) => {
    if (isVipUser && item.label === 'Referral') {
      return false;
    }
    return true;
  });

  const handleMenuClick = (
    itemId: number | string,
    label?: string,
    href?: string,
  ) => {
    if (!isAuth && label && protectedItems.includes(label)) {
      openDialog(DIALOG_TYPE.login, { tab: 'login' });
      return;
    }

    // Set the selected game type based on menu selection
    if (label) {
      dispatch(setSelectedGameType(label));
    }

    if (href) {
      navigate(href);
    }
    onClick(itemId);
  };

  if (menuItemsLoading) {
    return <MenuListLoader isOpen={isOpen} />;
  }

  if (!filteredMenuItems || filteredMenuItems.length === 0) {
    return null;
  }

  return (
    <MenuList list={filteredMenuItems} isOpen={isOpen} onClick={handleMenuClick} />
  );
};

export default TopMenuList;
