import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getEstados} from '../actions/estadosActions'
import {getMunicipios} from '../actions/municipiosActions' 
import {getClientes, setClienteID} from '../actions/clientesActions'
import {getDatosEntrega, addDatosEntrega, editDatosEntrega, deleteDatosEntrega } from '../actions/clientesDatosEntregaActions'
import { useHistory } from "react-router-dom";

 
import { Table, Grid, Button,  Modal, Form, Icon } from 'semantic-ui-react'



const DatosEntrega = () => {


    const [open, setOpen] = React.useState(false)
    const [filtro, setFiltro] = useState('')
    

    //useStates
    const [id, setId] = useState(null)

    const estados  = useSelector(state => state.estados.lista)  
    const municipios  = useSelector(state => state.municipios.lista)  
    
    const clientes  = useSelector(state => state.clientes.lista)      
    const idCliente  = useSelector(state => state.clientes.idCliente)      
    
    const datosEntrega  = useSelector(state => state.datosEntrega.lista)  
    
    const [mode, setMode] = useState('')

    const datoInicial = {
        calle:'',
        numeroExterior:'',
        referencia:'',
        colonia:'',
        localidad:'',
        coordenadas:'',
        telefono:'',
        datosEntregaDomicilio:'',
        asignacionRuta:'',
        cliente: idCliente,
        estado:'',
        municipio:'',
    };

    const [datoEntrega, setDatoEntrega] = useState(datoInicial);


    let history = useHistory();


    //dispatch
    const dispatch = useDispatch()

    useEffect(() => {      
      dispatch(getEstados())    
      dispatch(getMunicipios())    
      
      dispatch(getClientes())    
      dispatch(getDatosEntrega())
    }, [])



    const subheader = (
        <>
            <div className="wrapper">
                  
                <div className="grid-item">
                    Cliente : 
                    { clientes.filter(x=>x.id == idCliente)[0].nombre } { clientes.filter(x=>x.id == idCliente)[0].apellidos }     
                </div>
                                
                <div> 
                    <Button color='green' onClick={ () => regresar()}>Regresar</Button>

                </div>  

            </div>        
        </> 
    )



    const regresar = () => {
        dispatch(setClienteID(''))
        history.push("/clientes")
    }




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
 
    const add = () =>{                

        setMode('new')          

        setId(null)
        
        setDatoEntrega(datoInicial)

    }

    const editar = (item) => {
        
        setMode('edit')        
        setId(item.id) 

        setDatoEntrega({
            ...datoEntrega,
            calle:item.calle, 
            numeroExterior: item.numeroExterior, 
            referencia: item.referencia, 
            colonia: item.colonia, 
            localidad: item.localidad, 
            coordenadas: item.coordenadas, 
            telefono: item.telefono, 
            datosEntregaDomicilio: item.datosEntregaADomicilio, 
            asignacionRuta: item.asignacionRuta,
            cliente: item.clienteId,
            estado: item.estadoId,
            municipio: item.municipioId
        })
         
        setOpen(true)
        
    }

    const remove = (item) => {
        dispatch(deleteDatosEntrega(item.id))
        dispatch(getDatosEntrega())        
    }

     

    const guardar = (e) => {
        e.preventDefault()
        mode === 'new' 
            ? dispatch(addDatosEntrega(datoEntrega))
            : dispatch(editDatosEntrega(datoEntrega, id))

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

            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Domicilio</Table.HeaderCell>
                    <Table.HeaderCell>Localidad</Table.HeaderCell>
                    <Table.HeaderCell>Muncipio</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell>Datos de Entrega</Table.HeaderCell>
                    <Table.HeaderCell>Asignacion de Ruta</Table.HeaderCell>
                    <Table.HeaderCell>ops</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        datosEntrega
                        .filter (x => x.clienteId == idCliente && (x.calle.includes(filtro) 
                                                                || x.localidad.includes(filtro)                                                                
                                                                || x.datosEntregaADomicilio.includes(filtro)
                                                                || x.asignacionRuta.includes(filtro)
                                                                ))                            
                        .map ((item) => (
                            <Table.Row key={item.id}>
                            <Table.Cell>{item.calle} {item.numeroExterior}</Table.Cell>
                            <Table.Cell>{item.localidad} </Table.Cell>
                            <Table.Cell>{nombreMunicipio(item.municipioId)}  </Table.Cell>
                            <Table.Cell>{nombreEstado(item.estadoId)}  </Table.Cell>
                            <Table.Cell>{item.datosEntregaADomicilio}</Table.Cell>
                            <Table.Cell>{item.asignacionRuta}</Table.Cell>
                             
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
           {subheader}
           <br />
            <h3>Datos Entrega</h3>            

            { modolista }
            
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

                                <label for="start">calle</label><br />
                                <input 
                                    type="text"                
                                    name="calle"
                                    value={datoEntrega.calle}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
                                 <br/>
                                <label for="start"># ext</label><br />
                                <input 
                                    type="text"                
                                    name="numeroExterior"
                                    value={datoEntrega.numeroExterior}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">referencia</label><br />
                                <input 
                                    type="text"                
                                    name="referencia"
                                    value={datoEntrega.referencia}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">colonia</label><br />
                                <input 
                                    type="text"                
                                    name="colonia"
                                    value={datoEntrega.colonia}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">localidad</label><br />
                                <input 
                                    type="text"                
                                    name="localidad"
                                    value={datoEntrega.localidad}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />

                            </Grid.Column>
                            <Grid.Column>

                                <label for="start">coordenadas</label><br />
                                <input 
                                    type="text"                
                                    name="coordenadas"
                                    value={datoEntrega.coordenadas}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">telefono</label><br />
                                <input 
                                    type="text"                
                                    name="telefono"
                                    value={datoEntrega.telefono}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">Datos Entrega</label><br />
                                <input 
                                    type="text"                
                                    name="datosEntregaDomicilio"
                                    value={datoEntrega.datosEntregaDomicilio}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
                                <br/>
                                <label for="start">asignacion de ruta</label><br />
                                <input 
                                    type="text"                
                                    name="asignacionRuta"
                                    value={datoEntrega.asignacionRuta}
                                    onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                />
   

                            </Grid.Column>
                         
                            <Grid.Column>

                                    <label for="start">Estado </label><br />
                                    <select 
                                        className="form-control"
                                        onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                        name="estado"
                                        value={datoEntrega.estado}>
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
                                        onChange={ e => setDatoEntrega({...datoEntrega, [e.target.name]: e.target.value})}
                                        name="municipio"
                                        value={datoEntrega.municipio}>
                                        <option value="null">Seleccione un municipio</option>                                
                                        {municipios
                                        .filter (x => x.estadoId == datoEntrega.estado)
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


export default DatosEntrega