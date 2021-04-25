import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, withRouter } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';

class Checkout extends Component {
  
  cancelHandler = () => {
    this.props.history.goBack();
  };
  continueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelled={this.cancelHandler}
          continued={this.continueHandler}
          price={this.props.totalPrice.toFixed(2)}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          exact
          // render={() => <ContactData ingredients={this.props.ingredients} {...this.props}/>}
          render={() => <ContactData />}
        />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  };
};

export default connect(stateToProps)(withRouter(Checkout));
