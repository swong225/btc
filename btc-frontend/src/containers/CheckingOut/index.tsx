import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import toast from 'react-toastify';

import CheckingOut from '../../components/CheckingOut';

import { login } from '../../redux/user/actions';
import { setActiveModal } from '../../redux/modals/actions';
import { checkout } from '../../redux/bag/actions';
import { getBagId } from '../../redux/bag/selectors';

interface CheckingOutProps {
  setActiveModal: Function;
  history: any;
  bagId: string;
  checkout: Function;
  login: Function;
}

class CheckingOutContainer extends React.Component<CheckingOutProps, {}> {
  handleSetModal = (modal: string) => {
    this.props.setActiveModal({
      modal,
      modalProps: { 'next': '/confirm' }
    });
  }

  login = async ({ username, password }: { username: string, password: string }) => {
    const { login, history, bagId } = this.props;

    const { status } = await login({ username, password, bagId });

    if (status === 200) {
      history.push('/confirm');
    } else {
      toast.error('Error Logging In');
    }
  };

  render() {
    return (
      <CheckingOut
        handleSetModal={this.handleSetModal}
        login={this.login}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  bagId: getBagId(state)
});

export default connect(mapStateToProps, {
  setActiveModal,
  checkout,
  login
})(withRouter(CheckingOutContainer));
