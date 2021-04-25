import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerLoading = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_LOADING,
  };
};

export const purchaseBurgerStart = (orderData, routeHistory, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerLoading());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        routeHistory.replace("/");
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios
      .get('/orders.json'+ queryParams)
      .then((res) => {
        //res.data -> a JS object from the server
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
        // this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
        // this.setState({ loading: false });
      });
  };
};
