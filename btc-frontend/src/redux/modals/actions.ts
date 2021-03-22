export const SET_ACTIVE_MODAL = 'MODAL/SET_ACTIVE_MODAL';

export const setActiveModal = ({ modal, modalProps = {} }: { modal: string, modalProps?: any }) => (
  dispatch: Function,
  getState: {}
) => {
  dispatch({ type: SET_ACTIVE_MODAL, modal, modalProps });
};
