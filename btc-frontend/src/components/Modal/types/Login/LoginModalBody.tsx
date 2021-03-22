import * as React from 'react';

interface LoginModalBodyProps {
  isCheckout: boolean;
  username: string;
  password: string;
  handleUpdate: any;
  handleSubmit: any;
}

class LoginModalBody extends React.Component<LoginModalBodyProps, {}> {
  render() {
    const { isCheckout, username, password, handleUpdate, handleSubmit } = this.props;

    return (
      <div>
        { isCheckout ?
          <section className="modal-card-body">
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      name="username"
                      type="text"
                      value={username}
                      onChange={handleUpdate}
                      onKeyDown={handleSubmit}
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
                      onChange={handleUpdate}
                      onKeyDown={handleSubmit}
                    />
                  </div>
                </div>
              </div>

              <div className="column is-half guest-container">
                <div className="button is-success">
                  Checkout As Guest
                </div>
              </div>
            </div>
          </section> :
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  name="username"
                  type="text"
                  value={username}
                  onChange={handleUpdate}
                  onKeyDown={handleSubmit}
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
                  onChange={handleUpdate}
                  onKeyDown={handleSubmit}
                />
              </div>
            </div>
          </section>
        }
      </div>
    );
  }
}

export default LoginModalBody;
