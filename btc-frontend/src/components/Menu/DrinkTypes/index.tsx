import * as React from 'react';
import images from '../../../assets/images';

interface DrinkTypesProps {
  chosenDrinkType: String;
  drinkTypes: any;
  onUpdate: any;
}

class DrinkTypes extends React.Component<DrinkTypesProps, {}> {
  render() {
    const { chosenDrinkType, drinkTypes = {}, onUpdate } = this.props;

    return (
      <div className="container">
        <div className="tile is-ancestor wrap-container">
          <div className="tile is-vertical is-parent is-12">
              <div className="tile notification center-text">
                  <div className="title">Select a Drink Type</div>
              </div>
          </div>
          {
            Object.keys(drinkTypes).map((drinkType: any) => (
              <div className="tile is-vertical is-4" key={drinkTypes[drinkType].key}>
                <a
                  className="tile-text"
                  onClick={(() => onUpdate(drinkTypes[drinkType].key))}
                >
                  <div className="tile is-parent">
                    <article className={`tile is-child notification ${chosenDrinkType === drinkTypes[drinkType].key ? 'is-success' : ''}`}>
                      <p className="title">{drinkTypes[drinkType].label}</p>
                      <p className="subtitle">{drinkTypes[drinkType].subLabel}</p>
                      <figure className="image is-9by16">
                        <img src={images[drinkTypes[drinkType].img]} />
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

export default DrinkTypes;
