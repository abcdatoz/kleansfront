import {GET_CLIENTE_DATOS_ENTREGAS,ADD_CLIENTE_DATOS_ENTREGA,EDIT_CLIENTE_DATOS_ENTREGA,DELETE_CLIENTE_DATOS_ENTREGA, SET_CLIENTE_DATOS_ENTREGA_MODE } from '../actions/clientesDatosEntregaActions'

const initialState = {
    lista:[],
    mode: ''
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CLIENTE_DATOS_ENTREGAS:
            return{
                ...state,
                lista: action.payload
            }
        case ADD_CLIENTE_DATOS_ENTREGA:
            return{
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_CLIENTE_DATOS_ENTREGA:
            console.log (action.payload)
            return {
                ...state,
                lista: [...state.lista.filter(item=> item.id !== action.payload.id), action.payload]
            }
        case DELETE_CLIENTE_DATOS_ENTREGA:
            return{
                ...state,
                lista: state.lista.filter(item=>item.id !== action.payload)
            }

        case SET_CLIENTE_DATOS_ENTREGA_MODE:
            return{
                ...state,
                mode: action.payload
            }
        
        default:
            return state        
    }
}