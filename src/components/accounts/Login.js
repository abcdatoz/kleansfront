import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import {    
    Form, Button        
  } from 'semantic-ui-react'



export class Login extends Component {

    state = {
        username:'',
        password:''
    }


    onSubmit = e => {
        e.preventDefault()
        
        const {username, password} = this.state
        const {login } = this.props
        
        
        login(username, password)
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to='/' />
        }


        const {username, password} = this.state

        return(
            <>
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>username</label>
                        <input 
                            type = "text"
                            className = "form-control"
                            name = "username"
                            onChange = {this.onChange}
                            value = {username}
                         />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type = "password"
                            className = "form-control"
                            name = "password"
                            onChange = {this.onChange}
                            value = {password}
                         />
                    </div>
                    <br />
                    <div className="form-group">
                     <Button inverted color='green' type="submit">Login</Button>
                    </div>

                </Form>

                <p> ¿No tienes cuenta?<Link to="/register">Registrate...</Link> </p>
            </>
        )

    }

}


const mapState = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapState, {login}) (Login)