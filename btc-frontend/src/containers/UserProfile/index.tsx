import * as React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import UserProfile from '../../components/UserProfile';
import { editUser } from '../../redux/user/actions';
import { getData } from '../../redux/user/selectors';

import './UserProfile.css';

interface UserProfileProps {
  userData: any;
  editUser: Function;
}

class UserProfileContainer extends React.Component<UserProfileProps, any> {
  handleSubmit = async ({
    userId,
    username,
    phone,
    password
  }: {
    userId: string;
    username: string;
    phone: string;
    password: string;
  }) => {
    const { editUser } = this.props;

    editUser({ userId, username, phone, password });
  };

  render() {
    const { userData = Map() } = this.props;

    return (
      <div className="userProfile-container">
        <UserProfile userData={userData} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userData: getData(state)
});

export default connect(mapStateToProps, {
  editUser
})(UserProfileContainer);
