import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import {
    logInUserThunk,
    logOutUserThunk,
    registerUserThunk,
    refreshUserThunk,
} from './auth.thunk';
import storage from 'redux-persist/lib/storage';

const authInitState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoading: false,
    error: null,
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitState,
    extraReducers: builder => {
        builder
            .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(logInUserThunk.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(logOutUserThunk.fulfilled, state => {
                state.user = { name: null, email: null };
                state.token = null;
            })
            .addCase(refreshUserThunk.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isRefreshing = false;
            })
            .addCase(refreshUserThunk.rejected, (state, { payload }) => {
                state.isRefreshing = false;
            })
            .addMatcher(
                isAnyOf(
                    registerUserThunk.pending,
                    logInUserThunk.pending,
                    logOutUserThunk.pending,
                    refreshUserThunk.pending
                ),
                state => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    registerUserThunk.fulfilled,
                    logInUserThunk.fulfilled,
                    logOutUserThunk.fulfilled,
                    refreshUserThunk.fulfilled
                ),
                state => {
                    state.isLoading = false;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    registerUserThunk.rejected,
                    logInUserThunk.rejected,
                    logOutUserThunk.rejected,
                    refreshUserThunk.rejected
                ),
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                }
            );
    },
});
const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
