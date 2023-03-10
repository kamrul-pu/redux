const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCTS = "ADD_PRODUCTS";

const GET_CARD_ITEMS = "GET_CARD_ITEMS";
const ADD_CART_ITEMS = "ADD_CART_ITEMS";

//Initial State
const initialProductState = {
    products: ["Sugar", "salt"],
    numberOfProduct: 2
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


//Create store


const store = createStore(productReducer, applyMiddleware(logger));
console.log(store);
store.subscribe(() => {
    console.log("From Subscribe", store.getState());
});

store.dispatch(getProducts());
store.dispatch(addProducts("Rice"));



