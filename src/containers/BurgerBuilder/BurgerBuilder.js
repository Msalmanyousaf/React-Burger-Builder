import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
//import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {..};
  // }

  // local state
  state = {
    purchasing: false,
    loading: false,
  };

  togglePurchaseMode = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: !this.state.purchasing });
    } else {
      this.props.history.push('/auth');
    }
  };

  purchaseContinue = () => {
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.initBurger();
  }

  render() {
    // disable the "Less" button when the corresponding ingredient is empty
    const disabledInfo = { ...this.props.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // now find whether user added any ingredients or not
    const canOrder = Object.values(this.props.ingredients).reduce(
      (prev, curr) => prev + curr,
      0
    );

    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        purchaseContinue={this.purchaseContinue}
        purchaseCancel={this.togglePurchaseMode}
        cost={this.props.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          toggleModal={this.togglePurchaseMode}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          add={this.props.addIngredientHandler}
          remove={this.props.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.props.totalPrice}
          canOrder={!!!canOrder}
          ordered={this.togglePurchaseMode}
          isAuth={this.props.isAuthenticated}
        />
      </>
    );
  }
}
// export default withErrorHandler(BurgerBuilder, axios);

const stateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingName) =>
      dispatch(actions.addIngredientAction(ingName)),
    removeIngredientHandler: (ingName) =>
      dispatch(actions.removeIngredientAction(ingName)),
    initBurger: () => dispatch(actions.initBurger()),
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(withRouter(BurgerBuilder));
