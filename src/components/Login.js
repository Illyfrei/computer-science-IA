import React from "react"
import { Redirect } from 'react-router-dom'
import { app } from "../base"

class Login extends React.Component {
    
    state={
        redirect: false,
        error: null
    }

    Authenticate = (e) =>{
        e.preventDefault()
        const email = this.emailInput.value //reference to email input in the form
        const pswd = this.pswdInput.value //reference to password input in the form
        app.auth().fetchSignInMethodsForEmail(email)
        .then((providers)=>{
            if(providers.length === 0){
                // add new user to database
                return app.auth().createUserWithEmailAndPassword(email,pswd)
            } else {
                // log existing user in
                return app.auth().signInWithEmailAndPassword(email,pswd)
            }
        })
        .then((user)=>{ //if the user object is returned, update the state
            if(user.user && user.user.email){
                this.props.handleLatestUser(user) //change state of currUser
                this.loginForm.reset() //reset login form
                this.setState({ //update state
                    redirect: true,
                    error: null
                })

            }
            
        })
        .catch((err)=>{ //update the state of error to the firebase message
            this.setState({
                 error: err.message
            })
        })
    }

    render(){
        
        if(this.state.redirect === true){
           return <Redirect to="/"/>
        }
        
        return(
            <div>
                <div className="ui middle aligned center aligned grid" style={{"maxWidth":"400px", "margin": "auto", "marginTop":"250px"}}>
                    <div className="column">
                        <h2 className="ui image header">
                        <div className="content">
                            Log-in to your account  
                        </div>
                        </h2>
                        <form  className="ui large form" onSubmit={(e) => { this.Authenticate(e) }} ref={(form) => { this.loginForm = form }}>
                        <div className="ui stacked secondary  segment">
                            <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input 
                                name="email" 
                                type="email"
                                ref={(input)=>{this.emailInput=input}}
                                placeholder="E-mail address"/>
                        </div>
                            </div>
                            <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input 
                                name="pswd" 
                                type="password"
                                ref={(input)=>{this.pswdInput=input}}
                                placeholder="password"
                                />
                            </div>
                            </div>
                            
                            <input className="ui fluid primary large submit button" type="submit" value="Log In"></input>
                        </div>
                        </form>
                    </div>
                </div>

                {this.state.error 
                    && 
                    <div className="ui negative message" style={{"maxWidth":"450px", "margin": "auto"}}> 
                        <div className="header">
                            An error has occured
                        </div>
                        <p>{this.state.error}</p>
                    </div>
                }
                
            </div>
            
            )
    }
}

export default Login
