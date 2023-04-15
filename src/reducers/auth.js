import  { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS,LOGOUT_SUCCESS} from '../actions/auth'

//nextia
/*
const initialState = {
    accessToken: localStorage.getItem('token'),    
    isAuthenticated: null, 
    username: null,
    email: null,
    roles: []
}
*/ 

const initialState = {
    accessToken: localStorage.getItem('token'),    
    username: localStorage.getItem('username'),    
    id : null,
    email:null,
    role:null,
    member:{},
    isAuthenticated: localStorage.getItem('isAuthenticated')
}



export default function (state= initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

            console.log (action.payload)
            localStorage.setItem('token', action.payload.accessToken)
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('isAuthenticated', action.payload.isAuthenticated)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true                
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return{
                ...state,
                accessToken:null,                
                isAuthenticated: null,
                username: null,
                email: null,
                roles: []
            }
        default: 
            return state
    }
}