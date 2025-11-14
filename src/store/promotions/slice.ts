import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Promotion {
    offer_id: number;
    title: string;
    displayorder: number;
    regionid: number;
    region_code: string;
    mainofferitem: string;
    offerdescription: string | null;
    languagecode: string;
    is_active: boolean;
    is_detaileddescription: boolean;
    tags: string | null;
    categories: string;
    foropera: boolean;
    formobile: boolean;
    afterlogin: boolean;
    beforelogin: boolean;
    imageurl: string | null;
    detailedofferlink: string;
    offerimage: string;
    selectedpromotionid: string | null;
}

interface PromotionsState {
    data: Promotion[];
    loading: boolean;
    error: string | null;
}

const initialState: PromotionsState = {
    data: [],
    loading: false,
    error: null,
};

import { contentApi } from '../../api/content/content.api';

export const getPromotions = createAsyncThunk(
    'promotions/getPromotions',
    async () => {
        try {
            const response = await contentApi.getPromotions();
            if (response.data) {
                return response.data;
            }
            throw new Error('Failed to fetch promotions');
        } catch (error) {
            console.error('Failed to fetch promotions:', error);
            throw error;
        }
    }
);

const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPromotions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPromotions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPromotions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch promotions';
            });
    },
});

export default promotionsSlice.reducer;