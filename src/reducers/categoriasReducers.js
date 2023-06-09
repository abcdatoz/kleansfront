import {GET_CATEGORIAS,ADD_CATEGORIA,EDIT_CATEGORIA,DELETE_CATEGORIA  } from '../actions/categoriasActions'

const initialState = {
    lista:[],    
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CATEGORIAS:
            return{
                ...state,
                lista: action.payload
            }
        case ADD_CATEGORIA:
            return{
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_CATEGORIA:
            console.log (action.payload)
            return {
                ...state,
                lista: [...state.lista.filter(item=> item.id !== action.payload.id), action.payload]
            }
        case DELETE_CATEGORIA:
            return{
                ...state,
                lista: state.lista.filter(item=>item.id !== action.payload)
            }
    
        
            
        default:
            return state        
    }
}