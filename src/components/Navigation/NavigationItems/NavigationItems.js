import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="/Orders">Orders</NavigationItem>
    ) : null}
    {!props.isAuth ? (
      <NavigationItem link="/Auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/Logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
