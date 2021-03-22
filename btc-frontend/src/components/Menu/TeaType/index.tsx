import * as React from 'react';

import images from '../../../assets/images';
import '../Menu.css';

interface TeaTypeProps {
  isTea: boolean;
  teaType: String;
  availableTeas: any;
  onUpdate: any;
}

class TeaType extends React.Component<TeaTypeProps, {}> {
  handleSelection = (value: string) => {
    const { isTea, onUpdate } = this.props;

    if (!isTea) return;

    onUpdate({ property: 'teaType', value });
  }

  render() {
    const { teaType, availableTeas, isTea } = this.props;

    return (
      <div className="container">
        <div className="tile is-ancestor wrap-container">
          <div className="tile is-vertical is-parent is-12">
              <div className="tile notification center-text">
                  <div className="title">Select a Tea Type</div>
              </div>
          </div>

          {
            Object.keys(availableTeas).map((teaOption: any) => (
              <div className="tile is-vertical is-4" key={availableTeas[teaOption].key}>
                <a
                  className="tile-text"
                  onClick={() => this.handleSelection(availableTeas[teaOption].key)}
                >
                  <div className={`tile is-parent ${isTea ? null : "no-cursor"}`}>
                    <article className={`tile is-child notification ${teaType === availableTeas[teaOption].key ? 'is-success' : ''}`}>
                      <p className="title">{availableTeas[teaOption].label}</p>
                      <figure className="image is-square">
                        <img src={images[availableTeas[teaOption].img]} />
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

export default TeaType;
