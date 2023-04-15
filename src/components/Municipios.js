import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getEstados} from '../actions/estadosActions'
import {getMunicipios, addMunicipio,deleteMunicipio, editMunicipio } from '../actions/municipiosActions'
import {getClientes } from '../actions/clientesActions'
import {getDatosEntrega } from '../actions/clientesDatosEntregaActions'
import { toast } from 'react-toastify';


import { Table, Form, Button,  Modal ,Icon} from 'semantic-ui-react'

const Municipios = () => {


   const [open, setOpen] = React.useState(false)


    //useStates
    const [id, setId] = useState(null)

    const estados  = useSelector(state => state.estados.lista)  
    const municipios  = useSelector(state => state.municipios.lista)  
    const clientes  = useSelector(state => state.clientes.lista)  
    const datosEntrega  = useSelector(state => state.datosEntrega.lista)  

    const [nombre, setNombre] = useState('')     
    const [estado, setEstado] = useState('')

    const [mode, setMode] = useState('')


    //dispatch
    const dispatch = useDispatch()

    useEffect(() => {      
      dispatch(getEstados())    
      dispatch(getMunicipios())    
      dispatch(getClientes())    
      dispatch(getDatosEntrega())    
    }, [])


    const nombreEstado = (id) => {
        let arr = estados.filter(x => x.id == id)
      
        if (arr.length > 0 ){
            return (
                <td>{ arr[0].nombre }</td>
            )

        }else{
            return (
                <td></td>
            )
        }

       
    }


    const add = () =>{                
        setMode('new')          

        setId(null)
        
        setNombre('')
        setEstado('')
    }

    const editar = (item) => {
        
        setMode('edit')

        
        setId(item.id)        
        setNombre(item.nombre)
        setEstado(item.estadoId)
        
        setOpen(true)
    }

    const remove = (item) => {
        
        let arr = clientes.filter(x => x.municipioId == item.id)
        let arr2 = datosEntrega.filter(x => x.municipioId == item.id)
        
        if (arr.length > 0 || arr2.length > 0){
            toast.warn("El municipio " + item.nombre + " no se puede eliminar porque hay registros de clientes asociados al municipio")
        }else{
            dispatch(deleteMunicipio(item.id))
            dispatch(getMunicipios())        
        }

    }



    const guardar = (e) => {
        e.preventDefault()
        
        let data = {
            nombre: nombre,
            estado: estado
        }
                
         
        mode === 'new' 
            ? dispatch(addMunicipio(data))
            : dispatch(editMunicipio(data, id))
        
         setMode('list')
         setOpen(false)
        
    }


    
    const modolista = (
        <>
        
        <Table celled>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Clave</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>ops</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                municipios                            
                .map ((item) => (
                    <Table.Row key={item.id}>
                    <Table.Cell>{item.nombre}</Table.Cell>
                    <Table.Cell>{nombreEstado(item.estadoId)}  </Table.Cell>
                    <Table.Cell> {
                            item.activo
                            ? (<td> Activo</td>)
                            : (<td> Baja </td>)
                        }</Table.Cell>
                    
                    <Table.Cell> 
                        <Icon name='edit' size='large' onClick={ () => editar(item)} />

                        <Icon name='trash' size='large' onClick={ () => remove(item)} />
                    </Table.Cell>

                            
                    </Table.Row>                                     
                ))
              }
           
        </Table.Body>
    </Table>
       

        </>
    )



    return (
        <>
            
            <h3>Municipios</h3>            

            { modolista }


            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button inverted color='green' onClick={() => add() }>Agregar Registro</Button>}
                >
                <Modal.Header>Municipios</Modal.Header>
                <Modal.Content image>
                    
                    <Modal.Description>
                   

                        {
                            mode == 'new'
                            ? (<Modal.Header>Agregando nuevo registro</Modal.Header>)
                            : (<Modal.Header>editando...</Modal.Header>)
                        }
 
                        <Form>

                            <label for="start">Estado </label><br />
                            <select 
                                className="form-control"
                                onChange={ e => setEstado(e.target.value) } 
                                name="estado"
                                value={estado}>
                                <option value="null">Seleccione un estado</option>                                
                                {estados.map(x => (
                                <option key={x.id} value={x.id}>
                                    {x.clave} - {x.nombre}
                                </option>
                            ))}
                            </select>

                            <br/>
                            <br/>

                            <label for="start">Nombre </label><br />
                            <input 
                                type="text"
                                placeholder="nombre del municipio"
                                name="nombre"
                                value={nombre}
                                onChange={ e => setNombre(e.target.value)}
                            />
                            <br/>


    
                            </Form>






                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>

                    <Button color='green' onClick={ guardar }>Guardar</Button>

                    <Button color='grey'onClick={() => setOpen(false)}>Cancelar</Button>
                   
                </Modal.Actions>
                </Modal>

            
        </>        
    )
};


export default Municipios

 
