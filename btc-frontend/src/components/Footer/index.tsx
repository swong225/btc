import * as React from 'react';

import './Footer.css';

class Footer extends React.Component<{}, {}> {
  render() {
    return (
      <footer className="footer footer-container">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="content is-size-7">
                <strong>BTC</strong>
                <br />
                123 Awesome Street
                <br />
                Somewhere, MD 12345
              </div>
            </div>
            <div className="column">
              <div className="content has-text-right is-size-7">
                <strong>Hours</strong>
                <br />
                Mon: Closed
                <br />
                Tue-Sat: 11AM-9PM
                <br />
                Sun: 12AM-6PM
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
