import * as actionTypes from "./actionTypes";

export const initBurger = () => {
  return{
    type: actionTypes.INIT_BURGER
  }
}

export const addIngredientAction = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ing: ingName,
  };
};

export const removeIngredientAction = (ingName) => {
    return {
      type: actionTypes.REMOVE_INGREDIENT,
      ing: ingName,
    };
  };

