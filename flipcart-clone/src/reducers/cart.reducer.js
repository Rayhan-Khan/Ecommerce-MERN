import { cartConstants } from "../actions/constants";


const initState = {
    cartItems: {
    },
};

const cartReducer= (state = initState, action) => {
    switch(action.type){
        case cartConstants.ADD_TO_CART:
            state = {
                ...state,
                cartItems:action.payload.cartItems
            }
            break;
       default:
           break;
    }
    return state;
}

export default cartReducer;