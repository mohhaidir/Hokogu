import { SET_FAVOURITES, SET_FAVOURITESLOADING, SET_POPULAR, SET_POPULARLOADING} from '../actions/types'

const initialState = {
  favourites : [],
  favouritesLoading: true,
  popular: [],
  popularLoading: true,
}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_FAVOURITES : 
      return { ...state, favouritesLoading: false, favourites : action.payload }
    case SET_FAVOURITESLOADING : 
      return { ...state, favouritesLoading : action.payload }
    case SET_POPULAR : 
      return { ...state, popularLoading: false, popular : action.payload }
    case SET_POPULARLOADING :
      return { ...state, popularLoading : action.payload }
    default :
      return state
  }
}
