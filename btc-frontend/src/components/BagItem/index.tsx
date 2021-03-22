import * as React from 'react';

import BagContent from './BagContent';

import './BagItems.css';

interface BagItemProps {
  orderNum: number;
  drinkOrder: any;
  editDrink: Function;
  removeDrink: Function;
}

class BagItem extends React.Component<BagItemProps, {}> {
  render() {
    const { drinkOrder, orderNum, editDrink, removeDrink } = this.props;
    const { id: orderId } = drinkOrder;

    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Order #{orderNum}
          </p>
          <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>

        <div className="card-content">
          <BagContent drinkOrder={drinkOrder} />
        </div>

        <footer className="card-footer">
          <a href="#" className="card-footer-item" onClick={() => editDrink({ drinkOrder })}>Edit</a>
          <a href="#" className="card-footer-item" onClick={() => removeDrink(orderId)}>Delete</a>
        </footer>
      </div>
    );
  }
}

export default BagItem;
