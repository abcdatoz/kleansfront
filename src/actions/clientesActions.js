import axios from 'axios'
import { tokenConfig } from './auth'
import { toast } from 'react-toastify';

export const GET_CLIENTES ='GET_CLIENTES'
export const ADD_CLIENTE ='ADD_CLIENTE'
export const EDIT_CLIENTE ='EDIT_CLIENTE'
export const DELETE_CLIENTE ='DELETE_CLIENTE'
export const SET_CLIENTE_MODE = 'SET_CLIENTE_MODE'
export const SET_CLIENTE_ID = 'SET_CLIENTE_ID'

const urlbase = require('../config/url.config').address


export const getClientes = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'clientes/', tokenConfig(getState))
        .then( res => {
            dispatch({
                type: GET_CLIENTES,
                payload: res.data
            })
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const addCliente = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'clientes/', registro, tokenConfig(getState))
        .then (res => {

            dispatch({
                type: ADD_CLIENTE,
                payload: res.data
            })

            toast.success("El registro se agrego exitosamente")

        })
        .catch(err => toast.error(err.response.data.error)  )
        
}
export const editCliente = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `clientes/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_CLIENTE,
                payload: res.data
            })

            toast.success("El registro se modifico exitosamente")

             
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const deleteCliente = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `clientes/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_CLIENTE,
                payload: id
            })

            toast.success("El registro se elimino exitosamente")

        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const setClienteMode = (newmode) => (dispatch) => {
    dispatch ({
        type: SET_CLIENTE_MODE,
        payload: newmode
    })
}

export const setClienteID = (newID) => (dispatch) => {
    dispatch({
        type: SET_CLIENTE_ID,
        payload: newID
    })
}