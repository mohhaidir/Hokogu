import { SET_FAVOURITES, SET_FAVOURITESLOADING} from '../actions/types'

const initialState = {
  favourites : [],
  favouritesLoading: true,
}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_FAVOURITES : 
      return { ...state, favouritesLoading: false, favourites : action.payload }
    case SET_FAVOURITESLOADING : 
      return { ...state, favouritesLoading : action.payload }
    default :
      return state
  }
}
