import axios from 'axios';

export const publicApi = axios.create({
    baseURL: "https://connections-api.herokuapp.com"
})

export const privatApi = axios.create({
    baseURL: "https://connections-api.herokuapp.com"
})
export const token = {
    set: (token) => {
        privatApi.defaults.headers.Authorization = `Bearer ${token}`;
    },
    remove: () => {
        privatApi.defaults.headers.Authorization = null;
    }
}