import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import { LinkContainer } from 'react-router-bootstrap';
import User from 'react-icons/lib/fa/user';

interface NavBarState {
  isOpen: boolean;
}

class NavDropDown extends React.Component<any, NavBarState> {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  
  handleClickOutside = (evt: any) => {
    this.setState({ isOpen: false });
  };

  toggleMenu = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { username, logout } = this.props;
    const dropDownState = this.state.isOpen ? "is-active" : '';

    return (
      <div className={'dropdown ' + dropDownState} onClick={this.toggleMenu}>
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2">
            <span><User aria-hidden="true" /></span>
          </button>
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <p>Logged In As:</p>
            </div>
            <a className="dropdown-item">
              <b>{username}</b>
            </a>

            <hr className="dropdown-divider" />

            <LinkContainer to="/userProfile">
              <a className="dropdown-item" onClick={this.toggleMenu}>
                <div className="content">
                  Your Profile
                </div>
              </a>
            </LinkContainer>

            <LinkContainer to="/orderHistory">
              <a className="dropdown-item" onClick={this.toggleMenu}>
                <div className="content">
                  Order History
                </div>
              </a>
            </LinkContainer>

            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(NavDropDown);
