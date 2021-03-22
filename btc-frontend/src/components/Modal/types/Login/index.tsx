import * as React from 'react';

import LoginModalBody from './LoginModalBody';
import LoginModalFooter from './LoginModalFooter';

import './Login.css';

interface LoginProps {
  isCheckout: boolean;
  label: string;
  username: string;
  password: string;
  handleUpdate: any;
  handleSubmit: any;
  handleSetModal: Function;
}

class Login extends React.Component<LoginProps, {}> {
  render() {
    const { isCheckout, label, username, password, handleUpdate, handleSubmit, handleSetModal } = this.props;

    return (
      <div id="modal-container" className="modal animated fadeIn is-active">
        <div className="modal-background" onClick={() => handleSetModal('')}/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{`${label}: `}</p>
            <button className="delete" onClick={() => handleSetModal('')} aria-label="close" />
          </header>

          <LoginModalBody
            isCheckout={isCheckout}
            username={username}
            password={password}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />

          <LoginModalFooter
            isCheckout={isCheckout}
            label={label}
            handleSetModal={handleSetModal}
            handleSubmit={handleSubmit}
          />

        </div>
      </div>
    );
  }
}

export default Login;
