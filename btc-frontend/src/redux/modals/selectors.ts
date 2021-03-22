import { createSelector } from 'reselect';

const getModals = (state: any) => state.modals;

export const getActiveModal = createSelector(
  getModals,
  modals => modals.get('activeModal')
);

export const getModalProps = createSelector(
  getModals,
  modals => modals.get('modalProps')
);
