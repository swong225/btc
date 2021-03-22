import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RETRIEVE_ORDER_HISTORY_SUCCESS,
  CREATE_SUCCESS,
  UPDATE_SUCCESS
} from './actions';
import { RETRIEVE_BAG_SUCCESS } from '../bag/actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  isLoggingIn: false,
  data: {
    activeBagId: '',
    id: '',
    username: '',
    phone: '',
    createdAt: '',
    updatedAt: ''
  },
  orderHistory: []
});

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return state.set('isLoggingIn', true);
    case CREATE_SUCCESS:
    case UPDATE_SUCCESS:
    case LOGIN_SUCCESS:
      return state.set('isLoggingIn', false).set('data', action.user);
    case LOGIN_FAILURE:
      return state.set('isLoggingIn', false);
    case LOGOUT:
      return initialState;
    case RETRIEVE_ORDER_HISTORY_SUCCESS:
      return state.set('orderHistory', action.payload)
    case RETRIEVE_BAG_SUCCESS:
      return state.setIn(['data', 'activeBagId'], action.payload);
    default:
      return state;
  }
};
