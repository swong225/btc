import * as React from 'react';
import { connect } from 'react-redux';

import Purchased from '../../../components/Modal/types/Purchased';

import { setActiveModal } from '../../../redux/modals/actions';

interface PurchasedProps {
  purchasedBag: any;
  username: number;
  setActiveModal: Function;
}

class PurchasedModal extends React.Component<PurchasedProps, any> {
  handleSetModal = (modal: string) => {
    this.props.setActiveModal({ modal });
  }

  render() {
    const { purchasedBag, username } = this.props;

    return (
      <Purchased
        handleSetModal={this.handleSetModal}
        purchasedBag={purchasedBag}
        username={username}
      />
    );
  }
}

export default connect(null, {
  setActiveModal
})(PurchasedModal);
