import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bannerSlice from './banner/slice';
import gamesSlice from './games/slice';
import promotionsSlice from './promotions/slice';
import categoriesSlice from './categories/slice';
import recentlyPlayedSlice from './recentlyPlayed/slice';
import userSlice from './user/slice';

const rootReducer = combineReducers({
    user: userSlice,
    banner: bannerSlice,
    games: gamesSlice,
    promotions: promotionsSlice,
    categories: categoriesSlice,
    recentlyPlayed: recentlyPlayedSlice,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
    {
        key: 'root',
        storage,
        whitelist: ['user'],
    },
    rootReducer,
);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();