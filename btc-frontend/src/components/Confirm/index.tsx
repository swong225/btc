import * as React from 'react';
import * as numeral from 'numeral';

import './Confirm.css';

interface ConfirmProps {
  username: string;
  validName: Boolean;
  phone: string;
  validPhone: Boolean;
  handleUpdate: any;
  handleSubmit: any;
  totalCost: number;
  bagCount: number;
}

class Confirm extends React.Component<ConfirmProps, {}> {
  render() {
    const { username, phone, handleUpdate, handleSubmit } = this.props;
    const { totalCost, bagCount, validPhone, validName } = this.props;
    
    const allowSubmit = validName && validPhone && bagCount > 0;

    return (
      <div className="container">
        <div className="columns columns-container">
          <div className="column is-three-quarter">
            Let's confirm your personal information:
            <br /><br />
            <div className="field">
              <label className="label">Name:</label>
              <div className="control">
                <input
                  className="input"
                  name="username"
                  type="text"
                  value={username}
                  onChange={handleUpdate}
                  autoFocus
                />
              </div>
            </div>
            {validName ? (
              ''
            ) : (
              <p className="help is-danger">Please Give Us Your Name</p>
            )}
            <div className="field">
              <label className="label">Phone #:</label>
              <div className="control">
                <input
                  className="input"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={handleUpdate}
                />
              </div>
            </div>
            {validPhone ? (
              ''
            ) : (
              <p className="help is-danger">Please Provide a Valid Phone #</p>
            )}
          </div>

          <div className="column is-one-quarter bag-sidebar">
            <div className="subtotal-container">
              <strong>Subtotal ({bagCount} {bagCount === 1 ? "item" : "items"})</strong>
              : <strong className="cost-style">{numeral(totalCost).format('$0,0.00')}</strong>
            </div>
            <button
              className="button is-warning"
              onClick={() => handleSubmit(username)}
              disabled={!allowSubmit}
            >
              Confirm!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
