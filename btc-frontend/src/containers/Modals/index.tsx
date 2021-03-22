import * as React from 'react';
import { connect } from 'react-redux';

import Menu from './types/Menu';
import Login from './types/Login';
import Signup from './types/Signup';
import Purchased from './types/Purchased';
import CheckoutAsUser from './types/CheckoutAsUser';
import ViewOrder from './types/ViewOrder';

import { getActiveModal, getModalProps } from '../../redux/modals/selectors';

interface ModalsProps {
  activeModal: string;
  modalProps: any;
}

class Modals extends React.Component<ModalsProps, {}> {
  render() {
    const { activeModal, modalProps } = this.props;
    const showMenu = activeModal === 'MENU' ? true : false;
    const showLogin = activeModal === 'LOGIN' ? true : false;
    const showSignup = activeModal === 'SIGNUP' ? true : false;
    const showPurchased = activeModal === 'PURCHASED' ? true : false;
    const showCheckoutAsUser = activeModal === 'CHECKOUT_AS_USER' ? true : false;
    const viewOrder = activeModal === 'VIEW_ORDER' ? true : false;

    return (
      <div>
        {showMenu ? <Menu {...modalProps} /> : null}
        {showLogin ? <Login {...modalProps} /> : null}
        {showSignup ? <Signup {...modalProps} /> : null}
        {showPurchased ? <Purchased {...modalProps} /> : null}
        {showCheckoutAsUser ? <CheckoutAsUser {...modalProps} /> : null}
        {viewOrder ? <ViewOrder {...modalProps} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  activeModal: getActiveModal(state),
  modalProps: getModalProps(state)
});

export default connect(mapStateToProps, {})(Modals);
