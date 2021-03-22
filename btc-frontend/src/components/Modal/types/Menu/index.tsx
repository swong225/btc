import * as React from 'react';
import * as numeral from 'numeral';

import { drinkTypes, sizes } from '../../../../config/drinks';
import './Menu.css';

interface MenuProps {
  addDrink: Function;
  updateDrink: Function;
  handleClose: Function;
  prevOrder: any;
}

interface MenuState {
  drink: string;
  teaType: string;
  flavor: string;
  size: string;
  price: number;
  isTea: boolean;
}

class Menu extends React.Component<MenuProps, MenuState> {
  constructor() {
    super();
    this.state = {
      drink: '',
      teaType: '',
      flavor: '',
      size: '',
      price: 0,
      isTea: false
    };
  }

  componentDidMount() {
    const { prevOrder } = this.props;
    const { drink, isTea, teaType, flavor, size, price } = prevOrder ? prevOrder : this.state;

    this.setState({ drink, isTea, teaType, flavor, size, price })
  }

  onClose = (modal: string) => {
    const { handleClose } = this.props;

    handleClose(modal);
  }

  handleDrinkClick = (drink: string) => {
    const isTea = drink === 'smoothie' ? false : true;

    this.setState({ drink, isTea, teaType: '', flavor: '', size: '' })
  }

  handleTypeClick = (event: any) => {
    const { id } = event.target;

    this.setState(() => ({ teaType: id }));
  }

  handleFlavorClick = (flavor: string) => {
    this.setState(() => ({ flavor }));
  }

  handleSizeClick = (size: string, price: number) => {
    this.setState(() => ({ size, price }));
  }

  handleAddDrink = () => {
    const { addDrink } = this.props;
    const { drink, isTea, teaType, flavor, size, price } = this.state;

    addDrink({ drink, isTea, teaType, flavor, size, price });
  }

  handleUpdateDrink = () => {
    const { updateDrink, prevOrder } = this.props;
    const { drink, isTea, teaType, flavor, size, price } = this.state;

    updateDrink({ orderId: prevOrder.id, updateOrder: { drink, isTea, teaType, flavor, size, price } });
  }

  render() {
    const { prevOrder } = this.props;
    const { drink, isTea, teaType, flavor, size, price } = this.state;

    return (
      <div id="modal-container" className="modal animated fadeIn is-active">
        <div className="modal-background" onClick={() => this.onClose('')}/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">The Menu</p>
            <button className="delete" onClick={() => this.onClose('')} aria-label="close" />
          </header>
          <section className="modal-card-body">
            {
              Object.keys(drinkTypes).map((drinkType: any) => (
                <div
                  key={drinkTypes[drinkType].key}
                  className={`button ${drink === drinkTypes[drinkType].key ? 'is-success' : ''}`}
                  onClick={(() => this.handleDrinkClick(drinkTypes[drinkType].key))}
                >
                  {drinkTypes[drinkType].label}
                </div>
              ))
            }
          </section>
          <section className={`modal-card-body ${isTea ? '' : 'is-hidden'}`}>
            <div
              id="black"
              className={`button ${teaType === 'black' ? 'is-success' : ''}`}
              onClick={this.handleTypeClick}
            >
              Black Tea
            </div>
            <div
              id="green"
              className={`button ${teaType === 'green' ? 'is-success' : ''}`}
              onClick={this.handleTypeClick}
            >
              Green Tea
            </div>
          </section>
          <section className={`modal-card-body ${((isTea === true && teaType !== '') || isTea === false) ? '' : 'is-hidden'}`}>
            {
              drink !== '' ? drinkTypes[drink].flavors.map((drinkFlavor: string) => (
                <div
                  key={drinkFlavor}
                  className={`button ${flavor === drinkFlavor ? 'is-success' : ''}`}
                  onClick={(() => this.handleFlavorClick(drinkFlavor))}
                >
                  {drinkFlavor}
                </div>
              )) : null
            }
          </section>
          <section className={`modal-card-body ${flavor !== '' ? '' : 'is-hidden'}`}>
            {
              Object.keys(sizes).map((sizeOption: any) => (
                <div
                  key={sizes[sizeOption].key}
                  className={`button ${size === sizes[sizeOption].key ? 'is-success' : ''}`}
                  onClick={(() => this.handleSizeClick(sizes[sizeOption].key, sizes[sizeOption].price))}
                >
                  {sizes[sizeOption].label} ({sizes[sizeOption].oz}oz)
                </div>
              ))
            }
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-primary"
              onClick={prevOrder ? this.handleUpdateDrink : this.handleAddDrink}
              {...size === '' ? { disabled: true } : {}}
            >
              Add to Bag
            </button>
            <button className="button" onClick={() => this.onClose('')}>Cancel</button>
            <div className="container">
              <div className="content has-text-right">
                 <strong>Cost: {numeral(price.toString()).format('$0,0.00')}</strong>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Menu;
