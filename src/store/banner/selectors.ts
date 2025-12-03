import { createSelector } from '@reduxjs/toolkit';
import type { GameIconProps } from 'components/features/main-page/GameIcon/GameCard';
import { filterContentItem } from 'store/helpers/filterContentItem';
import { type RootState } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';
import { mapItem } from './helpers';

const selectBannerList = (state: RootState) => state.banner.bannerList;
export const selectBannerLoading = (state: RootState) => state.banner.loading;
export const selectBannerError = (state: RootState) => state.banner.error;

export const selectBanners = createSelector(
  selectBannerList,
  selectIsLoggedIn,
  (bannerList, isAuth) => {
    const sorted = [...bannerList].sort(
      (a, b) => a.displayorder - b.displayorder,
    );

    const banners: GameIconProps[] = [];

    for (const item of sorted) {
      if (!filterContentItem(item, isAuth)) continue;
      const mappedItem = mapItem(item);
      banners.push(mappedItem);
    }

    return banners;
  },
);
