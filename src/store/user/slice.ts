import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    isAuthenticated: boolean;
    user: {
        id?: string;
        username?: string;
        email?: string;
        balance?: number;
        currency?: string;
    } | null;
    loading: boolean;
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;