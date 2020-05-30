import { SET_FAVOURITES} from '../actions/types'

const initialState = {
  favourites : [],
}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_FAVOURITES : 
      return { ...state, favourites : action.payload }
    default :
      return state
  }
}
