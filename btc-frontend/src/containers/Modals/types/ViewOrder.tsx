import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ViewOrder from '../../../components/Modal/types/ViewOrder';
import { setActiveModal } from '../../../redux/modals/actions';
import { retrieveOrderedBag, addReorderedItems } from '../../../redux/bag/actions';
import { getUsername } from '../../../redux/user/selectors';
import { getViewBag } from '../../../redux/bag/selectors';

interface ViewOrderProps {
  user: string;
  setActiveModal: Function;
  retrieveOrderedBag: Function;
  bagId: any; // the order to update (passed via modalProps)
  bagInfo: any;
  bagCost: number;
  handleReorder: Function;
  addReorderedItems: Function;
  history: any;
}

class ViewOrderModal extends React.Component<ViewOrderProps, {}> {
  async componentWillMount() {
    const { bagId, retrieveOrderedBag } = this.props;

    await retrieveOrderedBag(bagId);
  }

  handleClose = (modal: string) => {
    this.props.setActiveModal({ modal });
  }
  
  handleReorder = async () => {
    const { user, bagId, addReorderedItems, history } = this.props;

    const result = await addReorderedItems({ user, bagId });
    
    if (result === 200) {
      this.handleClose('')
      history.push('/bag');
    };
  }

  render() {
    const { bagInfo, bagCost } = this.props;

    return (
      <ViewOrder
        handleClose={this.handleClose}
        bagInfo={bagInfo}
        bagCost={bagCost}
        handleReorder={this.handleReorder}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getUsername(state),
  bagInfo: getViewBag(state)
});

export default connect(mapStateToProps, {
  setActiveModal,
  retrieveOrderedBag,
  addReorderedItems
})(withRouter(ViewOrderModal));
