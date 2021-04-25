import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = { showSideDrawer: false };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerOn={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const stateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(stateToProps)(Layout);
