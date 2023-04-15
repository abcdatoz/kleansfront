import axios from 'axios'
import { tokenConfig } from './auth'
import { toast } from 'react-toastify';

export const GET_MUNICIPIOS ='GET_MUNICIPIOS'
export const ADD_MUNICIPIO ='ADD_MUNICIPIO'
export const EDIT_MUNICIPIO ='EDIT_MUNICIPIO'
export const DELETE_MUNICIPIO ='DELETE_MUNICIPIO'
 

const urlbase = require('../config/url.config').address


export const getMunicipios = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'municipios/', tokenConfig(getState))
        .then( res => {

            dispatch({
                type: GET_MUNICIPIOS,
                payload: res.data
            })
            
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const addMunicipio = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'municipios/', registro, tokenConfig(getState))
        .then (res => {

            dispatch({
                type: ADD_MUNICIPIO,
                payload: res.data
            })

            toast.success("El registro se agrego exitosamente")
        })
        .catch(err => toast.error(err.response.data.error)  )
        
}
export const editMunicipio = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `municipios/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_MUNICIPIO,
                payload: res.data
            })

            toast.success("El registro se modifico exitosamente")

             
        })
        .catch(err => toast.error(err.response.data.error)  )
}

export const deleteMunicipio = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `municipios/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_MUNICIPIO,
                payload: id
            })

            toast.success("El registro se elimino exitosamente")

        })
        .catch(err => toast.error(err.response.data.error)  )
}

 
