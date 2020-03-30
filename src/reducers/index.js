import userEmailReducer from './userEmail';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    userEmail: userEmailReducer
});

export default allReducers;