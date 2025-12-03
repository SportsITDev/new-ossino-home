import { useEffect } from 'react';
import { useAppSelector } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';
import { fetchGames } from 'store/games/slice';
import { useAppDispatch } from 'store/index';
import { fetchProviders } from 'store/providers/slice';
import { fetchTopMenu, fetchBottomMenu } from 'store/sidebar/slice';
import { getCategories } from 'store/categories/slice';
import { fetchBanner } from 'store/banner/slice';
import { getPromotions } from 'store/promotions/slice';
import { getQuickLinks, getSecurityLinks } from 'store/footer/slice';
import { getFooterContent } from 'store/footer/footerSlice';
import { getLoyaltyDetails } from 'store/loyaltyDetails/slice';
import { getWalletCurrencies } from 'store/wallet/slice';

export const useInitialData = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getLoyaltyDetails());
      dispatch(getWalletCurrencies({}));
    }
    dispatch(fetchBanner());
    dispatch(getCategories());
    dispatch(fetchTopMenu());
    dispatch(fetchBottomMenu());
    dispatch(fetchGames());
    dispatch(getPromotions());
    dispatch(fetchProviders());
    dispatch(getSecurityLinks());
    dispatch(getQuickLinks());
    dispatch(getFooterContent());
  }, [dispatch, isLoggedIn]);
};
