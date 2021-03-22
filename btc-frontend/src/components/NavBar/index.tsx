import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import UserO from 'react-icons/lib/fa/user-plus';
import Coffee from 'react-icons/lib/fa/coffee';
import ShoppingBag from 'react-icons/lib/fa/shopping-bag';

import NavDropDown from './Dropdown';

import './NavBar.css';

interface NavBarProps {
  username: string;
  logout: any;
  handleModalClick: any;
  bagCount: number;
}

interface NavBarState {
  isOpen: boolean;
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  render() {
    const { username, logout, handleModalClick, bagCount } = this.props;

    return (
      <nav className="navbar is-fixed-top">
          <div className="navbar-start">
            <div className="navbar-container">
              {!!username ? (
                <div className="navbar-item">
                  <NavDropDown username={username} logout={logout}/>
                </div>
              ) : (
                <div className="navbar-item">
                  <div className="field is-grouped">
                    <div className="control">
                      <div className="button" onClick={() => handleModalClick('LOGIN')}>
                        <UserO aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <LinkContainer to="/">
                <a className="navbar-item align-item-center">
                  <div className="content">
                    <Coffee aria-hidden="true" />{' '}BTC
                  </div>
                </a>
              </LinkContainer>

              <LinkContainer to="/bag">
                <div className="navbar-item">
                  <div className="button">
                    <ShoppingBag aria-hidden="true"/>
                    <span className="bag-count">{bagCount}</span>
                  </div>
                </div>
              </LinkContainer>
            </div>
          </div>
      </nav>
    );
  }
}

export default NavBar;
