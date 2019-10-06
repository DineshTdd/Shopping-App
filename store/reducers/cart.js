import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state=initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                // already item exists in quatnity
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity +1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            }
            else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state, // this is optional since we aren't changing any property of the state itself
                items: {...state.items, [addedProduct.id]: updatedOrNewCartItem}, // can access an property using []
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART: 
            const selectedCartItem = state.items[action.pid]
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
                if (currentQty > 1) {
                    const updatedCartItem = new CartItem(selectedCartItem.quantity -1, selectedCartItem.productPrice, selectedCartItem.productTitle, selectedCartItem.sum - selectedCartItem.productPrice);
                    updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
                }
                else {
                    updatedCartItems = {...state.items};
                    delete updatedCartItems[action.pid];
                }
            const amt = state.totalAmount - selectedCartItem.productPrice ;
            amt.toFixed(2);
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: amt
            };
    }
    return state;
};
