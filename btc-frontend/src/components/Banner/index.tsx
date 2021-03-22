import * as React from 'react';

import './Banner.css';

class Banner extends React.Component {
  render() {
    return (
      <section className="hero is-dark is-bold">
        <div className="hero-body">
          <h1 className="title has-text-centered">A cool picture of Boba here</h1>
        </div>
      </section>
    );
  }
}

export default Banner;
