import * as React from 'react';
import { connect } from 'react-redux';

import Login from '../../../components/Modal/types/Login';

import { setActiveModal } from '../../../redux/modals/actions';
import { retrieveActiveBag } from '../../../redux/bag/actions';
import { login } from '../../../redux/user/actions';
import { getBagId } from '../../../redux/bag/selectors';

interface LoginProps {
  username: string;
  password: string;
  user: any;
  bagId: string;
  isLoggingIn: Boolean;
  setActiveModal: Function;
  retrieveActiveBag: Function;
  handleUpdate: Function;
  handleSubmit: Function;
  login: Function;
}

class LoginModal extends React.Component<LoginProps, any> {
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
    const { username, password } = this.state;
    const { login, retrieveActiveBag, bagId } = this.props;

    if (event.type === 'click' || event.key === 'Enter') {
      const { status, userId } = await login({ username, password, bagId });

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
        label={'Login'}
        isCheckout={false}
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
  isLoggingIn: state.user.isLoggingIn,
  bagId: getBagId(state)
});

export default connect(mapStateToProps, {
  setActiveModal,
  login,
  retrieveActiveBag
})(LoginModal);
