import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import Confirm from '../../components/Confirm';

import { setActiveModal } from '../../redux/modals/actions';
import { checkout } from '../../redux/bag/actions';
import { getData, getUserId } from '../../redux/user/selectors';
import { getTotalBagCost, bagCount } from '../../redux/bag/selectors';

import { validatePhone } from '../../utils/validate';

interface ConfirmProps {
  userId: string;
  totalCost: number;
  bagCount: number;
  userData: any;
  setActiveModal: Function;
  history: any;
  checkout: Function;
}

interface ConfirmState {
  username: string;
  phone: string;
}

class ConfirmContainer extends React.Component<ConfirmProps, ConfirmState> {
  constructor() {
    super();
    this.state = {
      username: '',
      phone: ''
    };
  }

  async componentWillMount() {
    const { userData } = this.props;
    const username = userData.get('username');
    const phone = userData.get('phone');

    this.setState({
      username: username ? username : '',
      phone: phone ? phone : ''
    })
  }

  handleSetModal = (modal: string) => {
    this.props.setActiveModal({ modal });
  }

  handleUpdate = (event: any) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async () => {
    const { setActiveModal, history, checkout, userId } = this.props;
    const { username, phone } = this.state;

    const { data } = await checkout({ userId, username, phone });

    if (data) {
      // show successful checkout modal and redirect to main page
      setActiveModal({ modal: 'PURCHASED', modalProps: data });
      history.push('/');
    } else {
      toast.error('Sorry, there was an error during checkout');
    }
  };

  render() {
    const { totalCost, bagCount } = this.props;
    const { username, phone } = this.state;

    return (
      <Confirm
        username={username}
        phone={phone}
        validName={!!username}
        validPhone={validatePhone(phone)}
        handleUpdate={this.handleUpdate}
        handleSubmit={this.handleSubmit}
        totalCost={totalCost}
        bagCount={bagCount}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: getUserId(state),
  userData: getData(state),
  totalCost: getTotalBagCost(state),
  bagCount: bagCount(state)
});

export default connect(mapStateToProps, {
  setActiveModal,
  checkout
})(withRouter(ConfirmContainer));
