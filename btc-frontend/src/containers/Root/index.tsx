import * as React from 'react';

import Header from '../Header';
import Routes from '../../components/Routes';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';

import './Root.css';

class Root extends React.Component {
  render() {
    return (
      <div className="root-container">
        <Banner />
        <Header />
        <div className="bottom-container">
          <Routes />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Root;
