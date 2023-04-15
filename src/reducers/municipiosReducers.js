import {GET_MUNICIPIOS,ADD_MUNICIPIO,EDIT_MUNICIPIO,DELETE_MUNICIPIO } from '../actions/municipiosActions'

const initialState = {
    lista:[],
    mode: ''
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_MUNICIPIOS:
            return{
                ...state,
                lista: action.payload
            }
        case ADD_MUNICIPIO:
            return{
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_MUNICIPIO:            
            return {
                ...state,
                lista: [...state.lista.filter(item=> item.id !== action.payload.id), action.payload]
            }
        case DELETE_MUNICIPIO:
            return{
                ...state,
                lista: state.lista.filter(item=>item.id !== action.payload)
            }
 
        
        default:
            return state        
    }
}