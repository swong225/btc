import * as React from 'react';
import { toast } from 'react-toastify';

import { validatePassword, validatePhone, validateEmail } from '../../utils/validate';

import './UserProfile.css';

interface UserProfileProps {
  userData: any;
  handleSubmit: any;
}

interface UserProfileState {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  match: boolean;
  validPassword: boolean;
  validConfirmPassword: boolean;
  validPhone: boolean;
  validEmail: boolean;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: props.userData.get('username'),
      phone: props.userData.get('phone'),
      password: '',
      confirmPassword: '',
      match: true,
      validPassword: true,
      validConfirmPassword: true,
      validPhone: true,
      validEmail: true
    }
  }

  handleUpdate = (event: any) => {
    const { name, value } = event.target;
    
    // clear out the 'password not match' error when user types in the password fields
    // if the user is updating the password fields, ensure they meet the password requirements
    if (name === 'password') {
      this.setState({
        validPassword: validatePassword(value),
        match: true
      });
    } else if (name === 'confirmPassword') {
      this.setState({
        validConfirmPassword: validatePassword(value),
        match: true
      });
    } else if (name === 'phone') {
      this.setState({ validPhone: validatePhone(value) });
    } else if (name === 'username') {
      this.setState({ validEmail: validateEmail(value) });
    }
    
    this.setState(() => ({ [name]: value }), () => {
      // // if neither password fields are filled - allow update of non password fields
      if (!this.state.password && !this.state.confirmPassword) {
        this.setState({ validPassword: true, validConfirmPassword: true })
      }
    });
  };
  
  handleSubmit = (event: any) => {
    const { handleSubmit, userData } = this.props;
    const { password, confirmPassword, username, phone, match, validPassword, validConfirmPassword, validEmail, validPhone } = this.state;

    if (event.type === 'click' || event.key === 'Enter') {
      // check if the password fields match
      if (password !== confirmPassword) {
        this.setState({ match: false });
        return;
      }
      
      if (match && validPassword && validConfirmPassword && validEmail && validPhone) {
        handleSubmit({
          userId: userData.get('id'),
          username,
          phone,
          password
        });
      } else {
        toast.error('Error Updating User Details')
      }
    }
  };

  render() {
    const {
      username,
      phone,
      password,
      confirmPassword,
      match,
      validPassword,
      validConfirmPassword,
      validPhone,
      validEmail
    } = this.state;

    return (
      <div className="userData-container">
        <div className="field">
          <label className="label">My Profile</label>
        </div>
        <div className="control">
          <input
            className="input userData-entry"
            name="username"
            type="text"
            value={username}
            onChange={this.handleUpdate}
            onKeyDown={this.handleSubmit}
            placeholder="Email Address"
            autoFocus
          />
        </div>
        {validEmail ? '' : <span className="help is-danger">Invalid Email</span>}
        <div className="control">
          <input
            className="input userData-entry"
            name="phone"
            type="tel"
            value={phone}
            onChange={this.handleUpdate}
            onKeyDown={this.handleSubmit}
            placeholder="Contact Number"
          />
        </div>
        {validPhone ? '' : <span className="help is-danger">Invalid Phone #</span>}
        <hr />
        <div className="field">
          <label className="label">New Password</label>
        </div>
        <div className="control">
          <input
            className="input userData-entry"
            name="password"
            type="password"
            value={password}
            onChange={this.handleUpdate}
            onKeyDown={this.handleSubmit}
            placeholder="Password"
          />
        </div>
        <div className="control">
          <input
            className="input userData-entry"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={this.handleUpdate}
            onKeyDown={this.handleSubmit}
            placeholder="Retype Password"
          />
        </div>
        {validPassword && validConfirmPassword ? '' : <span className="help is-danger">Password must be at least 8 characters</span>}
        {match ? '' : <span className="help is-danger">Passwords must match</span>}
        <br />
        <div className="control">
          <button
            className="button is-link profile-submit"
            onClick={this.handleSubmit}
            disabled={!match || !validPassword || !validPhone || !validEmail}
          >
            Update Details
          </button>
        </div>
      </div>
    );
  }
}

export default UserProfile;
