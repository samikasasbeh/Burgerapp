import * as actionTypes from './actionTypes';

export const addIngrendient = (name) => {
    return {
        type: actionTypes.ADDINGREDIENT,
        ingredientName: name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVEINGREDIENT,
        ingredientName: name
    };
};