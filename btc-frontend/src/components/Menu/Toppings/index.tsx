import * as React from 'react';
import numeral from 'numeral';

import images from '../../../assets/images';

interface ToppingsProps {
  chosenToppings: Array<string>;
  availableToppings: any;
  onUpdate: any;
}

class Toppings extends React.Component<ToppingsProps, {}> {
  render() {
    const { chosenToppings, availableToppings = {}, onUpdate } = this.props;

    return (
      <div className="container">
        <div className="tile is-ancestor wrap-container">
          <div className="tile is-vertical is-parent is-12">
              <div className="tile notification center-text">
                  <div className="title">Optional: Select Toppings</div>
              </div>
          </div>
          {
            Object.keys(availableToppings).map((toppingChoice: any) => (
              <div className="tile is-vertical is-4" key={availableToppings[toppingChoice].key}>
                <a
                  className="tile-text"
                  onClick={(() => onUpdate(availableToppings[toppingChoice].key, availableToppings[toppingChoice].price))}
                >
                  <div className="tile is-parent">
                    <article className={`tile is-child notification ${chosenToppings.indexOf(availableToppings[toppingChoice].key) !== -1 ? 'is-success' : ''}`}>
                      <p className="title">{availableToppings[toppingChoice].label}</p>
                      <p className="subtitle">{numeral(availableToppings[toppingChoice].price.toString()).format('$0,0.00')}</p>
                      <figure className="image is-4by3">
                        <img src={images[availableToppings[toppingChoice].img]} />
                      </figure>
                    </article>
                  </div>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Toppings;
