const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

//action types
const GET_TODOS = "GET_TODOS";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILED = "GET_TODOS_FAILED";

const url = "https://jsonplaceholder.typicode.com/todos";

//initial state
const initialTodoState = {
    todos: [],
    isLoading: false,
    error: null,
};

const getTodos = () => {
    return {
        type: GET_TODOS
    }

};
const getTOdosFailed = (error) => {
    return {
        type: GET_TODOS_FAILED,
        payload: error,
    }
};

const getTOdosSuccess = (todos) => {
    return {
        type: GET_TODOS_SUCCESS,
        payload: todos,
    }
};

//create reducer

const todosReducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                isLoading: true
            }
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: action.payload
            }
        case GET_TODOS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

//async action create

const fetchData = () => {
    return (dispatch) => {
        dispatch(getTodos());
        axios.get(url)
            .then(res => {
                const todos = res.data;
                const titles = todos.map(todo => todo.title);
                // console.log(titles);
                dispatch(getTOdosSuccess(todos));
            })
            .catch(err => {
                const error = err.message;
                console.log(error)
                dispatch(getTOdosFailed(error));
            })
    }
}

//create store
const store = createStore(todosReducer, applyMiddleware(thunk));

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(fetchData());