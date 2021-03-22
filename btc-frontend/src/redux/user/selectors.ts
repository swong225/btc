import { createSelector } from 'reselect';

const getUser = (state: any) => state.user;

export const getData = createSelector(
  getUser,
  user => user.get('data')
);

export const getUserId = createSelector(
  getData,
  data => data.get('id')
);

export const getUsername = createSelector(
  getData,
  data => data.get('username')
);

export const getUserOrderHistory = createSelector(
  getUser,
  user => user.get('orderHistory')
);
