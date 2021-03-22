import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignupForm from '../../../components/Modal/types/SignupForm';
import { createUser } from '../../../redux/user/actions';
import { setActiveModal } from '../../../redux/modals/actions';
import { getBagId } from '../../../redux/bag/selectors';

interface SignupFormProps {
  setActiveModal: Function;
  handleSubmit: Function;
  validateValue: Function;
  createUser: Function;
  next: string;
  history: any;
  bagId: string;
}

class SignupFormContainer extends React.Component<SignupFormProps, any> {
  handleSetModal = (modal: string) => {
    this.props.setActiveModal({ modal });
  }

  handleSubmit = async (newUserProps: any) => {
    const { createUser, next, history, bagId } = this.props;

    const status = await createUser({ newUserProps, bagId });

    if (status === 200) {
      if (next) {
        history.push(next);
      }
      this.handleSetModal('');
    }
  };

  render() {
    return (
      <SignupForm
        handleSubmit={this.handleSubmit}
        handleSetModal={this.handleSetModal}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  bagId: getBagId(state)
});

export default connect(mapStateToProps, {
  setActiveModal,
  createUser
})(withRouter(SignupFormContainer));
