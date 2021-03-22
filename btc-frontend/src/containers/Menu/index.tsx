import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const uuidv1 = require('uuid/v1');

import Menu from '../../components/Menu';

import { addDrink, updateDrink } from '../../redux/bag/actions';
import { getUserId } from '../../redux/user/selectors';

interface MenuProps {
  userId: string;
  history: any;
  setActiveModal: Function;
  addDrink: Function;
  updateDrink: Function;
  prevOrder: any;
}

class MenuContainer extends React.Component<MenuProps, {}> {
  addDrinkToBag = (order: any) => {
    const { userId, addDrink, history } = this.props;

    addDrink({ user: userId, order });

    history.push('/bag');
  }

  updateDrinkInBag = ({ orderId, updateOrder }: { orderId: string, updateOrder: any }) => {
    const { updateDrink, history } = this.props;

    updateDrink({ orderId, updateOrder });

    history.push('/bag');
  }

  render() {
    const { prevOrder } = this.props;

    return (
      <Menu
        addDrink={this.addDrinkToBag}
        updateDrink={this.updateDrinkInBag}
        prevOrder={prevOrder}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: getUserId(state) || uuidv1()
});

export default connect(mapStateToProps, {
  addDrink,
  updateDrink
})(withRouter(MenuContainer));
