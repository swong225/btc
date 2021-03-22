import {
  ADD_TO_BAG,
  BULK_ADD_TO_BAG,
  UPDATE_ORDER,
  UPDATE_BAG,
  DELETE_FROM_BAG,
  SET_DRINK_UPDATING,
  RESET_DRINK_UPDATING,
  RETRIEVE_PAST_BAG_SUCCESS,
  REORDER_ITEMS_SUCCESS,
  CHECKOUT_SUCCESS,
  DELETE_BAG_ALL
} from './actions';
import { fromJS, List } from 'immutable';

const initialState = fromJS({
  id: '',
  totalCost: 0,
  drinks: [],
  viewBag: []
});

export default (state = initialState, action: any) => {
  const drinks = state.get('drinks');

  switch (action.type) {
    case SET_DRINK_UPDATING:
      return state.set('prevOrder', action.prevOrder);
    case RESET_DRINK_UPDATING:
      return state.set('prevOrder', undefined);
    case ADD_TO_BAG:
      return state.set('drinks', drinks.push(action.order));
    case BULK_ADD_TO_BAG:
      return state.set('drinks', action.orders);
    case UPDATE_ORDER:
      const { id, drink, isTea, teaType, flavor, chosenToppings, size, price, userId } = action.updatedOrder;
      const updatedOrder = { id, drink, isTea, teaType, flavor, chosenToppings, size, price, userId };
      const index = drinks.findIndex((order: any) => order.id === id);

      return state.setIn(['drinks', index], updatedOrder);
    case UPDATE_BAG:
      const { totalPrice, activeBagId } = action.payload;
      let newState = state;

      if (activeBagId) newState = newState.set('id', activeBagId);

      return newState.set('totalCost', totalPrice);
    case DELETE_FROM_BAG:
      const newDrinks = drinks.filterNot((order: any) => order.id === action.orderId)

      return state.set('drinks', newDrinks);
    case RETRIEVE_PAST_BAG_SUCCESS:
      return state.set('viewBag', action.payload);
    case DELETE_BAG_ALL:
    case CHECKOUT_SUCCESS:
      return initialState;
    case REORDER_ITEMS_SUCCESS:
      return action.payload.set('viewBag', List());
    default:
      return state;
  }
};
