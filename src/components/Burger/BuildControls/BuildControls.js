import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((obj) => {
      return (
        <BuildControl
          moreClicked={props.add.bind(this, obj.type)}
          lessClicked={() => props.remove(obj.type)}
          label={obj.label}
          key={obj.label}
          disabled={props.disabled[obj.type]}
        />
      );
    })}
    <button
      onClick={props.ordered}
      disabled={props.canOrder}
      className={classes.OrderButton}
    >
      {props.isAuth ? 'ORDER NOW' : 'Sign Up to Order'}
    </button>
  </div>
);
export default buildControls;
