import * as React from 'react';

import Sizes from './Sizes';
import DrinkTypes from './DrinkTypes';
import TeaType from './TeaType';
import Flavors from './Flavors';
import Toppings from './Toppings';
import AddDrink from './AddDrink';

import {
  drinkTypes,
  sizes,
  toppings as availableToppings,
  availableTeas
} from '../../config/drinks';
import './Menu.css';

interface MenuProps {
  addDrink: Function;
  updateDrink: Function;
  prevOrder: any;
}

interface MenuState {
  drink: string;
  teaType: string;
  flavor: string;
  size: string;
  price: number;
  isTea: boolean;
  chosenToppings: Array<string>
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
      isTea: false,
      chosenToppings: []
    };
  }

  componentDidMount() {
    const { prevOrder } = this.props;
    const { drink,
      isTea,
      teaType,
      flavor,
      size,
      price,
      chosenToppings = []
    } = prevOrder ? prevOrder : this.state;

    this.setState({ drink, isTea, teaType, flavor, size, price, chosenToppings });
  }

  handleDrinkTypeClick = (drink: string) => {
    const isTea = drink === 'smoothie' ? false : true;
    const teaType = drink === 'smoothie' ? 'none' : '';

    this.setState({ drink, isTea, teaType, flavor: '', chosenToppings: [] })
  }

  handleSizeClick = async (size: string) => {
    await this.setState(() => ({ size }));
    this.updatePrice();
  }

  handleAddDrink = () => {
    const { addDrink } = this.props;
    const { drink, isTea, teaType, flavor, size, price, chosenToppings } = this.state;

    addDrink({ drink, isTea, teaType, flavor, size, price, chosenToppings });
  }

  handleUpdateDrink = () => {
    const { updateDrink, prevOrder } = this.props;
    const { drink, isTea, teaType, flavor, size, chosenToppings, price } = this.state;

    updateDrink({ orderId: prevOrder.id, updateOrder: { drink, isTea, teaType, flavor, size, chosenToppings, price } });
  }

  updateDrinkProperty = ({ property, value }: { property: string, value: string }) => {
    this.setState(() => ({ [property]: value }));
  }

  updateToppings = async (newTopping: string, toppingPrice: number) => {
    const { chosenToppings } = this.state;

    const index = chosenToppings.indexOf(newTopping);

    if (index === -1) {
      chosenToppings.push(newTopping);
    } else {
      chosenToppings.splice(index, 1);
    }

    await this.setState(() => ({ chosenToppings }));
    this.updatePrice();
  }

  updatePrice = () => {
    const { size, chosenToppings } = this.state;

    const toppingsCost = chosenToppings.length > 0
      ? chosenToppings.reduce((acc, curr) => acc + availableToppings[curr].price, 0)
      : 0;

    const price = sizes[size].price + toppingsCost;

    this.setState(() => ({ price }));
  }

  render() {
    const { prevOrder } = this.props;
    const { drink, isTea, teaType, flavor, size, price, chosenToppings } = this.state;

    return (
      <div className="Menu">
        <Sizes onUpdate={this.handleSizeClick} sizes={sizes} chosenSize={size} />

        <hr />

        {
          size ?
          <DrinkTypes onUpdate={this.handleDrinkTypeClick} drinkTypes={drinkTypes} chosenDrinkType={drink} />
          :
          <div className="container center-container">
            <div className="notification preq-required">
              <div className="title">Select a Drink Type</div>
            </div>
          </div>
        }

        <hr />

        {
          drink ?
          <Flavors
            onUpdate={this.updateDrinkProperty}
            flavors={drink !== '' ? drinkTypes[drink].flavors : []}
            chosenFlavor={flavor}
          />
          :
          <div className="container center-container">
            <div className="notification preq-required">
              <div className="title">Select a Flavor</div>
            </div>
          </div>
        }

        <hr />

        {
          flavor ?
          <TeaType
            onUpdate={this.updateDrinkProperty}
            availableTeas={availableTeas}
            teaType={teaType}
            isTea={isTea}
          />
          :
          <div className="container center-container">
            <div className="notification preq-required">
              <div className="title">Select a Tea Type</div>
            </div>
          </div>
        }

        <hr />

        {
          (teaType && flavor) ?
          <Toppings
            onUpdate={this.updateToppings}
            availableToppings={availableToppings}
            chosenToppings={chosenToppings}
          />
          :
          <div className="container center-container">
            <div className="notification preq-required">
              <div className="title">Optional: Select Toppings</div>
            </div>
          </div>
        }

        <hr />

        <AddDrink
          isDisabled={(flavor === '' || teaType === '')}
          price={price}
          handleClick={prevOrder ? this.handleUpdateDrink : this.handleAddDrink}
        />
      </div>
    );
  }
}

export default Menu;
