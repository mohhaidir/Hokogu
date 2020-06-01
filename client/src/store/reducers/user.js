const initialState = {
    isLoggedIn: false,
    token: null,
    name: null,
    avatar: null
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {...state,
                isLoggedIn: true,
                token: action.payload.token,
                name: action.payload.name,
                avatar: action.payload.avatar,
            }
        case 'LOGOUT':
            return {...state, 
                isLoggedIn: false,
                token: null,
                name: null,
                avatar: null
            }
        case 'SET_ISLOGGEDIN': 
            return {...state, isLoggedIn: action.payload}
        case 'SET_TOKEN': 
            return {...state, token: action.payload}
        case 'SET_NAME': 
            return {...state, name: action.payload}
        case 'SET_AVATAR': 
            return {...state, avatar: action.payload}
        case 'GET_STATE':
            return state
        default:
            return state
    }
}

export default userReducer