import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: {
    meat: 0,
    salad: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 0,
  building: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.INIT_BURGER:
      return initialState;
      
    case actionTypes.ADD_INGREDIENT:{
      const oldCount = state.ingredients[action.ing];
      const updatedCount = oldCount + 1;
      const updatedIngredients = { ...state.ingredients }; // because we update state in imutable way
      updatedIngredients[action.ing] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[action.ing];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      return { ingredients: updatedIngredients, totalPrice: newPrice, building: true };
    }

    case actionTypes.REMOVE_INGREDIENT:{
      const oldCount = state.ingredients[action.ing];
      if (oldCount <= 0) {
        return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...state.ingredients }; // because we update state in imutable way
      updatedIngredients[action.ing] = updatedCount;
      const priceSubtraction = INGREDIENT_PRICES[action.ing];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice - priceSubtraction;
      return { ingredients: updatedIngredients, totalPrice: newPrice };
    }

    default:
      return state;
  }
};

export default reducer;

