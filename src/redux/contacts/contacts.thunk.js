import { createAsyncThunk } from "@reduxjs/toolkit";
import { privatApi } from "services/http";
import { selectAuthToken } from "redux/auth/auth.selector";
import { selectUser } from "redux/auth/auth.selector";
import { token } from "services/http";

export const getContactsThunk = createAsyncThunk("contacts/get", async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    const saveToken = selectAuthToken(getState());
    const saveUser = selectUser(getState())


    if (saveToken === null) {
        return fulfillWithValue(saveUser);
    }

    try {
        token.set(saveToken);
        const { data } = await privatApi.get("/contacts");
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const addContactThunk = createAsyncThunk("contacts/add", async (contact, thunkAPI) => {
    try {
        const { data } = await privatApi.post("/contacts", contact);
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteContactThunk = createAsyncThunk("contacts/delete", async (contactId, thunkAPI) => {
    try {
        const { data } = await privatApi.delete(`/contacts/${contactId}`);
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const editContactThink = createAsyncThunk("contacts/change", async (contact, thunkAPI) => {
    try {

        const { data } = await privatApi.patch(`/contacts/${contact.id}`, contact.item);
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

