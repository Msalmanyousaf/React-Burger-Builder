import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button disabled={props.disabled} onClick={props.lessClicked} className={classes.Less}>Less</button>
        <button onClick={props.moreClicked} className={classes.More}>More</button>
    </div>
);
export default buildControl;