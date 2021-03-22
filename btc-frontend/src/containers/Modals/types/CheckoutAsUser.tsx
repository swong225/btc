import * as React from 'react';
import { connect } from 'react-redux';

import Login from '../../../components/Modal/types/Login';

import { setActiveModal } from '../../../redux/modals/actions';
import { retrieveActiveBag } from '../../../redux/bag/actions';
import { login } from '../../../redux/user/actions';
import { getUserId } from '../../../redux/user/selectors';

interface CheckoutAsUserProps {
  username: string;
  userId: string;
  password: string;
  user: any;
  isLoggingIn: Boolean;
  setActiveModal: Function;
  retrieveActiveBag: Function;
  handleUpdate: Function;
  handleSubmit: Function;
  login: Function;
}

class CheckoutAsUserModal extends React.Component<CheckoutAsUserProps, any> {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSetModal = (modal: string) => {
    this.props.setActiveModal({ modal });
  }

  handleUpdate = (event: any) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async (event: any) => {
    const { username, userId, password } = this.state;
    const { login, retrieveActiveBag } = this.props;

    if (event.type === 'click' || event.key === 'Enter') {
      const status = await login(username, password);

      if (status === 200) {
        await retrieveActiveBag(userId);
        this.handleSetModal('');
      }
    }
    else if (event.key === 'Escape') {
      this.handleSetModal('');
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <Login
        label={'Checkout'}
        isCheckout
        username={username}
        password={password}
        handleUpdate={this.handleUpdate}
        handleSubmit={this.handleSubmit}
        handleSetModal={this.handleSetModal}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user.data,
  userId: getUserId(state),
  isLoggingIn: state.user.isLoggingIn
});

export default connect(mapStateToProps, {
  setActiveModal,
  login,
  retrieveActiveBag
})(CheckoutAsUserModal);
