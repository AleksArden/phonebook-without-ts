import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { authReducer } from "./auth/auth.slice";
import { contactsReducer } from "./contacts/contacts.slice";
import { filterReducer } from "./filter/filter.slice";

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        auth: authReducer,
        filter: filterReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store);