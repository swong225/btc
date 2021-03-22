import { SET_ACTIVE_MODAL } from './actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  activeModal: '',
  modalProps: {}
});

export default(state = initialState, payload: any) => {
  switch (payload.type) {
    case SET_ACTIVE_MODAL:
      return state.set('activeModal', payload.modal).set('modalProps', payload.modalProps);
    default:
      return state;
  }
};
