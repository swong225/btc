import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Bag from '../../components/Bag';
import BagItem from '../../components/BagItem';
import { getTotalBagCost, getBag } from '../../redux/bag/selectors';
import { getUsername } from '../../redux/user/selectors';
import { drinkToUpdate, removeDrink, resetPrevOrder } from '../../redux/bag/actions';
import { setActiveModal } from '../../redux/modals/actions';

interface BagContainerProps {
  bag: Array<string>;
  username: string;
  totalCost: number;
  removeDrink: Function;
  setActiveModal: Function;
  drinkToUpdate: Function;
  resetPrevOrder: Function;
  history: any;
}

class BagContainer extends React.Component<BagContainerProps, any> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    const { resetPrevOrder } = this.props

    await resetPrevOrder();
  }

  handleModalClick = (modal: any) => {
    this.props.setActiveModal({ modal });
  };

  editDrink = ({ drinkOrder }: { drinkOrder: any }) => {
    const { history, drinkToUpdate } = this.props;

    drinkToUpdate(drinkOrder);
    history.push('/');
  }

  removeDrink = (orderId: string) => {
    const { removeDrink } = this.props;

    removeDrink({ orderId });
  }

  render() {
    const { username, bag, totalCost } = this.props;

    const bagList = bag.map((drink: any, idx: number) => {
      return (
        <BagItem
          key={idx}
          orderNum={idx+1}
          drinkOrder={drink}
          editDrink={this.editDrink}
          removeDrink={this.removeDrink}
        />
      );
    });

    return (
      <Bag
        username={username}
        bagList={bagList}
        handleModalClick={this.handleModalClick}
        totalCost={totalCost}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  bag: getBag(state).toJS(),
  totalCost: getTotalBagCost(state),
  username: getUsername(state)
});

export default connect(mapStateToProps, {
  removeDrink,
  setActiveModal,
  drinkToUpdate,
  resetPrevOrder
})(withRouter(BagContainer));
