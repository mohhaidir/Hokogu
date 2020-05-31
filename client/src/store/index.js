import { createStore, combineReducers, applyMiddleware } from 'redux';
import favouritesReducer from "./reducers/favourites";
import recipeReducer from "./reducers/recipe";
import userReducer from "./reducers/user"
import thunk from "redux-thunk";

const reducer = combineReducers({
    favouritesReducer,
    recipeReducer,
    userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
