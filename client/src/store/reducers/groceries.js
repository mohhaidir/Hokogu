const initialState = {
  groceries : [],
  groceriesLoading: false,
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'SET_GROCERIES' : 
      return { ...state, groceriesLoading: false, groceries : action.payload }
    case 'SET_GROCERIESLOADING' : 
      return { ...state, groceriesLoading : action.payload }
    default :
      return state
  }
}
