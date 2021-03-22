import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavBar from '../../components/NavBar';

import { setActiveModal } from '../../redux/modals/actions';
import { logout } from '../../redux/user/actions';
import { bagCount } from '../../redux/bag/selectors';
import { getUsername } from '../../redux/user/selectors';

import './Header.css';

interface HeaderProps {
  username: string;
  history: any;
  setActiveModal: any;
  logout: any;
  bagCount: number;
}

class Header extends React.Component<HeaderProps, any> {
  handleModalClick = (modal: any) => {
    this.props.setActiveModal({ modal });
  };

  handleLogout = async () => {
    const { logout, history } = this.props;

    const status = await logout();

    history.push('/');
    if (status === 200) this.handleModalClick('');
  };

  render() {
    const { username, bagCount } = this.props;

    return (
      <NavBar
        username={username}
        logout={this.handleLogout}
        handleModalClick={this.handleModalClick}
        bagCount={bagCount}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  username: getUsername(state),
  bagCount: bagCount(state)
});

export default connect(mapStateToProps, {
  setActiveModal,
  logout
})(withRouter(Header));
