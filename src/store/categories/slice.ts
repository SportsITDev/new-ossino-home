import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi, type Category } from '../../api/categories/categories.api';

interface CategoriesState {
    data: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    data: [],
    loading: false,
    error: null,
};

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        try {
            const categories = await categoriesApi.fetchCategories();
            return categories;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            });
    },
});

export default categoriesSlice.reducer;