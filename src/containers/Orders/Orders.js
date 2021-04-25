import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return <Order key={order.id} ingredients={order.ingredients} />;
      });
    }

    return <div>{orders}</div>;
  }
}

const stateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const dispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(stateToProps, dispatchToProps)(Orders);
