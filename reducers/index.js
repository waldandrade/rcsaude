import { combineReducers } from 'redux';

import chatroom from './chatroom';
import user from './user';
import init from './init'

// src/reducers/index.js
const rootReducer = combineReducers({
    chatroom,
    user,
    init
});

export default rootReducer;
