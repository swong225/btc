import axios from 'axios';
import { List, fromJS } from 'immutable';

import { BACKEND_URL } from '../../config';
import { LOGIN_SUCCESS } from '../user/actions';

export const ADD_TO_BAG = 'btc/bag/ADD_TO_BAG';
export const BULK_ADD_TO_BAG = 'btc/bag/BULK_ADD_TO_BAG';
export const ADD_TO_BAG_SUCCESS = 'btc/bag/ADD_TO_BAG_SUCCESS';
export const ADD_TO_BAG_FAILURE = 'btc/bag/ADD_TO_BAG_FAILURE';

export const RETRIEVE_BAG = 'btc/bag/RETRIEVE_BAG';
export const RETRIEVE_BAG_SUCCESS = 'btc/bag/RETRIEVE_BAG_SUCCESS';
export const RETRIEVE_BAG_FAILURE = 'btc/bag/RETRIEVE_BAG_FAILURE';

export const RETRIEVE_PAST_BAG = 'btc/user/RETRIEVE_BAG_SUCCESS';
export const RETRIEVE_PAST_BAG_SUCCESS = 'btc/user/RETRIEVE_PAST_BAG_SUCCESS';
export const RETRIEVE_PAST_BAG_FAILURE = 'btc/user/RETRIEVE_PAST_BAG_FAILURE';

export const UPDATE_BAG = 'btc/bag/UPDATE_BAG';
export const UPDATE_ORDER = 'btc/bag/UPDATE_ORDER';
export const UPDATE_ORDER_SUCCESS = 'btc/bag/UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAILURE = 'btc/bag/UPDATE_ORDER_FAILURE';

export const DELETE_FROM_BAG = 'btc/bag/DELETE_FROM_BAG';
export const DELETE_FROM_BAG_SUCCESS = 'btc/bag/DELETE_FROM_BAG_SUCCESS';
export const DELETE_FROM_BAG_FAILURE = 'btc/bag/DELETE_FROM_BAG_FAILURE';
export const DELETE_BAG_ALL = 'btc/bag/DELETE_BAG_ALL';

export const CHECKOUT = 'btc/bag/CHECKOUT';
export const CHECKOUT_SUCCESS = 'btc/bag/CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'btc/bag/CHECKOUT_FAILURE';

export const SET_DRINK_UPDATING = 'btc/bag/SET_DRINK_UPDATING';
export const RESET_DRINK_UPDATING = 'btc/bag/RESET_DRINK_UPDATING';

export const REORDER_ITEMS = 'btc/bag/REORDER_ITEMS';
export const REORDER_ITEMS_SUCCESS = 'btc/bag/REORDER_ITEMS_SUCCESS';
export const REORDER_ITEMS_FAILURE = 'btc/bag/REORDER_ITEMS_FAILURE';

export const addDrink = ({
  user = '',
  order
}: {
  user?: string;
  order: any;
}) => async (dispatch: Function, getState: {}) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${BACKEND_URL}/order/add`,
      data: { user, order }
    });

    const { createdOrder, totalPrice, token, userResult, activeBagId } = data;
    
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userResult));
      dispatch({ type: LOGIN_SUCCESS, user: fromJS(userResult) });
    }

    dispatch({ type: UPDATE_BAG, payload: { totalPrice, activeBagId } });
    dispatch({ type: ADD_TO_BAG, order: createdOrder });
    dispatch({ type: ADD_TO_BAG_SUCCESS });
    return 200;
  } catch (err) {
    dispatch({ type: ADD_TO_BAG_FAILURE });
    return 400;
  }
};

export const drinkToUpdate = (prevOrder: any) => (
  dispatch: Function,
  getState: {}
) => {
  dispatch({ type: SET_DRINK_UPDATING, prevOrder });
};

export const resetPrevOrder = () => (dispatch: Function, getState: {}) => {
  dispatch({ type: RESET_DRINK_UPDATING });
};

export const updateDrink = ({
  orderId,
  updateOrder
}: {
  orderId: string;
  updateOrder: any;
}) => async (dispatch: Function, getState: {}) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${BACKEND_URL}/order/update`,
      data: { orderId, updateOrder }
    });

    const { updatedOrder, totalPrice } = data;

    dispatch({ type: UPDATE_ORDER, updatedOrder });
    dispatch({ type: UPDATE_BAG, payload: { totalPrice } });
    dispatch({ type: RESET_DRINK_UPDATING });
    dispatch({ type: UPDATE_ORDER_SUCCESS });
    return 200;
  } catch (err) {
    dispatch({ type: UPDATE_ORDER_FAILURE });
    return 400;
  }
};

export const removeDrink = ({ orderId }: { orderId: string }) => async (
  dispatch: Function,
  getState: {}
) => {
  try {
    const { data } = await axios({
      method: 'delete',
      url: `${BACKEND_URL}/order/delete`,
      data: { orderId }
    });

    const { deleteStatus, totalPrice } = data;

    if (deleteStatus === 0) throw Error('Error removing drink');

    dispatch({ type: DELETE_FROM_BAG, orderId });
    dispatch({ type: UPDATE_BAG, payload: { totalPrice } });
    dispatch({ type: DELETE_FROM_BAG_SUCCESS });
    return 200;
  } catch (err) {
    dispatch({ type: DELETE_FROM_BAG_FAILURE });
    return 400;
  }
};

export const checkout = ({ userId, username, phone }: { userId: string, username: string, phone: string }) => async (
  dispatch: Function,
  getState: {}
) => {
  try {
    dispatch({ type: CHECKOUT });

    const { data } = await axios({
      method: 'post',
      url: `${BACKEND_URL}/bag/checkout`,
      data: { userId, username, phone }
    });

    const { newBagId }  = data;

    dispatch({ type: CHECKOUT_SUCCESS, payload: newBagId });
    return { data };
  } catch (err) {
    dispatch({ type: CHECKOUT_FAILURE });
    return 400;
  }
};

export const retrieveActiveBag = (userId: string) => async (
  dispatch: Function,
  getState: {}
) => {
  try {
    dispatch({ type: RETRIEVE_BAG });

    const { data } = await axios({
      method: 'get',
      url: `${BACKEND_URL}/bag/activeBag`,
      params: { userId }
    });

    const { activeBag, activeBagId } = data;
    const { orders, totalPrice } = activeBag;

    dispatch({ type: UPDATE_BAG, payload: { totalPrice, activeBagId } });
    dispatch({ type: BULK_ADD_TO_BAG, orders: List(orders) });
    dispatch({ type: RETRIEVE_BAG_SUCCESS, payload: activeBagId });
    return 200;
  } catch (err) {
    dispatch({ type: RETRIEVE_BAG_FAILURE });
    return 400;
  }
};

export const retrieveOrderedBag = (bagId: string) => async (
  dispatch: Function,
  getState: {}
) => {
  try {
    dispatch({ type: RETRIEVE_PAST_BAG });

    const { data } = await axios({
      method: 'get',
      url: `${BACKEND_URL}/bag/orderedBag`,
      params: { bagId }
    });

    dispatch({ type: RETRIEVE_PAST_BAG_SUCCESS, payload: fromJS(data) });
    return 200;
  } catch (err) {
    dispatch({ type: RETRIEVE_PAST_BAG_FAILURE });
    return 400;
  }
};

export const deleteBag = () => async (dispatch: Function, getState: {}) => {
  try {
    dispatch({ type: DELETE_BAG_ALL });
    dispatch({ type: DELETE_FROM_BAG_SUCCESS });
    return 200;
  } catch (err) {
    dispatch({ type: DELETE_FROM_BAG_FAILURE });
    return 400;
  }
};

// add the reordered Bag items to the current bag
export const addReorderedItems = (
  { user, bagId }: { user: string, bagId: string }
) => async (dispatch: Function, getState: {}) => {
  try {
    dispatch({ type: REORDER_ITEMS });

    const { data } = await axios({
      method: 'post',
      url: `${BACKEND_URL}/bag/addReorderedItems`,
      data: { user, bagId }
    });

    dispatch({ type: REORDER_ITEMS_SUCCESS, payload: fromJS(data) });
    return 200;
  } catch (err) {
    dispatch({ type: REORDER_ITEMS_FAILURE });
    return 400;
  }
};
