
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privatApi, publicApi, token } from "services/http";
import { selectAuthToken, selectUser } from "./auth.selector";
import Notiflix from 'notiflix';

export const registerUserThunk = createAsyncThunk('auth/register', async (values, { rejectWithValue }) => {
    try {
        const { data } = await publicApi.post("/users/signup", values);
        token.set(data.token)
        return data;
    } catch (error) {
        if (error.response.status === 400) {
            Notiflix.Notify.failure("This name or email is no longer available", {
                position: 'center-top',
                cssAnimationStyle: 'from-top',
            })
            return rejectWithValue(null)
        }
        return rejectWithValue(error.message)

    }
})

export const logInUserThunk = createAsyncThunk('auth/login', async (values, { rejectWithValue }) => {
    try {
        const { data } = await publicApi.post("/users/login", values);

        token.set(data.token);
        return data

    } catch (error) {
        if (error.response.status === 400) {
            Notiflix.Notify.failure("Incorrectly entered email or password", {
                position: 'center-top',
                cssAnimationStyle: 'from-top',
            })
            return rejectWithValue(null)
        }
        return rejectWithValue(error.message)
    }
})

export const logOutUserThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await privatApi.post("/users/logout");
        token.remove()
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const refreshUserThunk = createAsyncThunk("auth/current", async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    const saveToken = selectAuthToken(getState());
    const saveUser = selectUser(getState())

    if (saveToken === null) {
        return fulfillWithValue(saveUser);
    }

    try {
        token.set(saveToken);
        const { data } = await privatApi.get("/users/current");

        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})