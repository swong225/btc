import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import './CheckingOut.css';

interface CheckingOutProps {
  handleSetModal: Function;
  login: Function;
}

interface CheckingOutState {
  username: string;
  password: string;
}

class CheckingOut extends React.Component<CheckingOutProps, CheckingOutState> {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }
  
  handleUpdate = (event: any) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
  };
  
  login = (event: any) => {
    const { username, password } = this.state;
    const { login } = this.props;

    if (event.type === 'click' || event.key === 'Enter') {
      login({ username, password });
    }
  }

  render() {
    const { handleSetModal } = this.props;
    const { username, password } = this.state;

    return (
      <div className="checkingout">
        <div className="container checkingout-container">
          <section className="has-text-centered"><b>New User?</b></section>
          <div className="checkingout-top-section">
            <div className="button is-success checkingout-option-buttons" onClick={() => handleSetModal('SIGNUP')}>
              Create Account
            </div>
            
            <LinkContainer to="/confirm">
              <div className="button is-success checkingout-option-buttons">
                Guest Checkout
              </div>
            </LinkContainer>
          </div>
          <hr />

          <section className="checkingout-bottom-section">
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.handleUpdate}
                  onKeyDown={this.login}
                  autoFocus
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleUpdate}
                  onKeyDown={this.login}
                />
              </div>
            </div>
            <div
              className="button is-primary checkingout-signin-button"
              onClick={this.login}
            >
              Login
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default CheckingOut;
