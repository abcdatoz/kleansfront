import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getEstados} from '../actions/estadosActions'
import {getMunicipios} from '../actions/municipiosActions'
import {getCategorias} from '../actions/categoriasActions'
import {getClientes, addCliente, editCliente, deleteCliente, setClienteID} from '../actions/clientesActions'
import {getDatosEntrega } from '../actions/clientesDatosEntregaActions'
import { toast } from 'react-toastify';
 
import { useHistory } from "react-router-dom";

import { Table, Button,  Modal, Grid, Form, Icon } from 'semantic-ui-react'



const Clientes = () => {
    
    let history = useHistory();
    const [open, setOpen] = React.useState(false)

    const [filtro, setFiltro] = useState('')

    //useStates
    const [id, setId] = useState(null)

    const estados  = useSelector(state => state.estados.lista)  
    const municipios  = useSelector(state => state.municipios.lista)  
    const categorias  = useSelector(state => state.categorias.lista)  
    
    const clientes  = useSelector(state => state.clientes.lista)      
    const datosEntrega  = useSelector(state => state.datosEntrega.lista)      
    const [mode, setMode] = useState('')

    const initClient = {nombre: '', 
                        apellidos: '',
                        razonSocial:'',
                        rfc:'',
                        calle:'',
                        numeroExterior:'',
                        referencia:'',
                        colonia:'',
                        localidad:'',
                        cp:'',
                        whatsapp:'',
                        telefono:'',
                        email:'',
                        categoria:'',
                        estado:'',
                        municipio:'',
                    };

    const [cliente, setCliente] = useState(initClient);



    //dispatch
    const dispatch = useDispatch()

    useEffect(() => {      
      dispatch(getEstados())    
      dispatch(getMunicipios())    
      dispatch(getCategorias())    
      
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


    const nombreMunicipio = (id) => {
        let arr = municipios.filter(x => x.id == id)
      
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


    const nombreCategoria = (id) => {
        let arr = categorias.filter(x => x.id == id)
      
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
        
        setCliente(initClient)        

    }

    const editar = (item) => {
        setMode('edit')

        
        setId(item.id)        
        setCliente({
            ...cliente,
            nombre: item.nombre, 
            apellidos: item.apellidos, 
            razonSocial: item.razonSocial, 
            rfc: item.rfc, 
            calle: item.calle, 
            numeroExterior: item.numeroExterior, 
            referencia: item.referencia, 
            colonia: item.colonia, 
            cp: item.cp, 
            telefono: item.telefono, 
            categoria: item.categoriaId,
            estado: item.estadoId,
            municipio: item.municipioId
        })
         
        setOpen(true)

    }

    const remove = (item) => {
        let arr = datosEntrega.filter(x => x.clienteId == item.id)
        
        if (arr.length > 0 ){
            toast.warn("El cliente " + item.nombre + " no se puede eliminar porque tiene datos de entrega registrados")
        }else{
            dispatch(deleteCliente(item.id))
            dispatch(getClientes())            
         }
    }


    const addDomicilio = (item) => {
        dispatch(setClienteID(item.id))

        history.push("/datosentrega");
    }


    const guardar = (e) => {
        e.preventDefault()
        
         
        mode === 'new' 
            ? dispatch(addCliente(cliente))
            : dispatch(editCliente(cliente, id))

    
        setMode('list')
        setOpen(false)
   
        
    }


    
    const modolista = (
        <>

            <input 
                type="text"                
                name="filtro"
                value={filtro}
                placeholder="filtro..."
                onChange={ e => setFiltro(e.target.value)}
            />

        <Table celled striped>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>RFC</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Razon Social</Table.HeaderCell>
            <Table.HeaderCell>Domicilio</Table.HeaderCell>
            <Table.HeaderCell>whatsapp</Table.HeaderCell>
            <Table.HeaderCell>operaciones</Table.HeaderCell>
            <Table.HeaderCell>Datos Entrega</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                clientes         
                .filter(x=> x.nombre.includes(filtro) 
                        || x.apellidos.includes(filtro)
                        || x.rfc.includes(filtro)
                        || x.razonSocial.includes(filtro)
                        || x.calle.includes(filtro)
                        || x.colonia.includes(filtro)
                        || x.whatsapp.includes(filtro)
                ).map ((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.rfc}</Table.Cell>
                        <Table.Cell>{item.nombre} {item.apellidos}</Table.Cell>
                        <Table.Cell>{item.razonSocial}</Table.Cell>
                        <Table.Cell>{item.calle} #{item.numeroExterior}, col. {item.colonia}   </Table.Cell>
                        <Table.Cell>{item.whatsapp}</Table.Cell>
                        
                        <Table.Cell> 

                            <Icon name='edit' size='large' onClick={ () => editar(item)} />

                            <Icon name='trash' size='large' onClick={ () => remove(item)} />
                            
                        </Table.Cell>               

                        <Table.Cell> 

                         <Icon name='angle double right' size='large' onClick={ () => addDomicilio(item)} />
                        
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
            
            <h3>Clientes</h3>            

            {   modolista  }
            
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button inverted color='green' onClick={() => add() }>Agregar Registro</Button>}
                >
                <Modal.Header>Clientes</Modal.Header>
                <Modal.Content image>
                    
                    <Modal.Description>
                   
                        {
                            mode == 'new'
                            ? (<Modal.Header>Agregando nuevo registro</Modal.Header>)
                            : (<Modal.Header>editando...</Modal.Header>)
                        }
                    

                    <Form>

                    <Grid columns={3} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <label for="start">Nombre </label><br />
                                <input 
                                    type="text"                
                                    name="nombre"
                                    value={cliente.nombre}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />

                                <br/>
                                <label for="start">apellidos </label><br />
                                <input 
                                    type="text"                
                                    name="apellidos"
                                    value={cliente.apellidos}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />

                                <br/>   
                                <label for="start">razón social </label><br />
                                <input 
                                    type="text"                
                                    name="razonSocial"
                                    value={cliente.razonSocial}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">rfc </label><br />
                                <input 
                                    type="text"                
                                    name="rfc"
                                    value={cliente.rfc}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />


                                <br/>
                                <label for="start">Categoria </label><br />
                                <select 
                                    className="form-control"
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                    name="categoria"
                                    value={cliente.categoria}>
                                    <option value="null">Seleccione una categoria</option>                                
                                    {categorias.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.nombre}
                                    </option>
                                ))}
                                </select>

                            </Grid.Column>
                            <Grid.Column>

                                <label for="start">calle</label><br />
                                <input 
                                    type="text"                
                                    name="calle"
                                    value={cliente.calle}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start"># ext</label><br />
                                <input 
                                    type="text"                
                                    name="numeroExterior"
                                    value={cliente.numeroExterior}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">referencia</label><br />
                                <input 
                                    type="text"                
                                    name="referencia"
                                    value={cliente.referencia}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">colonia</label><br />
                                <input 
                                    type="text"                
                                    name="colonia"
                                    value={cliente.colonia}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">localidad</label><br />
                                <input 
                                    type="text"                
                                    name="localidad"
                                    value={cliente.localidad}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">cp</label><br />
                                <input 
                                    type="text"                
                                    name="cp"
                                    value={cliente.cp}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />                             


                            </Grid.Column>
                         
                            <Grid.Column>

                                <label for="start">whatsapp</label><br />
                                <input 
                                    type="text"                
                                    name="whatsapp"
                                    value={cliente.whatsapp}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">telefono</label><br />
                                <input 
                                    type="text"                
                                    name="telefono"
                                    value={cliente.telefono}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">email</label><br />
                                <input 
                                    type="text"                
                                    name="email"
                                    value={cliente.email}
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                />


                                    
                                    <br/>
                                <label for="start">Estado </label><br />
                                <select 
                                    className="form-control"
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                    name="estado"
                                    value={cliente.estado}>
                                    <option value="null">Seleccione un estado</option>                                
                                    {estados.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.clave} - {x.nombre}
                                    </option>
                                ))}
                                </select>

                                    
                                    <br/>
                                <label for="start">Municipio </label><br />
                                <select 
                                    className="form-control"
                                    onChange={ e => setCliente({...cliente, [e.target.name]: e.target.value})}
                                    name="municipio"
                                    value={cliente.municipio}>
                                    <option value="null">Seleccione un municipio</option>                                
                                    {municipios
                                    .filter (x => x.estadoId == cliente.estado)
                                    .map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.nombre}
                                    </option>
                                ))}
                                </select>
                             


                            </Grid.Column>
                         
                        </Grid.Row>
                    </Grid>


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


export default Clientes

 
