import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Your e-mail",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        valid: true,
        value: "fastest",
      },
    },
    formIsValid: false,
  };

  orderClickedHandler = (event) => {
    event.preventDefault();
    const FormData = {};
    for (let formElIdent in this.state.orderForm) {
      FormData[formElIdent] = this.state.orderForm[formElIdent].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: FormData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.history, this.props.token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return isValid;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  changeHandler = (event, identifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormEl = { ...updatedOrderForm[identifier] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;
    updatedOrderForm[identifier] = updatedFormEl;

    let formIsValid = true;
    for (let inputIdent in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdent].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderClickedHandler} action="">
        {formElementsArray.map((formEl) => (
          <Input
            key={formEl.id}
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            changed={(event) => this.changeHandler(event, formEl.id)}
            shouldValidate={formEl.config.validation}
            isValid={formEl.config.valid}
            touched={formEl.config.touched}
          />
        ))}

        <Button disabled={!this.state.formIsValid} btnType="Success">
          Order Now
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details.</h4>
        {form}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, routeHistory, token) => dispatch(actions.purchaseBurgerStart(orderData, routeHistory, token)),
  };
};

export default connect(stateToProps, dispatchToProps)(withRouter(ContactData));
