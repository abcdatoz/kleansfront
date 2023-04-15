import axios from 'axios'
import { tokenConfig } from './auth'
import { toast } from 'react-toastify';

export const GET_CLIENTE_DATOS_ENTREGAS ='GET_CLIENTE_DATOS_ENTREGAS'
export const ADD_CLIENTE_DATOS_ENTREGA ='ADD_CLIENTE_DATOS_ENTREGA'
export const EDIT_CLIENTE_DATOS_ENTREGA ='EDIT_CLIENTE_DATOS_ENTREGA'
export const DELETE_CLIENTE_DATOS_ENTREGA ='DELETE_CLIENTE_DATOS_ENTREGA'
export const SET_CLIENTE_DATOS_ENTREGA_MODE = 'SET_CLIENTE_DATOS_ENTREGA_MODE'

const urlbase = require('../config/url.config').address


export const getDatosEntrega = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'clientesDatosEntrega/', tokenConfig(getState))
        .then( res => {
            dispatch({
                type: GET_CLIENTE_DATOS_ENTREGAS,
                payload: res.data
            })
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const addDatosEntrega = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'clientesDatosEntrega/', registro, tokenConfig(getState))
        .then (res => {

            dispatch({
                type: ADD_CLIENTE_DATOS_ENTREGA,
                payload: res.data
            })

            toast.success("El registro se agrego exitosamente")

        })
        .catch(err => toast.error(err.response.data.error)  )
        
}
export const editDatosEntrega = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `clientesDatosEntrega/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_CLIENTE_DATOS_ENTREGA,
                payload: res.data
            })

            toast.success("El registro se modifico exitosamente")

             
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const deleteDatosEntrega = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `clientesDatosEntrega/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_CLIENTE_DATOS_ENTREGA,
                payload: id
            })

            toast.success("El registro se elimino exitosamente")
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const setDatosEntregaMode = (newmode) => (dispatch) => {
    dispatch ({
        type: SET_CLIENTE_DATOS_ENTREGA_MODE,
        payload: newmode
    })
}

