import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle drawerOn={props.drawerOn}/>
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth}/>
    </nav>
  </header>
);
export default toolbar;
