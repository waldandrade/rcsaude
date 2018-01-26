const initialState = {
    email: null,
    password: null,
    authorizing: false,
    authorized: false
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
        case 'USER_START_AUTHORIZING':
            return Object.assign({}, state, {
                authorizing: true
            });
        case 'USER_AUTHORIZED':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: true
            });
        case 'USER_NO_EXIST':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: false
            });

        default:
            return state
    }
}

export default user;
