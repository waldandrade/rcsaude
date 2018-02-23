const initialState = {
    email: null,
    password: null,
    nome: null,
    chat_token: null,
    confirm_password: null,
    authorizing: false,
    authorized: false,
    new_user: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return Object.assign({}, state, {
                email: action.email
            });
        case 'SET_PASSWORD':
            return Object.assign({}, state, {
                password: action.password
            });
        case 'SET_NOME':
            return Object.assign({}, state, {
                nome: action.nome
            });
        case 'SET_CONFIRM_PASSWORD':
            return Object.assign({}, state, {
                confirm_password: action.confirm_password
            });
        case 'USER_START_AUTHORIZING':
            return Object.assign({}, state, {
                authorizing: true
            });
        case 'USER_AUTHORIZED':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: true,
                new_user: null
            });
        case 'USER_OUT':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: false,
                email: null,
                password: null,
                new_user: null
            });
        case 'USER_NO_EXIST':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: false
            });
        case 'NEW_USER':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: false,
                email: null,
                password: null,
                new_user: true
            });

        default:
            return state
    }
}

export default user;
