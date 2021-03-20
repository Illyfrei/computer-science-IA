import React from "react"
import { Line } from 'react-chartjs-2'
import { Link, Redirect } from "react-router-dom"
class StockChart extends React.Component {
    state = { //initialize state values
        X: [],
        Y: [],
        error: null
    }
    
    fetchStock = (e) => {
        e.preventDefault() //prevent default form submission
        const Symbol = e.target.symbol.value.toUpperCase() //access the value of the event
        const Key = 'TVQ1JDC15WXQZHM7';
        const API = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${Symbol}&outputsize=compact&apikey=${Key}`;
        // API call with dynamic Key and Symbol values
        let Xaxis = []; //initialize array for x-axis
        let Yaxis = []; //initialize array for y-axis
        if(Symbol.length === 0){ //check if user entered anything
            this.setState({
              error: "you havent entered anything"
            })
        } else { 
          fetch(API) //fetch data from the alphavantage api
          .then(
            (response) => {
              return response.json(); //convert the response to json format
            }
          )
          .then(
            (StockInfo) => {
              for (let val in StockInfo['Time Series (Daily)']) { // loop through key value pairs returned from the API
                Xaxis.push(val); //add key to X-axis
                Yaxis.push(StockInfo['Time Series (Daily)'][val]['1. open']); //access opening prices and add them to Y-axis
              }
              this.setState({ //change the state X,Y values to match the X,Y values fetched from the API
                X: Xaxis, 
                Y: Yaxis,
                error: null // no error if values are added to X,Y state
              });
            })
          .catch(e => this.setState({
            error: "could not fetch data" //if nothing is fetched from API, return error
          }))
        }}
    render(){
        const data = {
            labels: this.state.X, //x-axis
            datasets: [ 
                {
                    label: 'Stock Performance the last 100 days',
                    data: this.state.Y, //y-axis
                    borderColor: [''],
                    backgroundColor: ['#C8CCF6'],
                    pointBackgroundColor: '#9C9FBD',
                    pointBorderColor: '#83869F'
                }
            ]
        }
        return(
            <div style={{"maxWidth": "1200px", "margin": "auto"}}>
              {
              this.props.Authenticated //only allow the user to access this page if
                                      // they are authenticated
                ? 
              (
                <div>
                <div className="ui pointing menu"> 
                    <Link className="item" to="/">go to Valuator</Link>
                    <Link className="item" to="/logout ">logout</Link>
                </div>

                <div className="ui segment">
                  <form className="ui form" onSubmit ={this.fetchStock}>
                    <div className="field">
                      <input className="" type ="text" name="symbol" placeholder="stock symbol" />
                      <button style={{"marginLeft": "540px", "marginTop":"10px"}} className="ui inverted primary button">Graph it !!</button>
                    </div>
                  </form>
                </div>
                { //show the error message specified in the error state of there is one, otherwise dont render this portion
                  this.state.error &&
                  <div className="ui negative message" style={{"maxWidth":"450px", "margin": "auto"}}> 
                        <div className="header">
                            An error has occured
                        </div>
                        <p>{this.state.error}</p>
                  </div>
                
                }
                {this.state.X.length > 0 ?
                  <Line 
                  data={data}
                  options={{
                    legend: {
                      display: true
                    },
                    scales: {
                      xAxes: [ //configure x-axis
                        {display: false}, 
                        {
                            type: 'linear',
                            ticks: {
                              max: 1,
                              stepSize: 0.125 //change the ticks
                          }
                          
                        }
                      ]
                    }
                  }}
                />
                  
                  : <h1></h1>}
                </div>
              ) 
              : 
              (
                //if the user is not authenticated, redirect them to the login page
                <Redirect to="/login" />
              )
              }
          </div>
        )
    }
}

export default StockChart