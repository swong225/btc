import * as React from 'react';

import images from '../../../assets/images';

interface FlavorsProps {
  chosenFlavor: String;
  flavors: Array<String>;
  onUpdate: any;
}

class Flavors extends React.Component<FlavorsProps, {}> {
  handleSelection = (value: string) => {
    const { onUpdate } = this.props;

    onUpdate({ property: 'flavor', value });
  }

  render() {
    const { chosenFlavor, flavors = [] } = this.props;

    return (
      <div className="container">
        <div className="tile is-ancestor wrap-container">
          <div className="tile is-vertical is-parent is-12">
              <div className="tile notification center-text">
                  <div className="title">Select a Flavor</div>
              </div>
          </div>
          {
            flavors.map((flavor: any) => (
              <div className="tile is-vertical is-4" key={flavor.key}>
                <a
                  className="tile-text"
                  onClick={(() => this.handleSelection(flavor.key))}
                >
                  <div className="tile is-parent">
                    <article className={`tile is-child notification ${flavor.key === chosenFlavor ? 'is-success' : ''}`}>
                      <p className="title">{flavor.label}</p>
                      <figure className="image is-4by3">
                        <img src={images[flavor.img]} />
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

export default Flavors;
