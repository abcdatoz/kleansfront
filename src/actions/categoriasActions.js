import axios from 'axios'
import { tokenConfig } from './auth'
import { toast } from 'react-toastify';

export const GET_CATEGORIAS ='GET_CATEGORIAS'
export const ADD_CATEGORIA ='ADD_CATEGORIA'
export const EDIT_CATEGORIA ='EDIT_CATEGORIA'
export const DELETE_CATEGORIA ='DELETE_CATEGORIA'
 
const urlbase = require('../config/url.config').address


export const getCategorias = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'categorias/', tokenConfig(getState))
        .then( res => {

            dispatch({
                type: GET_CATEGORIAS,
                payload: res.data
            })
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const addCategoria = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'categorias/', registro, tokenConfig(getState))
        .then (res => {

            dispatch({
                type: ADD_CATEGORIA,
                payload: res.data
            })

            toast.success("El registro se agrego exitosamente")
        })
        .catch(err => toast.error(err.response.data.error)  )
        
}
export const editCategoria = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `categorias/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_CATEGORIA,
                payload: res.data
            })

            toast.success("El registro se modifico exitosamente")

             
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const deleteCategoria = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `categorias/${id}`,  tokenConfig(getState))    
        .then( res => {
            toast.success("El registro se elimino exitosamente")
            
            dispatch ({
                type: DELETE_CATEGORIA,
                payload: id
            })
            
        })
        .catch(err => toast.error(err.response.data.error)  )
}

 