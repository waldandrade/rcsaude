const initialState = {
    fontLoaded: false
};

const init = (state = initialState, action) => {
    switch (action.type) {
        case 'FONT_LOADED':
            return Object.assign({}, state, {
                fontLoaded: true
            });

        default:
            return state
    }
}

export default init;
