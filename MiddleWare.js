const { createStore, combineReducers } = require("redux");
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCTS = "ADD_PRODUCTS";

const GET_CARD_ITEMS = "GET_CARD_ITEMS";
const ADD_CART_ITEMS = "ADD_CART_ITEMS";

//Initial State
const initialProductState = {
    products: ["Sugar", "salt"],
    numberOfProduct: 2
}

const initialCartState = {
    carts: ["Sugar"],
    numberOfCart: 1
}

//Action Creators for products

const getProducts = () => {
    return {
        type: GET_PRODUCTS
    }
}

const addProducts = (product) => {
    return {
        type: ADD_PRODUCTS,
        payload: product,
    }

}

//Action Creators for Carts

const getCarts = () => {
    return {
        type: GET_CARD_ITEMS
    }
}

const addCarts = (cart) => {
    return {
        type: ADD_CART_ITEMS,
        payload: cart,
    }

}

//create product reducer

const productReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return {
                ...state,
                products: [...state.products, action.payload],
                numberOfProduct: state.numberOfProduct + 1,
            }
        case GET_PRODUCTS:
            return {
                ...state,
            }

        default:
            return state;
    }
}
//cart reducer
const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case ADD_CART_ITEMS:
            return {
                ...state,
                carts: [...state.carts, action.payload],
                numberOfCart: state.numberOfCart + 1
            }
        case GET_CARD_ITEMS:
            return {
                ...state,
            }

        default:
            return state;
    }
}

//Create store

const rootReducer = combineReducers({
    productR: productReducer,
    cartR: cartReducer
})
// const store = createStore(productReducer);
// const store = createStore(cartReducer);
const store = createStore(rootReducer);

store.subscribe(() => {
    console.log("From Subscribe", store.getState());
});

// const products = store.dispatch(getProducts());
// console.log("From Get products action:", products);
// store.dispatch(addProducts("Rice"));

store.dispatch(getCarts());
store.dispatch(addCarts("Colacola"));



