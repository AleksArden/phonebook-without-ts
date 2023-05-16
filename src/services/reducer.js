export function formReducer(state, { type, payload }) {
    return (state = { ...state, [type]: payload });
}


export const initStateAddContact = {
    name: '',
    number: '',
};

export const initStateLoginPage = {
    email: '',
    password: '',
};

export const initStateRegisterPage = {
    name: '',
    email: '',
    password: '',
};
