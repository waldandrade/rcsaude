import { combineReducers } from 'redux';

import chatroom from './chatroom';
import user from './user';
import init from './init'
import nav from './nav'

// src/reducers/index.js
const rootReducer = combineReducers({
    chatroom,
    user,
    init
});

export default rootReducer;
