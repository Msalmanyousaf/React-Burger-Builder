import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
      <BackDrop show={props.show} toggleBackdrop={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
