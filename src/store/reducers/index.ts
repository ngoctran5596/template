import {combineReducers} from 'redux';
import common from './commonReducer';
import startup from './startupReducer';
import auth from './authReducer';

const reducers = combineReducers({common, startup, auth});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
