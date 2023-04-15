import { combineReducers } from 'redux'

import auth from './auth'
import estados from './estadosReducers'
import municipios from './municipiosReducers'
import categorias from './categoriasReducers'
import clientes from './clientesReducers'
import datosEntrega from './clientesDatosEntregasReducers'


export default combineReducers({
    auth,
    estados, 
    municipios,
    categorias,
    clientes,
    datosEntrega,
})