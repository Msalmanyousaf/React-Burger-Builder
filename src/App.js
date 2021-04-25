import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={() => <BurgerBuilder />} />
        <Route path="/auth" render={() => <Auth />} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact render={() => <BurgerBuilder />} />
          <Route path="/orders" render={() => <Orders />} />
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/checkout" render={() => <Checkout />} />
          <Route path="/logout" render={() => <Logout />} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};
export default connect(stateToProps, dispatchToProps)(App);
