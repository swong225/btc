import * as React from 'react';
import * as numeral from 'numeral';
import { LinkContainer } from 'react-router-bootstrap';

import './Bag.css';

interface BagProps {
  username: string;
  bagList: Array<any>;
  totalCost: number;
  handleModalClick: Function;
}

class Bag extends React.Component<BagProps, {}> {
  render() {
    const { username, bagList, totalCost } = this.props;

    return (
      <div className="container bag-container">
        <div className="columns columns-container">
          <div className="column is-three-quarter">
          {
            bagList.length > 0 ?
              <div className="columns is-multiline">
                {
                  bagList.map((bagItem, i) =>
                    <div className="column is-one-third" key={i}>
                      {bagItem}
                    </div>)
                }
              </div>
            : <div>Your Bag is empty, try filling it up!</div>
          }
          </div>

          <div className="column is-one-quarter bag-sidebar">
            <div className="subtotal-container">
              <strong>Subtotal ({bagList.length} {bagList.length === 1 ? "item" : "items"})</strong>
              : <strong className="cost-style">{numeral(totalCost).format('$0,0.00')}</strong>
            </div>
            <LinkContainer to="/">
              <button className="button is-success">
                Add Another Drink!
              </button>
            </LinkContainer>
            <br />
            <br />
            { username ?
              <div>
                <LinkContainer to="/confirm">
                  <button
                    className="button is-warning"
                    {...bagList.length > 0 ? {} : { disabled: true }}
                  >
                    Checkout!
                  </button>
                </LinkContainer>
              </div>
              :
              <div>
                <LinkContainer to="/checkingout">
                  <button
                    className="button is-warning"
                    {...bagList.length > 0 ? {} : { disabled: true }}
                  >
                    Checkout!
                  </button>
                </LinkContainer>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Bag;
