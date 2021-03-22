import { combineReducers } from 'redux';

import bag from './bag/reducer';
import modals from './modals/reducer';
import user from './user/reducer';

const reducers = {
  bag,
  modals,
  user
};

export default combineReducers(reducers);
