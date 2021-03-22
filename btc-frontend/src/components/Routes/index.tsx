import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Menu from '../../containers/Menu';
import NotFound from '../NotFound';
import Bag from '../../containers/Bag';
import OrderHistory from '../../containers/OrderHistory';
import Confirm from '../../containers/Confirm';
import UserProfile from '../../containers/UserProfile';
import CheckingOut from '../../containers/CheckingOut';

import { retrieveActiveBag } from '../../redux/bag/actions';
import { getUserId } from '../../redux/user/selectors';
import { getPrevOrder } from '../../redux/bag/selectors';

interface RoutesProps {
  userId: string;
  retrieveActiveBag: Function;
  prevOrder: any;
}

class Routes extends React.Component<RoutesProps, any>  {
  async componentDidMount() {
    const { userId, retrieveActiveBag } = this.props;

    if (userId) {
      // retrieving bag items...
      await retrieveActiveBag(userId);
    }
  }

  render() {
    const { prevOrder } = this.props;
    const menuProps = { prevOrder };

    return (
      <Switch>
        <Route exact={true} path="/" render={() => <Menu {...menuProps} /> } />
        <Route exact={true} path="/bag" component={Bag} />
        <Route exact={true} path="/confirm" component={Confirm} />
        <Route exact={true} path="/checkingout" component={CheckingOut} />
        <Route exact={true} path="/orderHistory" component={OrderHistory} />
        <Route exact={true} path="/userProfile" component={UserProfile} />
        <Route path="/*" component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: any) => ({
  prevOrder: getPrevOrder(state),
  userId: getUserId(state)
});

export default withRouter(connect(mapStateToProps, {
  retrieveActiveBag
})(Routes));
