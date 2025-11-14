import type { RootState } from '../index';

export const selectBanners = (state: RootState) => state.banner.bannerList;
export const selectBannerLoading = (state: RootState) => state.banner.loading;
export const selectBannerError = (state: RootState) => state.banner.error ? { message: state.banner.error } : null;