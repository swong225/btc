import * as React from 'react';
import * as numeral from 'numeral';

import './Purchased.css';

interface PurchasedProps {
  purchasedBag: any;
  username: number;
  handleSetModal: Function;
}

class Purchased extends React.Component<PurchasedProps, {}> {
  render() {
    const { handleSetModal, purchasedBag, username } = this.props;

    return (
      <div id="modal-container" className="modal animated fadeIn is-active">
        <div className="modal-background" onClick={() => handleSetModal('')}/>
        <div className="modal-card">
          <section className="modal-card-body">
            <div>Thanks <strong>{username}</strong> for your purchase of <strong>{numeral(purchasedBag.totalPrice).format('$0,0.00')}</strong>!</div>
          </section>

          <footer className="modal-card-foot float-buttons">
            <div className="control">
              <button className="button is-primary" onClick={() => handleSetModal('')}>
                Close
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Purchased;
