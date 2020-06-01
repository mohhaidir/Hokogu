import { SET_RECIPIES, SET_RECIPE, SET_RECIPIES_LOADING, SET_RECIPE_LOADING} from '../actions/types';
const initialState = {
  recipies : [],
  recipe: null,
  recipeLoading: true,
  recipiesLoading: true
}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_RECIPIES :
      return { ...state, recipiesLoading: false, recipies : action.payload }
    case SET_RECIPE:
      return { ...state, recipeLoading: false, recipe : action.payload }
    case SET_RECIPIES_LOADING: 
      return { ...state, recipiesLoading: action.payload}
    case SET_RECIPE_LOADING: 
      return { ...state, recipeLoading: action.payload}
    default :
      return state
  }
}