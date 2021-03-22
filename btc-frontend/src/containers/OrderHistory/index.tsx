import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import OrdersTable from '../../components/OrdersTable';
import { retrieveAllBags } from '../../redux/user/actions';
import { setActiveModal } from '../../redux/modals/actions';
import { getUsername, getUserOrderHistory } from '../../redux/user/selectors';

import './OrderHistory.css';

interface OrderHistoryProps {
  username: string;
  retrieveAllBags: Function;
  orderHistory: any;
  setActiveModal: any;
}

class OrderHistory extends React.Component<OrderHistoryProps, any> {
  async componentWillMount() {
    const { retrieveAllBags, username } = this.props

    await retrieveAllBags(username);
  }
  
  viewOrder = (order: any) => {
    const { setActiveModal } = this.props;

    setActiveModal({
      modal: 'VIEW_ORDER',
      modalProps: {
        bagId: order.get('id'),
        bagCost: order.get('totalPrice')
      }
    });
  }

  render() {
    const { orderHistory = List() } = this.props;

    return (
      <div className="orderHistory-container">
        <div className="orderHistory-table">
          <OrdersTable
            orderHistory={orderHistory}
            viewOrder={this.viewOrder}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  username: getUsername(state),
  orderHistory: getUserOrderHistory(state)
});

export default connect(mapStateToProps, {
  retrieveAllBags,
  setActiveModal
})(OrderHistory);
