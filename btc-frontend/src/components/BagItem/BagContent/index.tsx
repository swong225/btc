import * as React from 'react';
import * as numeral from 'numeral';

import drinks from '../../../config/drinks';

interface BagContentProps {
  drinkOrder: any;
}

class BagContent extends React.Component<BagContentProps, {}> {
  render() {
    const { drinkOrder } = this.props;
    const { id, drink, teaType, flavor, size, chosenToppings = [], price } = drinkOrder;

    const displayToppings = chosenToppings.map((topping: any) => drinks.toppings[topping].label);

    return (
      <div className="content" key={id}>
        <div>DrinkType: {drink ? drinks.drinkTypes[drink].label : 'Not Selected'}</div>
        <div>Tea Type: {teaType ? drinks.availableTeas[teaType].label : 'Not Selected'}</div>
        <div>Flavor: {flavor ? drinks.drinkTypes[drink].flavors.find((x: any) => x.key === flavor).label :'Not Selected'}</div>
        <div>Size: {size ? drinks.sizes[size].label : 'Not Selected'}</div>
        <div>{`Topping(s): ${displayToppings.join(', ')}`}</div>
        <div>Price: <b>{numeral(price.toString()).format('$0,0.00')}</b></div>
      </div>
    );
  }
}

export default BagContent;
