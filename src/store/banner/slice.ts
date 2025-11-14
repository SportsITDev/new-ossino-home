import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { bannerApi, type Banner } from '../../api/banner/banner.api';

interface BannerState {
    bannerList: Banner[];
    loading: boolean;
    error: string | null;
}

const initialState: BannerState = {
    bannerList: [],
    loading: false,
    error: null,
};

export const fetchBanner = createAsyncThunk(
    'banner/fetchBanner',
    async () => {
        try {
            const banners = await bannerApi.fetchBanners();
            return banners;
        } catch (error) {
            console.error('Failed to fetch banners:', error);
            throw error;
        }
    }
);

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanner.fulfilled, (state, action: PayloadAction<Banner[]>) => {
                state.loading = false;
                state.bannerList = action.payload;
            })
            .addCase(fetchBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch banners';
            });
    },
});

export default bannerSlice.reducer;