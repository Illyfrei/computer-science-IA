import React from 'react'
import { BrowserRouter , Route } from "react-router-dom"
import StockChart from './StockChart'
import { base } from "../base"
import Valuator from "./Valuator"
import Login from "./Login"
import Logout from "./Logout"
import { app } from "../base"

class App extends React.Component {
    state = { //initialize the values of the state object
        stocks: [],
        error: "",
        Authenticated: false,
        loading: true,
        authFlag : true,
        latestUser: null,
        clickedExtra: false
    }
    
    handleClickedExtra = () => { //toggle the clicked extra state
        this.setState((prevState) => {
            return {clickedExtra: !(prevState.clickedExtra)} //state is the opposite of what it was before
        })
    }

    handleDeleteStocks = () => { //return an empty array when all stocks are deleted
        this.setState(()=> {
            return{
                stocks: [] //empty array
            }
        })
    }

    handleDeleteStock = (stockToRemove) => {
        this.setState(() => ({
            stocks: this.state.stocks.filter((stock) => { //javascript array method filter
                return stockToRemove !== stock.value; //only display the values that arent equal to stockToRemove
            })
        }))
    }

    handleAddStock = (e) => {
        e.preventDefault() //prevent default behavior of forms 
        const val = e.target.elements.stock.value.trim().toUpperCase() //access the value of the symbol input
        let Shares = parseInt(e.target.elements.shares.value.trim()) //access the value of the shares input
        if(isNaN(Shares)){
            Shares = 1 //set shares to 1 if the user doesnt enter int # of shares
        }
        if(val.length == 0){
            this.setState({
                error: "you havent entered anything" //check if the user has entered anything in
            })
        } else {
            fetch(`https://financialmodelingprep.com/api/v3/key-metrics/${val}?period=quarter&apikey=d9107249841b3015149757705196f758`) 
            .then(response => response.json()) //access the API with the value of the input and convert the response to json
            .then(data => {   
                const stock = { //configure the stock values based on what the API returns
                    value: val,
                    enterprise: parseInt(data[0].enterpriseValue),
                    enterpriseOverEbitda: parseInt(data[0].enterpriseValueOverEBITDA),
                    revenue: parseInt(data[0].revenuePerShare) * Shares,
                    revenueOverEbitda: (parseInt(data[0].revenuePerShare) * Shares) / (parseInt(data[0].enterpriseValue) / (parseInt(data[0].enterpriseValueOverEBITDA))),
                }        
                this.setState( () => {
                        return {
                            stocks : this.state.stocks.concat([stock]), //add the stock with fetched data to the stocks array
                            error: "" // if successfull, no error will be displayed
                        }
                    })
                })
                .catch(err => {
                    this.setState( () => {
                        return {
                            error : "couldnt fetch data" // if there was an mistake with data fetching, change the error message
                        }
                    })
                }) 
            } 
    }

    componentWillMount(){
        this.removeAuthListener = app.auth().onAuthStateChanged((user)=>{
           if(this.state.authFlag){
               this.setState({
                   authFlag: false  //create an authFlag so the user doesnt need to authenticate twice
               })

               if(user){
                this.setState({ // adjust the state if user was found
                    latestUser: user,
                    Authenticated: true,
                    loading: false
                })

            } else {
                this.setState({ //adjust the state if user was not found
                    latestUser: null,
                    Authenticated: false, 
                    loading: false
                })
            }
           }
        })

        this.stocksRef = base.syncState('stocks', { //synchronize react state with firebase database
            context: this,
            state: 'stocks',
            asArray: true
        })
    }

    componentWillUnmount(){
        this.removeAuthListener()
        base.removeBinding(this.stocksRef) //stop tracking the state when user closes the site
    }

    handleLatestUser = (user) => { //this function will be passed to the Login component
        if(user){
            this.setState({ //adjust state to success of authentication
                latestUser: user,
                Authenticated: true
            })
        } else {
            this.setState({ //adjust state to failure of authentication
                latestUser: null,
                Authenticated: false
            })
        }
    }

    render(){
        if(this.state.loading === true) {
            return(
                
                <div className="ui active centered inline loader"></div>

                
            )
        }

        return(
            <div className="">
                <BrowserRouter> {/* set up client side routing and pass down the required functions*/}
                    <Route 
                    exact path="/" 
                    render={(props)=> {
                        return <Valuator 
                        {...props}               
                        stocks = {this.state.stocks}
                        error = {this.state.error}
                        handleAddStock = {this.handleAddStock}
                        handleDeleteStock = {this.handleDeleteStock}
                        handleDeleteStocks = {this.handleDeleteStocks}
                        Authenticated = {this.state.Authenticated}
                        handleClickedExtra = {this.handleClickedExtra}
                        clickedExtra = {this.state.clickedExtra}/>
                        }}
                    />
                    <Route exact path="/Chart" render={props => <StockChart {...props} Authenticated={this.state.Authenticated} />}/>
                    <Route exact path="/login" render={props => <Login {...props} handleLatestUser={this.handleLatestUser}/>}/>
                    <Route exact path="/logout" component={Logout}/>
                </BrowserRouter>
                
            </div>
        )
    }
}

export default App
