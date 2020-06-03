import { SET_RECIPIES, SET_RECIPE, SET_RECIPIES_LOADING, SET_RECIPE_LOADING} from './types';
const APIKEY = '5cd43e21289d449988abacef7d29dd14';
export function getRecipies(query) {
    return (dispatch) => {
        dispatch(setRecipiesLoading(true))
        let apiUrl = `https://api.spoonacular.com/recipes/search?number=10&apiKey=${APIKEY}&query=${query}`;
        fetch(apiUrl, {
            "method": "GET",
        })
        .then((res) => res.json())
        .then((res) => {
        console.log(res.results)
          dispatch({
            type: SET_RECIPIES,
            payload:  res.results
          });
        })
        .catch(console.log())
    };
}

export const setRecipe = (value) => {
    return {
        type : SET_RECIPE,
        payload : value
    }
}

export const setRecipiesLoading = (value) => {
    return {
        type : SET_RECIPIES_LOADING,
        payload : value
    }
}

export const setRecipeLoading = (value) => {
    return {
        type : SET_RECIPE_LOADING,
        payload : value
    }
}