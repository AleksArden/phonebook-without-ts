import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    addContactThunk,
    editContactThink,
    deleteContactThunk,
    getContactsThunk,
} from './contacts.thunk';

const contactsInitState = {
    items: [],
    isLoading: false,
    error: null,
    currentContact: null,
    isOpenModalDelete: false,
    isOpenModalEdit: false,
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitState,
    reducers: {
        openModalDelete(state, { payload }) {
            state.isOpenModalDelete = true;
            state.currentContact = payload;
        },
        closeModalDelete(state) {
            state.isOpenModalDelete = false;
            state.currentContact = null;
        },
        openModalEdit(state, { payload }) {
            state.isOpenModalEdit = true;
            state.currentContact = payload;
        },
        closeModalEdit(state) {
            state.isOpenModalEdit = false;
            state.currentContact = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getContactsThunk.fulfilled, (state, { payload }) => {
                state.items = payload;
            })
            .addCase(addContactThunk.fulfilled, (state, { payload }) => {
                state.items.push(payload);
            })
            .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
                state.items = state.items.filter(({ id }) => id !== payload.id);
            })
            .addCase(editContactThink.fulfilled, (state, { payload }) => {
                const idx = state.items.findIndex(({ id }) => id === payload.id);
                state.items[idx] = payload;
            })
            .addMatcher(
                isAnyOf(
                    getContactsThunk.pending,
                    addContactThunk.pending,
                    deleteContactThunk.pending,
                    editContactThink.pending
                ),
                state => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    getContactsThunk.fulfilled,
                    addContactThunk.fulfilled,
                    deleteContactThunk.fulfilled,
                    editContactThink.fulfilled
                ),
                state => {
                    state.error = null;
                    state.isLoading = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    getContactsThunk.rejected,
                    addContactThunk.rejected,
                    deleteContactThunk.rejected,
                    editContactThink.rejected
                ),
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                }
            );
    },
});

export const {
    openModalDelete,
    closeModalDelete,
    openModalEdit,
    closeModalEdit,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
