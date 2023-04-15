import {GET_ESTADOS, ADD_ESTADO, EDIT_ESTADO, DELETE_ESTADO} from '../actions/estadosActions'

const initialState = {
    lista:[]
} 

export default function(state=initialState, action){
    switch (action.type) {
        case GET_ESTADOS:
                return {
                    ...state,
                    lista: action.payload
                }
            break;    

            
            case ADD_ESTADO:
                return{
                    ...state,
                    lista: [...state.lista, action.payload]
                }
            case EDIT_ESTADO:                
                return {
                    ...state,
                    lista: [...state.lista.filter(item=> item.id !== action.payload.id), action.payload]
                }
            case DELETE_ESTADO:
                return{
                    ...state,
                    lista: state.lista.filter(item=>item.id !== action.payload)
                }
            
            default:
                return state     

    }
}