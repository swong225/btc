import * as React from 'react';
import {
  validatePhone,
  validateEmail,
  validatePassword
} from '../../../../utils/validate';

import './SignupForm.css';

interface SignupFormProps {
  handleSubmit: any;
  handleSetModal: Function;
}

interface SignupFormState {
  username: string;
  phone: string;
  password: string;
  validEmail: boolean;
  validPhone: boolean;
  validPassword: boolean;
}

class SignupForm extends React.Component<SignupFormProps, SignupFormState> {
  constructor() {
    super();
    this.state = {
      username: '',
      phone: '',
      password: '',
      validEmail: true,
      validPhone: true,
      validPassword: true
    };
  }
  
  handleUpdate = (event: any) => {
    const { name, value } = event.target;

    this.setState(() => ({ [name]: value }));

    if (name === 'phone')
      this.setState({ validPhone: validatePhone(value) });
    else if (name === 'username')
      this.setState({ validEmail: validateEmail(value) });
    else if (name === 'password')
      this.setState({ validPassword: validatePassword(value) });
  };
  
  handleSubmit = async (event: any) => {
    const { phone, username, password } = this.state;
    const { handleSubmit, handleSetModal } = this.props;

    if (event.type === 'click' || event.key === 'Enter') {

      // validate form elements
      const validPhone = validatePhone(phone);
      const validEmail = validateEmail(username);
      const validPassword = validatePassword(password);

      this.setState({
        validPhone,
        validEmail,
        validPassword
      });

      // if any of the fields are invalid, do not submit
      if (!(validPhone && validEmail && validPassword)) {
        // notify user form values are invalid
        return;
      }
      
      handleSubmit(this.state);
    }
    else if (event.key === 'Escape') {
      handleSetModal('');
    }
  };

  render() {
    const {
      username,
      phone,
      password,
      validPhone,
      validEmail,
      validPassword
    } = this.state;
    const { handleSetModal } = this.props;

    return (
      <div id="modal-container" className="modal animated fadeIn is-active">
        <div className="modal-background" onClick={() => handleSetModal('')}/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign Up: </p>
            <button className="delete" onClick={() => handleSetModal('')} aria-label="close" />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${validEmail ? '' : 'is-danger'}`}
                  name="username"
                  type="email"
                  value={username}
                  onChange={this.handleUpdate}
                  onKeyDown={this.handleSubmit}
                  autoFocus
                />
              </div>
              {validEmail ? '' : <p className="help is-danger">Invalid Email</p>}
            </div>
            <div className="field">
              <label className="label">Phone #</label>
              <div className="control">
                <input
                  className={`input ${validPhone ? '' : 'is-danger'}`}
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={this.handleUpdate}
                  onKeyDown={this.handleSubmit}
                />
              </div>
              {validPhone ? '' : <p className="help is-danger">Invalid Phone #</p>}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className={`input ${validPassword ? '' : 'is-danger'}`}
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleUpdate}
                  onKeyDown={this.handleSubmit}
                />
              </div>
              {validPassword ? '' : <p className="help is-danger">Password must be a minimum of 8 characters</p>}
            </div>
          </section>

          <footer className="modal-card-foot float-buttons">
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" onClick={() => handleSetModal('')}>Cancel</button>
              </div>
              <div className="control">
                <button className="button is-primary" onClick={this.handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default SignupForm;
