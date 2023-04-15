// import './App.css';

import Header from  './components/layouts/Header'
import PrivateRoute from './components/common/PrivateRoute'
import Login from './components/accounts/Login'
import Register from './components/accounts/Register'

import Home from './components/Home'
import Estados from './components/Estados'
import Municipios from './components/Municipios'
import Categorias from './components/Categoria'
import Clientes from './components/Cliente'
import DatosEntrega from './components/DatosEntrega'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Switch, } from 'react-router-dom'
import {
  Container,
  Divider,  
  Image,
  List,  
  Segment,
} from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      
      <Header />
      
   

      <Container text style={{ marginTop: '7em' }}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          
            <PrivateRoute exact path="/estados" component={Estados} />
            <PrivateRoute exact path="/municipios" component={Municipios} />
            <PrivateRoute exact path="/categorias" component={Categorias} />
            <PrivateRoute exact path="/clientes" component={Clientes} />
            <PrivateRoute exact path="/datosEntrega" component={DatosEntrega} />

        </Switch>
      </Container>

      <ToastContainer />

    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        
        
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Aqua Mariel
          </List.Item>
          <List.Item as='a' href='#'>
            Tel :  2282555379
          </List.Item>
          <List.Item as='a' href='#'>
            contacto@corporativoaquamariel.com
          </List.Item>
          <List.Item as='a' href='#'>
            Productos de Limpieza
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
 

      
 
  );
}
export default App;
 