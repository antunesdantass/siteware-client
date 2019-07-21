import { ADD_TO_CART } from '../constants/ActionTypes';

export const addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}