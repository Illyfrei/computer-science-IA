import React from "react"
import Stocks from "./Stocks"
import SearchBar from "./SearchBar"
import { Link, Redirect } from "react-router-dom"

class Valuator extends React.Component {
    constructor(props){
        super(props)
    }
    
    quickSort = (array) => {
        let smallArr = [] //create smaller than pivot subarray
        let largeArr = [] //create bigger than pivot subarray
          if (array.length <= 1)
              return array; // base case for recursion
        let pivot = array.shift() //select first item as pivot
        array.forEach((item)=> { // loop through the array
            if(item <= pivot){ //item smaller than pivot?
                smallArr.push(item) // add to smallArr subarray
            } else { //item greater than pivot?
                largeArr.push(item) //add to largeArr subbarray
            }
        })
        return this.quickSort(smallArr).concat(pivot, this.quickSort(largeArr)); //repeat until array is sorted
    }

    findMedian = (stocks, whatToCalculate) => { 
        const arr = [] //initialize an array
        stocks.forEach(stock => {
            arr.push(stock[whatToCalculate]) //acces the key which should be calculated and add it to the array
        })
        const sorted = this.quickSort(arr)//arr.sort((a, b) => a - b) //quick sort the array
        const isEven = sorted.length % 2 === 0 // is the array length even?
        if(whatToCalculate == "revenueOverEbitda"){ //format the median to six digits if revenueOverEbitda is in question
            if(isEven === true){ // even array length ?
                return sorted[sorted.length / 2 - 1].toFixed(6) // access middle value format to 6 digits
            } else { // odd array length ?
                return sorted[Math.floor(sorted.length / 2)].toFixed(6) //access middle value to 6 digits
            }
        } else { //whatTocalculate is enterprise/ebtida 
            if(isEven === true){ //even array length ?
                return sorted[sorted.length / 2 - 1] //access middle value, format as integer
            } else { //odd array length
                return sorted[Math.floor(sorted.length / 2)] //access middle value, format as integer
            }
        }
       
    }

    render(){
        return( //object destructuring to access parameters
            <div style={{"maxWidth": "1200px", "margin": "auto"}}>
                
                {
                this.props.Authenticated //only display this content when the user is authenticated
                    ? 
                (
                    <div> 
                        <div className="ui pointing menu"> 
                            <Link className="item" to="/chart">Go to chart</Link>
                            <Link className="item" to="/logout">logout</Link>
                        </div>
                        
    
    
                        <div className="ui segment"> {/* statistics about median values*/}
                            {this.props.stocks.length > 0 && <h3 className="median__title">Median values</h3>}
                            {this.props.stocks.length > 0 &&  
                                <p className=""> enterprise over ebitda : {this.findMedian(this.props.stocks,"enterpriseOverEbitda" )} revenue over ebitda : {this.findMedian(this.props.stocks, "revenueOverEbitda")} </p>
                            }
                        </div> 
    
                        <div className="ui segment">
                            <button className="ui button" style={{"marginBottom": "10px"}} onClick={this.props.handleClickedExtra}>extra info?</button> 
                        
                        {this.props.clickedExtra && <SearchBar/>}
    
                            {this.props.error && 
                                <div className="ui negative message"> 
                                    
                                    <div className="header">
                                    An error has occured
                                    </div>
                                    <p>{this.props.error}</p>
                                </div>
                            }                    
    
                            <form /*style={{"display": "flex"}}*/ className="ui form" onSubmit ={this.props.handleAddStock}>
                                <div className="field" style={{"maxWidth":"720px", "margin":"auto"}}>
                                    <input className="" type ="text" name="stock" placeholder="stock symbol"></input>
                                    <input className="" type="text" name="shares" placeholder=" number of shares"/>
                                </div>
                                <button style={{"marginLeft": "540px", "marginTop":"10px"}} className="ui inverted primary button">Add stock</button>
                            </form>
                            
    
                            <div className="">
                                    <Stocks
                                    handleDeleteStock = {this.props.handleDeleteStock}
                                    stocks = {this.props.stocks}
                                    handleDeleteStocks = {this.props.handleDeleteStocks}
                                    />
                                
                            </div>
                    </div>
                </div>
                    
    
                ) 
                : 
                (
                    <Redirect to="/login" /> //if the user is not authenticated, send them to the login page
                )
                }   
            </div>
        )
    }
}

export default Valuator

