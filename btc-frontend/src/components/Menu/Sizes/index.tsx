import * as React from 'react';
import numeral from 'numeral';

import images from '../../../assets/images';

interface SizesProps {
  chosenSize: String;
  sizes: any;
  onUpdate: any;
}

class Sizes extends React.Component<SizesProps, {}> {
  render() {
    const { chosenSize, sizes = {}, onUpdate } = this.props;

    return (
      <div className="container">
        <div className="tile is-ancestor wrap-container">
          <div className="tile is-vertical is-parent is-12">
              <div className="tile notification center-text">
                  <div className="title">Select a Drink Size</div>
              </div>
          </div>
          {
            Object.keys(sizes).map((sizeOption: any) => (
              <div className="tile is-vertical is-4" key={sizes[sizeOption].key}>
                <a
                  className="tile-text"
                  onClick={(() => onUpdate(sizes[sizeOption].key, sizes[sizeOption].price))}
                >
                  <div className="tile is-parent">
                    <article className={`tile is-child notification ${sizes[sizeOption].key === chosenSize ? 'is-success' : ''}`}>
                      <p className="title">{sizes[sizeOption].label} ({sizes[sizeOption].oz}oz)</p>
                      <p className="subtitle">{numeral(sizes[sizeOption].price.toString()).format('$0,0.00')}</p>
                      <figure className="image is-3by4">
                        <img src={images[sizes[sizeOption].img]} />
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

export default Sizes;
