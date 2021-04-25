import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  const inputClasses = [classes.InputElement];
  let validationError = null;
  if (props.shouldValidate && !props.isValid && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>Please enter a valid value!</p>
    );
  }
  let inputEl = null;
  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "select":
      inputEl = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
      {validationError}
    </div>
  );
};

export default input;
