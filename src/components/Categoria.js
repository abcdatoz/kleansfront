import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCategorias, addCategoria, editCategoria, deleteCategoria } from '../actions/categoriasActions'
import {getClientes } from '../actions/clientesActions'
import { toast } from 'react-toastify';


import {Table,Form, Button,  Modal, Icon } from 'semantic-ui-react'


const Categoria = () => {

    //useStates
    const [id, setId] = useState(null)
    const [open, setOpen] = React.useState(false)

    const [clave, setClave] = useState('')
    const [nombre, setNombre] = useState('')

    const [mode, setMode] = useState('')


    //selectors
    const categorias  = useSelector(state => state.categorias.lista)
    const clientes  = useSelector(state => state.clientes.lista)

    
    //dispatch
    const dispatch = useDispatch()


    // let history = useHistory();
    useEffect(() => {                
        dispatch(getCategorias())
        dispatch(getClientes())
    },[])

 
 
    const add = () =>{                
        setMode('new')          

        setId(null)
        
        setNombre('')
        setClave('')
    }

    const editar = (item) => {
        
        setMode('edit')

        
        setId(item.id)        
        setNombre(item.nombre)
        setClave(item.clave)
        
        setOpen(true)
    }


    const remove = (item) => {
        let arr = clientes.filter(x => x.categoriaId == item.id)
        
        if (arr.length == 0){
            dispatch(deleteCategoria(item.id))
            dispatch(getCategorias())                    
        }else{
            toast.warn("La categoria " + item.nombre + " no se puede eliminar porque hay clientes registrados con esa categoria")
        }

    }

    const guardar = (e) => {
        e.preventDefault()
        
        let data = {
            clave: clave,
            nombre: nombre
        }
         
         
        mode === 'new' 
            ? dispatch(addCategoria(data))
            : dispatch(editCategoria(data, id))

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
            <Table.HeaderCell>operaiones</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                categorias                            
                .map ((item) => (
                    <Table.Row key={item.id}>
                    <Table.Cell>{item.clave}  </Table.Cell>
                    <Table.Cell>{item.nombre}</Table.Cell>
                    <Table.Cell> {
                            item.activo
                            ? (<td> Activa</td>)
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
            
            <h3>categorias</h3>            

            { modolista }
            


            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button inverted color='green' onClick={() => add() }>Agregar Registro</Button>}
                >
                <Modal.Header>Categorias</Modal.Header>
                <Modal.Content image>
                    
                    <Modal.Description>
                    
                        <Form>
                        

                            <label for="start">Clave </label><br />
                            <input 
                                type="text"
                                placeholder="clave de la categoria"
                                name="clave"
                                value={clave}
                                onChange={ e => setClave(e.target.value)}
                            />
                            <br/>
            
                            <label for="start">Nombre </label><br />
                            <input 
                                type="text"
                                placeholder="indique el nombre de la categoria"
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
    
        
    
}


export default Categoria