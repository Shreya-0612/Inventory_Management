import { combineReducers } from 'redux';
import loginReducer from './reducer';
import inventoryReducer from './inventoryReducer';

const rootReducer = combineReducers({
  loginReducer,
  inventoryReducer
});

export default rootReducer;