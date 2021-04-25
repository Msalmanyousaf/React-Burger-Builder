import React, {Component} from "react";
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentDidUpdate(){
    //console.log('updated');
  }
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map((igkey) => {
      return (
        <li key={igkey}>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
          {this.props.ingredients[igkey]}
        </li>
      );
    });
    return(
      <>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total cost: {this.props.cost.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={this.props.purchaseCancel} btnType='Danger'>Cancel</Button>
      <Button clicked={this.props.purchaseContinue} btnType='Success'>Continue</Button>
    </>
     
    );
  }

  
  
};

export default OrderSummary;
