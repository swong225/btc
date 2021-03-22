import { createSelector } from 'reselect';

export const getPrevOrder = (state: any) => state.bag.get('prevOrder');

export const getBag = (state: any) => state.bag.get('drinks');

export const getBagId = (state: any) => state.bag.get('id');

export const getViewBag = (state: any) => state.bag.get('viewBag');

export const getTotalBagCost = (state: any) => state.bag.get('totalCost');

export const bagCount = createSelector(
  getBag,
  bag => bag.size
);
