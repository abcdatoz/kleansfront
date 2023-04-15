import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getEstados, addEstado, editEstado, deleteEstado} from '../actions/estadosActions'
import {getMunicipios} from '../actions/municipiosActions'
import { toast } from 'react-toastify';

import { Table, Form, Button,  Modal, Icon } from 'semantic-ui-react'

const Estados = () => {

    const [open, setOpen] = React.useState(false)
    
    const [id, setId] = useState(null)

    const estados  = useSelector(state => state.estados.lista)  
    const municipios  = useSelector(state => state.municipios.lista)  

    const [clave, setClave] = useState('')
    const [nombre, setNombre] = useState('')     
    const [mode, setMode] = useState('')



    //dispatch
    const dispatch = useDispatch()

    useEffect(() => {      
      dispatch(getEstados())    
      dispatch(getMunicipios())    
    }, [])


    const add = () =>{                
        setMode('new')          

        setId(null)
        
        setClave('')
        setNombre('')
    }

    const editar = (item) => {
        
        setMode('edit')

        
        setId(item.id)        
        setClave(item.clave)
        setNombre(item.nombre)
        
        setOpen(true)
    }

    const remove = (item) => {

        let arr = municipios.filter(x => x.estadoId == item.id)

        if (arr.length == 0){
            dispatch(deleteEstado(item.id))
            dispatch(getEstados())        
        }else{
            toast.warn("El estado " + item.nombre + " no se puede eliminar porque hay municipios registrados")
        }

        
    }


    const guardar = (e) => {
        e.preventDefault()
        
        let data = {
            clave: clave,
            nombre: nombre
        }
                
         
        mode === 'new' 
            ? dispatch(addEstado(data))
            : dispatch(editEstado(data, id))
        
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
            <Table.HeaderCell>operaciones</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                estados                            
                .map ((item) => (
                    <Table.Row key={item.id}>
                    <Table.Cell>{item.clave}</Table.Cell>
                    <Table.Cell>{item.nombre}</Table.Cell>                    
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
            
            <h3>Estados</h3>            

            { modolista }


            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button inverted color='green' onClick={() => add() }>Agregar Registro</Button>}
                >
                <Modal.Header>Estados</Modal.Header>
                <Modal.Content image>
                    
                    <Modal.Description>
                   

                        {
                            mode == 'new'
                            ? (<Modal.Header>Agregando nuevo registro</Modal.Header>)
                            : (<Modal.Header>editando...</Modal.Header>)
                        }
 
                        <Form>

                            <label for="start">Clave </label><br />
                            <input 
                                type="text"
                                placeholder="clave del estado"
                                name="clave"
                                value={clave}
                                onChange={ e => setClave(e.target.value)}
                            />
                            <br/>

                            <br/>
                            <br/>

                            <label for="start">Nombre </label><br />
                            <input 
                                type="text"
                                placeholder="nombre del estado"
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


export default Estados

 
