import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ings = [];
  for (let ing in props.ingredients) {
    ings.push(
      <p key={ing}>{ing}: <strong>{props.ingredients[ing]}</strong>
      </p>
    );
  }
  return (
    <div className={classes.Order}>
      <h3>Ingredients</h3>
      {ings}
    </div>
  );
};
export default order;
