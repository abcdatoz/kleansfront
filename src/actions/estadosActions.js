import axios from 'axios'
import { tokenConfig } from './auth'
import { toast } from 'react-toastify';

export const GET_ESTADOS ='GET_ESTADOS'
export const ADD_ESTADO ='ADD_ESTADO'
export const EDIT_ESTADO ='EDIT_ESTADO'
export const DELETE_ESTADO ='DELETE_ESTADO'

const urlbase = require('../config/url.config').address

export const getEstados = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'estados/')
        .then( res => {

            dispatch({
                type: GET_ESTADOS,
                payload: res.data
            })
        })
        .catch(err => toast.error(err.response.data.error)  )
}
 



export const addEstado = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'estados/', registro, tokenConfig(getState))
        .then (res => {

            dispatch({
                type: ADD_ESTADO,
                payload: res.data
            })

            toast.success("El registro se agrego exitosamente")
        })
        .catch(err => toast.error(err.response.data.error)  )
        
}
export const editEstado = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `estados/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_ESTADO,
                payload: res.data
            })

            toast.success("El registro se modifico exitosamente")

             
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const deleteEstado = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `estados/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_ESTADO,
                payload: id
            })

            toast.success("El registro se elimino exitosamente")

        })
        .catch(err => toast.error(err.response.data.error)  )
}

 
