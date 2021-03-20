import React from "react"
import { Redirect } from "react-router-dom"
import { app } from "../base"

class Logout extends React.Component {
    state={
        redirect: false
    }
    
    componentWillMount(){
        app.auth().signOut().then((user)=>{ //sign the user out and redirect them
            this.setState({
                redirect: true
            })
        })
    }

    render(){

        if(this.state.redirect === true){
            return <Redirect to="/login"/>
        }

        return(
            <div class="ui active centered inline loader"></div>

        )
        
    }
}

export default Logout