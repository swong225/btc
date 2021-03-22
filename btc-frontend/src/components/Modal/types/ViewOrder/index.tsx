import React from 'react';
import numeral from 'numeral';

import BagContent from './../../../BagItem/BagContent';

import './ViewOrder.css';

interface ViewOrderProps {
  handleClose: Function;
  bagInfo: any;
  bagCost: number;
  handleReorder: any;
}

class ViewOrder extends React.Component<ViewOrderProps, {}> {
  componentDidMount() {
    document.addEventListener('keyup', this.closeModal);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keyup', this.closeModal);
  }
  
  closeModal = (e: any) => {
    const { handleClose } = this.props;

    if (e.type === 'keyup' && e.keyCode !== 27) return;
    handleClose('');
  }

  render() {
    const { bagInfo, bagCost, handleReorder } = this.props;

    return (
      <div id="modal-container" className="modal animated fadeIn is-active">
        <div className="modal-background" onClick={this.closeModal}/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Past Order</p>
            <button className="delete" onClick={this.closeModal} aria-label="close" />
          </header>

          <section className="modal-card-body">
            <div className="columns is-multiline">
              {
                bagInfo.map((drink: any, i: number) => (
                  <div className="column is-half" key={i}>
                    <div className="card">
                      <div className="card-content">
                        <BagContent drinkOrder={drink.toJS()} />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>

          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={handleReorder}>
              Reorder
            </button>
            <button className="button" onClick={this.closeModal}>Cancel</button>
            <div className="container">
              <div className="content has-text-right">
                 <strong>Cost: {numeral(bagCost).format('$0,0.00')}</strong>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default ViewOrder;
