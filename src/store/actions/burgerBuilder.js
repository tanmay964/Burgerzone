import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (name) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredient = (name) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}

export const setIngredient = (ingredients) => {
      return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
      }
}

export const fetchIngredientFailed = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        ingredients : ingredients
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get( 'https://burgerzone-react.firebaseio.com/ingredients.json' )
        .then( response => {
            dispatch(setIngredient(response.data))
        } )
        .catch( error => {
            dispatch(fetchIngredientFailed())
        } );
    }
}