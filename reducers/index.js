import { combineReducers } from 'redux';

import chatroom from './chatroom';
import user from './user';

// src/reducers/index.js
const rootReducer = combineReducers({
    chatroom,
    user
});

export default rootReducer;
