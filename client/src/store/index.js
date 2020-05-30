import { createStore, combineReducers, applyMiddleware } from 'redux';
import favouritesReducer from "./reducers/favourites";
import recipeReducer from "./reducers/recipe";
import thunk from "redux-thunk";

const reducer = combineReducers({
    favouritesReducer,
    recipeReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
