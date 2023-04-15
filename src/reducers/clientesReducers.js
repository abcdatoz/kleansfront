import {GET_CLIENTES,ADD_CLIENTE,EDIT_CLIENTE,DELETE_CLIENTE, SET_CLIENTE_MODE, SET_CLIENTE_ID } from '../actions/clientesActions'

const initialState = {
    lista:[],
    mode: '',
    idCliente: ''
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CLIENTES:
            return{
                ...state,
                lista: action.payload
            }
        case ADD_CLIENTE:
            return{
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_CLIENTE:
            console.log (action.payload)
            return {
                ...state,
                lista: [...state.lista.filter(item=> item.id !== action.payload.id), action.payload]
            }
        case DELETE_CLIENTE:
            return{
                ...state,
                lista: state.lista.filter(item=>item.id !== action.payload)
            }

        case SET_CLIENTE_MODE:
            return{
                ...state,
                mode: action.payload
            }

            
        
        case SET_CLIENTE_ID:
            return{
                ...state,
                idCliente: action.payload
            }
        

        default:
            return state        
    }
}