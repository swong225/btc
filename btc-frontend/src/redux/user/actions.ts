import axios from 'axios';
import { fromJS } from 'immutable';
import { toast } from 'react-toastify';

import { BACKEND_URL } from '../../config';
import { DELETE_BAG_ALL } from '../bag/actions';

export const CREATE = 'btc/user/CREATE';
export const CREATE_SUCCESS = 'btc/user/CREATE_SUCCESS';
export const CREATE_FAILURE = 'btc/user/CREATE_FAILURE';

export const UPDATE = 'btc/user/UPDATE';
export const UPDATE_SUCCESS = 'btc/user/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'btc/user/UPDATE_FAILURE';

export const LOGIN = 'btc/user/LOGIN';
export const LOGIN_SUCCESS = 'btc/user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'btc/user/LOGIN_FAILURE';

export const LOGOUT = 'btc/user/LOGOUT';
export const LOGOUT_SUCCESS = 'btc/user/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'btc/user/LOGOUT_FAILURE';

export const RETRIEVE_ORDER_HISTORY = 'btc/user/RETRIEVE_ORDER_HISTORY';
export const RETRIEVE_ORDER_HISTORY_SUCCESS = 'btc/user/RETRIEVE_ORDER_HISTORY_SUCCESS';
export const RETRIEVE_ORDER_HISTORY_FAILURE = 'btc/user/RETRIEVE_ORDER_HISTORY_FAILURE';

export const createUser = ({ newUserProps, bagId }: {newUserProps: any, bagId: string}) => async (
  dispatch: Function,
  getState: {}
) => {
  // create a new user with the newUserProps
  // if there is a temp user, delete the temp user via temp userId
  // associate the temp bagId with the new user to be created
  try {
    dispatch({ type: CREATE });
    const { data } = await axios({
      method: 'post',
      url: `${BACKEND_URL}/user/signup`,
      data: {
        ...newUserProps,
        bagId
      }
    });

    const { token, user } = data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    toast.success('User Created!');
    dispatch({ type: CREATE_SUCCESS, user: fromJS(user) });
    return 200;
  } catch (err) {
    toast.error(err.response.data);

    dispatch({ type: CREATE_FAILURE });
    return 400;
  }
};

export const editUser = (userData: any) => async (
  dispatch: Function,
  getState: {}
) => {
  try {
    dispatch({ type: UPDATE });
    const { data } = await axios({
      method: 'post',
      url: `${BACKEND_URL}/user/edit`,
      data: {
        ...userData
      }
    });
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.updatedUser));

    dispatch({ type: UPDATE_SUCCESS, user: fromJS(data.updatedUser) });
    toast.success('Details Updated!');
    return 200;
  } catch (err) {
    toast.error(err.response.data);
    dispatch({ type: UPDATE_FAILURE });
    return 400;
  }
};

export const refreshUser = (userId: string) => async (
  dispatch: Function,
  getState: {}
) => {
  try {
    dispatch({ type: UPDATE });
    const { data } = await axios({
      method: 'get',
      url: `${BACKEND_URL}/user/refresh`,
      params: { userId }
    });

    dispatch({ type: UPDATE_SUCCESS, user: fromJS(data.user) });
    return 200;
  } catch (err) {
    toast.error('Error refreshing User');
    dispatch({ type: UPDATE_FAILURE });
    return 400;
  }
};

export const login = ({ username, password, bagId }: { username: string, password: string, bagId: string }) => async (
  dispatch: Function,
  getState: {}
) => {
  try {
    dispatch({ type: LOGIN });
    const { data } = await axios({
      method: 'post',
      url: `${BACKEND_URL}/user/login`,
      data: { username, password, bagId }
    });

    const { token, user } = data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    toast.success('Signed In!');
    dispatch({ type: LOGIN_SUCCESS, user: fromJS(user) });
    return { status: 200, userId: user.id };
  } catch (err) {
    toast.error('Error Signing In');
    dispatch({ type: LOGIN_FAILURE });
    return 400;
  }
};

export const logout = () => async (dispatch: Function, getState: {}) => {
  try {
    dispatch({ type: LOGOUT });

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: DELETE_BAG_ALL });

    toast.success('Signed Out!');
    return 200;
  } catch (err) {
    toast.error('Error Signing Out');
    dispatch({ type: LOGOUT_FAILURE });
    return 400;
  }
};

export const retrieveAllBags = (username: string) => async (dispatch: Function, getState: {}) => {
  try {
    dispatch({ type: RETRIEVE_ORDER_HISTORY });

    const { data } = await axios({
      method: 'get',
      url: `${BACKEND_URL}/user/allBags`,
      params: { username }
    });

    dispatch({ type: RETRIEVE_ORDER_HISTORY_SUCCESS, payload: fromJS(data) });
    return 200;
  } catch (err) {
    dispatch({ type: RETRIEVE_ORDER_HISTORY_FAILURE });
    return 400;
  }
};
