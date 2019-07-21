import { ADD_TO_CART } from '../constants/ActionTypes';

const initialState = {
  cart: {
    items: [],
    total: 0.0
  }
}

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.cart
      }
    default:
      return state;
  }
}

export default CartReducer;