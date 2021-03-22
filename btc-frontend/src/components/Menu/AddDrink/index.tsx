import React from 'react';
import numeral from 'numeral';

import '../Menu.css';

interface AddDrinkProps {
  isDisabled: boolean;
  price: number;
  handleClick: any;
}

class AddDrink extends React.Component<AddDrinkProps, {}> {
  handleAddDrink = () => {
    const { isDisabled, handleClick } = this.props;

    if (isDisabled) return;

    handleClick();
  }

  render() {
    const { price, isDisabled } = this.props;

    return (
      <div className="container">
        <a onClick={this.handleAddDrink}>
          <div className={`notification confirm-container ${isDisabled ? "is-danger no-cursor" : "is-success"}`}>
            <b>Add To Bag</b>
            <span className="content">
              <strong>Cost: {numeral(price.toString()).format('$0,0.00')}</strong>
            </span>
          </div>
        </a>
      </div>
    )
  }
}

export default AddDrink;
