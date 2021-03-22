import * as React from 'react';
import * as numeral from 'numeral';
import * as moment from 'moment';

import './OrdersTable.css';

interface OrdersTableProps {
  orderHistory: any;
  viewOrder: any;
}

class OrdersTable extends React.Component<OrdersTableProps, {}> {
  render() {
    const { orderHistory, viewOrder } = this.props;

    return (
      <table className="table is-hoverable ordersTable">
        <thead>
          <tr>
            <th>My Orders</th>
            <th><span className="orderHistory-header">{orderHistory.size} Orders</span></th>
          </tr>
        </thead>
        
        <tbody>
          {
            orderHistory.map((order: any) =>
              <tr key={order.get('id')} onClick={() => viewOrder(order)}>
                <td>{moment(order.get('updatedAt')).format('MM/DD/YYYY')}</td>
                <td>{numeral(order.get('totalPrice')).format('$0,0.00')}</td>
                <td>{order.get('drinksCount')} Drinks</td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}

export default OrdersTable;
