import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Menu from '../../../components/Modal/types/Menu';

import { setActiveModal } from '../../../redux/modals/actions';
import { addDrink, updateDrink } from '../../../redux/bag/actions';
import { getUsername } from '../../../redux/user/selectors';

interface MenuProps {
  user: string;
  history: any;
  setActiveModal: Function;
  addDrink: Function;
  updateDrink: Function;
  drinkOrder: any; // the order to update (passed via modalProps)
}

class MenuModal extends React.Component<MenuProps, {}> {
  handleClose = (modal: string) => {
    this.props.setActiveModal({ modal });
  }

  addDrinkToBag = (order: any) => {
    const { user = '', addDrink, setActiveModal, history } = this.props;

    addDrink({ user, order });

    history.push('/bag');
    setActiveModal({ modal: '' });
  }

  updateDrinkInBag = ({ orderId, updateOrder }: { orderId: string, updateOrder: any }) => {
    const { updateDrink, setActiveModal } = this.props;

    updateDrink({ orderId, updateOrder });

    setActiveModal({ modal: '' });
  }

  render() {
    const { drinkOrder: prevOrder } = this.props;

    return (
      <Menu
        addDrink={this.addDrinkToBag}
        updateDrink={this.updateDrinkInBag}
        handleClose={this.handleClose}
        prevOrder={prevOrder}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getUsername(state)
});

export default connect(mapStateToProps, {
  addDrink,
  updateDrink,
  setActiveModal
})(withRouter(MenuModal));
