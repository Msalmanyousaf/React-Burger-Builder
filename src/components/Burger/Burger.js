import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngedients = [];
    for (const ing in props.ingredients){
        for (let i = 0; i < props.ingredients[ing]; i++){
            transformedIngedients.push(<BurgerIngredient key={ing+i} type={ing}/>);
        }
        
    }

    // let transformedIngedients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //             return <BurgerIngredient key={igKey + i} type={igKey} />
    //         });
    //     })
    //     .reduce((arr, el) => {
    //         return arr.concat(el);
    //     }, []);

        if (transformedIngedients.length === 0){
            transformedIngedients = <p>Please Start Adding Ingredients.</p>
        }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngedients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;