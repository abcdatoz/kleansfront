import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import logo from '../../logo.png';
import {
    Container,    
    Dropdown,  
    Image,    
    Menu,    
    Icon
  } from 'semantic-ui-react'

  

class Header extends Component {
    render () {
        const { isAuthenticated, username } = this.props.auth

        const authLinks = (

            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as='a' header>
                        <Image size='small' src={logo} style={{ marginRight: '1.5em' }} />                        
                    </Menu.Item>
                    <Menu.Item as='a'><Link  to="/">Home</Link></Menu.Item>
                    <Menu.Item as='a'><Link  to="/clientes">Clientes</Link></Menu.Item>


                   
                    
                    <Dropdown item simple text='Catalogos'>
                        <Dropdown.Menu>
                            <Dropdown.Item>Estados <Link to="/estados">Estados</Link></Dropdown.Item>
                            <Dropdown.Item>Municipios<Link  to="/municipios">Municipios</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item> Categorias <Link style={{color: "eeeeee"}}  to="/categorias"> </Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item as='a'><strong>{username ? `Usuario:  ${username}` : ""}</strong></Menu.Item>
                    <Menu.Item as='a'> <a href="#" onClick={this.props.logout }>Salir</a> </Menu.Item>
                </Container>
            </Menu>



        )


        const guestLinks = (
           

            <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='small' src={logo} style={{ marginRight: '1.5em' }} />                    
                    
                </Menu.Item>
                <Menu.Item as='a'><Link  to="/">Home</Link></Menu.Item>
                <Menu.Item as='a'><Link  to="/login">Login</Link></Menu.Item>                
                 
            </Container>
            </Menu>
            
        )



        return (
            <nav>
                {isAuthenticated 
                    ? authLinks
                    : guestLinks
                }
            </nav>
        )
    }
}

const mapState = state => ({ auth: state.auth })

export default connect(mapState, {logout}) (Header)
