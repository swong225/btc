import * as React from 'react';

interface LoginModalBodyProps {
  isCheckout: boolean;
  label: string;
  handleSubmit: any;
  handleSetModal: any;
}

class LoginModalBody extends React.Component<LoginModalBodyProps, {}> {
  render() {
    const { isCheckout, label, handleSetModal, handleSubmit } = this.props;

    return (
      <div>
        { isCheckout ?
          <footer className="modal-card-foot">
            <div className="container">
              <div className="content has-text-centered">
                <button className="button is-primary" onClick={handleSubmit}>
                  {label}
                </button>
              </div>
            </div>
          </footer> :
          <footer className="modal-card-foot split-buttons">
            <div className="control">
              <button className="button is-link" onClick={() => handleSetModal('SIGNUP')}>New User</button>
            </div>
            <div className="control">
              <button className="button is-primary" onClick={handleSubmit}>
                {label}
              </button>
            </div>
          </footer>
        }
      </div>
    );
  }
}

export default LoginModalBody;
